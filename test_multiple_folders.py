import csv
import re
import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

with open('products.csv', 'r', encoding='utf-8', errors='ignore') as f:
    reader = csv.reader(f)
    next(reader)
    rows = [r for r in reader if len(r) > 2 and r[2].strip()][:5]

for i, row in enumerate(rows):
    title = row[0]
    folder_url = row[2]
    print(f"\n--- Checking Product {i+1}: {title[:30]} ---")
    req = urllib.request.Request(folder_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req, context=ctx) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            # Check pattern 2
            p2 = re.findall(r'<div class="JxSEve" aria-label="([^"]+)"[^>]+ssk=[\'"]5:auSv138:([a-zA-Z0-9_-]+)-0-16[\'"]', html)
            print(f"Found {len(p2)} images:")
            for name, fid in p2:
                print(f"  {name} : {fid}")
            if not p2:
                # check fallback
                p_fallback = re.findall(r'ssk=[\'"]5:auSv138:([a-zA-Z0-9_-]+)-0-16[\'"]', html)
                print(f"Fallback IDs: {p_fallback}")
    except Exception as e:
        print(f"Error fetching {folder_url}: {e}")
