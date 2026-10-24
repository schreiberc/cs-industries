# SC Industries

Static storefront mock-up (HTML + vanilla JS + Tailwind via CDN). No build step, no cart or payments. Buy buttons show a "coming soon" toast.

## Pages

- `index.html`: home (hero, departments, featured products)
- `products.html`: listing with category filter, search, on-sale toggle and sorting (`?category=kitchen&sort=price-asc`)
- `product.html?id=<product-id>`: product detail with placeholder Buy now / Add to cart
- `about.html`, `contact.html` (contact form is visual only)

## Editing products

All products and categories live in `assets/js/products.js`. Add an object to `PRODUCTS` and it appears everywhere. Change `CURRENCY` there to switch the price symbol.

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Push to GitHub and import into Vercel as a static site (framework preset: "Other", no build command). `vercel.json` enables clean URLs (`/products` instead of `/products.html`).

Photos are from [StockSnap](https://stocksnap.io) (CC0) and stored in `assets/img/`.
