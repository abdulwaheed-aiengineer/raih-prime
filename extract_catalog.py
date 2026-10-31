import csv
import json
import os
import re
import ssl
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

os.makedirs('cache/html', exist_ok=True)
os.makedirs('public/images/products', exist_ok=True)

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')[:50]

def get_folder_id(url):
    m = re.search(r'folders/([a-zA-Z0-9_-]+)', url)
    return m.group(1) if m else None

def fetch_folder_html(folder_id):
    cache_path = os.path.join('cache/html', f'{folder_id}.html')
    if os.path.exists(cache_path) and os.path.getsize(cache_path) > 1000:
        with open(cache_path, 'r', encoding='utf-8', errors='ignore') as f:
            return f.read()
    
    url = f'https://drive.google.com/drive/folders/{folder_id}'
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=20) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            with open(cache_path, 'w', encoding='utf-8') as f:
                f.write(html)
            return html
    except Exception as e:
        print(f"Error fetching folder {folder_id}: {e}")
        return ""

def extract_images_from_html(html):
    matches = re.findall(r'<div class="JxSEve" aria-label="([^"]+)"[^>]+ssk=[\'"]5:auSv138:([a-zA-Z0-9_-]+)-0-16[\'"]', html)
    if not matches:
        matches = re.findall(r'aria-label="([^"]+)"[^>]*ssk=[\'"]5:auSv138:([a-zA-Z0-9_-]+)-0-16[\'"]', html)
    
    seen = set()
    results = []
    for name, fid in matches:
        clean_name = re.sub(r'\s+Image Shared.*$', '', name).strip()
        if fid not in seen:
            seen.add(fid)
            results.append({'name': clean_name, 'id': fid})
    return results

def download_image(file_id, dest_path):
    if os.path.exists(dest_path) and os.path.getsize(dest_path) > 500:
        return True
    
    # lh3 cdn is fastest
    url = f'https://lh3.googleusercontent.com/d/{file_id}=s800'
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=20) as resp:
            data = resp.read()
            if len(data) > 500 and not data.startswith(b'<!DOCTYPE html>'):
                with open(dest_path, 'wb') as f:
                    f.write(data)
                return True
    except Exception:
        pass
    
    # Fallback direct download
    try:
        url_fb = f'https://drive.google.com/uc?export=download&id={file_id}'
        req_fb = urllib.request.Request(url_fb, headers=HEADERS)
        with urllib.request.urlopen(req_fb, context=ctx, timeout=20) as resp:
            data = resp.read()
            if len(data) > 500 and not data.startswith(b'<!DOCTYPE html>'):
                with open(dest_path, 'wb') as f:
                    f.write(data)
                return True
    except Exception:
        pass
    
    return False

def parse_product_details(raw_desc):
    lines = [l.strip() for l in raw_desc.split('\n') if l.strip()]
    description_paras = []
    specifications = {}
    features = []
    
    mode = 'desc'
    spec_key = None
    
    for l in lines:
        if l.lower().startswith('product details'):
            continue
        if l.lower() == 'specifications':
            mode = 'specs'
            continue
        if l.lower() == 'warranty' or l.lower().startswith('warranty info') or l.lower() == 'ingredients':
            mode = 'other'
            continue
        if l.lower().startswith('info:') or l.lower().startswith('we aim to show'):
            continue
        if l.lower() == 'more details':
            continue
            
        if mode == 'desc':
            if l.startswith('•') or l.startswith('-') or (len(l) < 90 and any(kw in l.lower() for kw in ['kosher', 'roast', 'pack', 'ounce', 'fl oz', 'sugar', 'protein', 'servings', 'caffeine', 'certified', 'business', 'usa', 'gluten'])):
                features.append(l.lstrip('•- '))
            else:
                description_paras.append(l)
        elif mode == 'specs':
            if spec_key is None:
                spec_key = l
            else:
                specifications[spec_key] = l
                spec_key = None
                
    main_desc = ' '.join(description_paras)
    return main_desc, features, specifications

def categorize_product(title, brand, desc):
    t = (title + ' ' + brand + ' ' + desc).lower()
    
    if any(k in t for k in ['coffee', 'espresso', 'tea', 'latte', 'cappuccino', 'dulce de leche']):
        return 'Coffee & Beverages'
    elif any(k in t for k in ['whey', 'protein shake', 'protein chips', 'protein pastry', 'protein donuts', 'protein pasta', 'owyn', 'muscle milk', 'simplyprotein', 'quest']):
        return 'High-Protein & Fitness'
    elif any(k in t for k in ['marinara', 'pasta sauce', 'pizza sauce', 'alfredo', 'rotini', 'linguine', 'fusilli', 'penne', 'pasta', 'carbe diem', 'banza', 'de cecco', 'bionaturae', 'palmini', 'raos', "rao's"]):
        return 'Pastas & Gourmet Sauces'
    elif any(k in t for k in ['seasoning', 'sage', 'birria', 'lemon pepper', 'spice', 'bombs', 'kosher total']):
        return 'Seasonings & Gourmet Pantry'
    elif any(k in t for k in ['mac and cheese', 'mac & cheese', 'velveeta', 'kraft deluxe']):
        return 'Pantry & Quick Meals'
    elif any(k in t for k in ['cookies', 'chips', 'takis', 'doritos', 'grahams', 'nutter butter', 'belvita', 'breakfast bars', 'biscuits']):
        return 'Snacks & Sweet Treats'
    else:
        return 'Pantry & Quick Meals'

def extract_brand(title, specs):
    if 'Brand' in specs and specs['Brand']:
        return specs['Brand']
    
    known_brands = [
        'Fire Department Coffee', 'Gold Peak', 'Velveeta', 'Kraft Deluxe', 'Legendary Foods',
        "Grimaldi's", 'Palmini', 'Optimum Nutrition', 'Carbone Fine Food', 'Carbone', 'Banza',
        'Slate Milk', 'WILDE', 'OWYN', "Rao's Homemade", "Rao's", 'De Cecco', 'SimplyProtein',
        'Quest', 'Bionaturae', 'Cafe Bustelo', 'Café Bustelo', 'Doritos', 'Muscle Milk',
        'Lucini Italia', "Lawry's", 'Takis', 'Silk', 'Smash Kitchen', 'McCormick',
        'NESCAFÉ', 'NESCAFE', 'TEDDY GRAHAMS', 'EZ Bombs', 'Café Legal', 'Cafe Legal',
        'NUTTER BUTTER', 'Hills Bros.', 'Carbe Diem', 'Oikos', 'bettergoods',
        "Caffe D'Vita", 'belVita'
    ]
    for b in known_brands:
        if b.lower() in title.lower():
            return b
    return title.split()[0]

def extract_tags(title, desc, features, specs):
    combined = (title + ' ' + desc + ' ' + ' '.join(features) + ' ' + json.dumps(specs)).lower()
    tags = []
    tag_map = [
        ('High Protein', ['protein', '35g', '32g', '30g', '20g']),
        ('Gluten-Free', ['gluten-free', 'gluten free', 'without gluten']),
        ('Keto Friendly', ['keto', 'keto friendly', 'fewer net carbs']),
        ('Zero Sugar', ['zero sugar', '0g sugar', 'no sugar', 'zero-calorie']),
        ('Organic', ['organic', 'usda organic']),
        ('Kosher', ['kosher']),
        ('Dairy Free', ['dairy free', 'dairy-free', 'plant-based', 'vegan']),
        ('Naturally Caffeinated', ['naturally caffeinated', 'caffeinated']),
        ('Low Carb', ['low carb', 'net carbs', 'fewer carbs']),
        ('Non-GMO', ['non-gmo', 'non gmo']),
        ('Made in USA', ['made in usa', 'roasted in the usa'])
    ]
    for tag_name, keywords in tag_map:
        if any(kw in combined for kw in keywords):
            tags.append(tag_name)
    return tags[:5]

def generate_price(title, category):
    t = title.lower()
    if 'whey protein' in t or '5 lb' in t:
        return 34.99, 39.99
    elif 'pack' in t and ('6' in t or '8' in t or '12' in t):
        return 14.99, 17.99
    elif 'sauce' in t or 'pasta sauce' in t or 'marinara' in t or 'alfredo' in t:
        return 8.99, 10.99
    elif 'coffee' in t or 'espresso' in t:
        return 12.99, 15.99
    elif 'chips' in t or 'cookies' in t or 'grahams' in t or 'biscuits' in t:
        return 5.49, 6.49
    elif 'seasoning' in t or 'sage' in t or 'bomb' in t:
        return 4.99, 5.99
    elif 'pasta' in t or 'linguine' in t or 'rotini' in t or 'fusilli' in t or 'penne' in t:
        return 6.49, 7.99
    elif 'mac and cheese' in t or 'mac & cheese' in t:
        return 7.49, 8.99
    elif 'shake' in t:
        return 11.99, 13.99
    else:
        return 7.99, 9.99

def main():
    with open('products.csv', 'r', encoding='utf-8', errors='ignore') as f:
        reader = csv.reader(f)
        header = next(reader)
        raw_rows = [r for r in reader if len(r) >= 3 and r[0].strip()]

    print(f"Loaded {len(raw_rows)} rows from CSV.")

    # Step 1: Collect unique folder IDs
    folder_map = {}
    for r in raw_rows:
        folder_url = r[2].strip()
        fid = get_folder_id(folder_url)
        if fid:
            folder_map[fid] = folder_url

    print(f"Found {len(folder_map)} unique folder IDs. Fetching folder pages in parallel...")
    folder_htmls = {}
    with ThreadPoolExecutor(max_workers=8) as executor:
        future_to_fid = {executor.submit(fetch_folder_html, fid): fid for fid in folder_map.keys()}
        for future in as_completed(future_to_fid):
            fid = future_to_fid[future]
            try:
                folder_htmls[fid] = future.result()
            except Exception as e:
                print(f"Failed {fid}: {e}")
                folder_htmls[fid] = ""

    print("Extracting images for each folder...")
    folder_images = {}
    for fid, html in folder_htmls.items():
        folder_images[fid] = extract_images_from_html(html)
        print(f"Folder {fid}: found {len(folder_images[fid])} images")

    # Step 2: Build products list
    products = []
    images_to_download = []

    # Keep track of used slugs to ensure uniqueness
    used_slugs = {}

    import random
    random.seed(42)

    for idx, r in enumerate(raw_rows):
        raw_title = r[0].strip()
        raw_desc = r[1].strip()
        folder_url = r[2].strip()
        fid = get_folder_id(folder_url)

        base_slug = slugify(raw_title)
        if base_slug in used_slugs:
            used_slugs[base_slug] += 1
            slug = f"{base_slug}-{used_slugs[base_slug]}"
        else:
            used_slugs[base_slug] = 1
            slug = base_slug

        prod_id = f"rhp-{idx+1:03d}"
        main_desc, features, specs = parse_product_details(raw_desc)
        brand = extract_brand(raw_title, specs)
        category = categorize_product(raw_title, brand, main_desc)
        tags = extract_tags(raw_title, main_desc, features, specs)
        price, compare_price = generate_price(raw_title, category)
        
        # Rating between 4.6 and 4.95
        rating = round(random.uniform(4.6, 4.95), 1)
        review_count = random.randint(38, 540)
        inventory = random.randint(15, 65)
        is_featured = idx in [0, 2, 4, 6, 8, 11, 14, 17, 20, 25, 27, 30]

        # Product folder images
        prod_img_list = folder_images.get(fid, [])
        prod_dir = os.path.join('public', 'images', 'products', slug)
        os.makedirs(prod_dir, exist_ok=True)

        img_urls = []
        cdn_urls = []
        for img_idx, img_info in enumerate(prod_img_list):
            file_fid = img_info['id']
            ext = 'png'
            dest_filename = f"{img_idx+1}.{ext}"
            dest_filepath = os.path.join(prod_dir, dest_filename)
            rel_url = f"/images/products/{slug}/{dest_filename}"
            cdn_url = f"https://lh3.googleusercontent.com/d/{file_fid}=s800"

            img_urls.append(rel_url)
            cdn_urls.append(cdn_url)

            images_to_download.append((file_fid, dest_filepath))

        # Fallback if no images found in folder
        if not img_urls:
            img_urls = ["/placeholder-product.svg"]
            cdn_urls = ["/placeholder-product.svg"]

        product_obj = {
            "id": prod_id,
            "slug": slug,
            "title": raw_title,
            "brand": brand,
            "category": category,
            "price": price,
            "compareAtPrice": compare_price,
            "rating": rating,
            "reviewCount": review_count,
            "inStock": True,
            "inventory": inventory,
            "isFeatured": is_featured,
            "tags": tags,
            "description": main_desc if main_desc else raw_title,
            "features": features[:6] if features else [f"Premium quality {brand} product", "Convenient packaging for daily use", "Guaranteed fresh and authentic"],
            "specifications": specs,
            "images": img_urls,
            "cdnImages": cdn_urls,
            "primaryImage": img_urls[0],
            "primaryCdnImage": cdn_urls[0],
            "folderUrl": folder_url
        }
        products.append(product_obj)

    print(f"\nPrepared {len(products)} products. Total images to download: {len(images_to_download)}")

    # Step 3: Multithreaded download of images
    print("Starting download of product images (12 parallel threads)...")
    success_count = 0
    with ThreadPoolExecutor(max_workers=12) as executor:
        futures = {executor.submit(download_image, fid, path): path for fid, path in images_to_download}
        for future in as_completed(futures):
            if future.result():
                success_count += 1
            if success_count % 25 == 0 or success_count == len(images_to_download):
                print(f"Downloaded {success_count}/{len(images_to_download)} images...")

    print(f"Image download complete! {success_count}/{len(images_to_download)} succeeded.")

    # Save to public/products.json and src/data/products.json
    os.makedirs('src/data', exist_ok=True)
    with open('public/products.json', 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    with open('src/data/products.json', 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)

    print("Saved products.json in public/ and src/data/ successfully!")

if __name__ == '__main__':
    main()
