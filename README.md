# RAIH PRIME LLC — Official E-Commerce Storefront

An ultra-modern, high-converting e-commerce web application developed for **RAIH PRIME LLC**, built with **React**, **Vite**, **Tailwind CSS**, and **Lucide Icons**.

---

## 🏢 Company Profile
- **Entity Name:** RAIH PRIME LLC
- **Founder & Principal:** Tassawar Hussain
- **Headquarters & Fulfillment Center:** 129 E ORANGE CT, PARKVILLE, MD 21234
- **Official Domain:** [https://raihprime.store](https://raihprime.store)
- **Customer Care Email:** support@raihprime.store
- **Customer Care Phone:** +1 (410) 844-3290

---

## 🚀 Key Features Implemented

### 1. Curated 51-Product Catalog
- **Assets Arranged Locally:** 285 high-resolution product photographs scraped directly from Google Drive folders and organized in `public/images/products/<slug>/`.
- **Hybrid CDN Fallback:** Automatic failover to Google's fast LH3 image CDN in case of missing local assets.
- **Rich Product Metadata:** Cleaned titles, authentic descriptions, nutritional specifications table, brand taxonomy, category tags, stock count, and price comparisons.

### 2. High-Performance UI/UX & Navigation
- **Header with Announcement Bar:** Real-time free shipping threshold tracker, Maryland location pill, and quick order tracking link.
- **Instant Live Search:** Debounced autocomplete search with dropdown previews of matching titles, brands, and prices.
- **Category Filter Pills:** Fast category switching with dynamic product counts (Coffee & Beverages, High-Protein & Fitness, Pastas & Sauces, Pantry Meals, Seasonings & Spices, Snacks & Sweets).
- **Advanced Desktop & Mobile Filter Bar:** Filter by category, price slider ($4 to $40), dietary tags (High Protein, Gluten-Free, Keto, Zero Sugar, Organic, Kosher), brands, and stock status.
- **Multiple Sort Options:** Featured picks, price low-to-high, price high-to-low, customer ratings, most reviewed, and alphabetical.

### 3. Comprehensive Product Inspection Modal
- **Multi-Image Gallery:** Interactive primary photo viewer with interactive thumbnail carousel.
- **Nutritional / Specification Breakdown:** Dynamic key-value spec tables (Roast type, flavor, net weight, origin).
- **Verified Buyer Reviews:** Rating breakdown and customer testimonials.
- **Add to Bag & One-Click "Buy Now":** Seamless fast-track straight to checkout.

### 4. Interactive Slide-Over Bag & Promo Engine
- **Visual Free Shipping Meter:** Dynamic progress bar showing how much more is needed for free shipping ($50 threshold).
- **Working Discount Codes:**
  - `RAIHPRIME`: 15% OFF entire order
  - `WELCOME10`: 10% OFF welcome bonus
  - `MDLOCAL`: 20% OFF Parkville, MD neighbor discount
- **Quantity Adjuster & Real-time Calculations:** Subtotal, discount, shipping, and Maryland 6% sales tax.

### 5. Seamless Multi-Step Checkout
- **Step 1:** Customer Contact & Shipping Address (supports all 50 US states, with convenient sample autofill for rapid testing).
- **Step 2:** Shipping Method Selection (Standard Ground, Express 2-Day Air, Priority Overnight).
- **Step 3:** Interactive Payment Form (Credit/Debit Card with live card preview, Apple Pay / Google Pay simulation, Maryland local pickup invoice).
- **Celebration Confetti:** Instant physics-based canvas confetti burst upon successful order completion.

### 6. Order Confirmation & Tracking System
- **Order ID Generator:** Unique references (e.g., `#RHP-XXXXXX`).
- **Printable Receipt:** One-click receipt printing modal.
- **Live Tracking Timeline:** Real-time status lookup from Parkville, MD fulfillment facility through carrier dispatch.

### 7. Brand, Trust & Legal Compliance
- **SEO & Social Graph:** Schema.org Store JSON-LD, Open Graph, Twitter cards, and canonical tags for `https://raihprime.store`.
- **Search Engine Discovery:** Pre-configured `robots.txt` and `sitemap.xml` for `https://raihprime.store`.
- **About Us Section:** Highlighting company leadership, quality inspections, and veteran-owned partner support.
- **Contact & Support:** Interactive ticket form, hours of operation, direct phone/email (`support@raihprime.store`), and FAQ accordion.
- **Store Policies:** Shipping policy, 30-day money-back guarantee & return terms, privacy policy, and terms of service.

---

## 🛠️ Local Development & Scripts

### Run Dev Server
```bash
npm run dev
```
Available at `http://localhost:3000/`.

### Production Build
```bash
npm run build
```
Generates optimized static assets in `dist/`.

---

## 🌐 Deploying to "raihprime.store"

### Option A: Vercel (Recommended, 1-Click)
1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **Import Project**.
3. Select your repository. Framework preset will automatically detect **Vite**.
4. Once deployed, go to **Settings > Domains** and add `raihprime.store` and `www.raihprime.store`.
5. Point your domain DNS records to Vercel:
   - **A Record**: `@` -> `76.76.21.21`
   - **CNAME**: `www` -> `cname.vercel-dns.com`

### Option B: Netlify
1. Go to [netlify.com](https://netlify.com) and import the repository.
2. Build command: `npm run build`, Publish directory: `dist`.
3. Go to **Domain management > Add custom domain**: `raihprime.store`.

### Option C: Cloudflare Pages
1. In Cloudflare dashboard, choose **Pages > Connect to Git**.
2. Select repository, Build command: `npm run build`, Output: `dist`.
3. Add custom domain `raihprime.store` with automatic SSL certificate.
