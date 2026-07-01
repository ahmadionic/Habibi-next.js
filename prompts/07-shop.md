# Group 7 — Shop Prompts (Feature 5)

**Do not start until Group 6 is fully checked off AND shop product images are placed.**

**Important:** This group touches the database for the first time. Before Prompt 7.1, make sure you have:
1. Created a free Neon project at https://neon.tech
2. Copied your connection string into `.env.local` as `DATABASE_URL=...` (copy `.env.local.example` to `.env.local` first if you haven't)

Scope: only modify `/src/db/schema.ts` (additively), `/src/app/(marketing)/shop/`, and `/src/components/shop/`.

---

## Prompt 7.1 — Database schema for products

```
Read /FEATURE_SRS.md section 6 (Feature 5 — Shop, categories: Tote bags, Mugs, Planners/Journals, Cards, Qatar Heritage Collection, Home essentials).

In /src/db/schema.ts, ADD (do not remove the existing placeholder comment structure, just add to it) a Drizzle ORM table definition for `products`:
- id (serial primary key)
- name (text, not null)
- slug (text, unique, not null)
- category (text, not null) — one of: "tote-bags", "mugs", "planners-journals", "cards", "qatar-heritage", "home-essentials"
- description (text)
- price (integer, stored in smallest currency unit / fils, not null)
- imageUrl (text)
- inStock (boolean, default true)
- createdAt (timestamp, default now)

After defining the schema, run the Drizzle migration generation command and apply it to my Neon database (only do this if DATABASE_URL is set in .env.local — if it's not set, stop and tell me to set it first rather than guessing).

Then write a small one-time seed script at /src/db/seed.ts that inserts 6 sample products (one per category above), using realistic names/prices/descriptions matching the brand (e.g., "Sage Linen Tote Bag", category tote-bags, price around 8500 fils / QAR 85) and pointing imageUrl at the matching placeholder path from /public/assets/shop/. Run the seed script once and confirm the rows were inserted.
```

### Test Prompt 7.1
```
Show me the products table schema, confirm the migration ran successfully against my Neon database, and show me a query result listing all 6 seeded products.
```

### Expected Result 7.1
- `products` table exists in Neon with the correct columns.
- 6 rows are seeded, one per category, with realistic on-brand names and prices.
- No errors connecting to the database.

---

## Prompt 7.2 — Product grid + category filter page

```
Read /THEME_GUIDE.md sections 2, 3, 6, 7, 8 for visual/responsive/motion decisions.
Do not modify files outside /src/app/(marketing)/shop/page.tsx, /src/components/shop/ProductCard.tsx, /src/components/shop/ProductGrid.tsx, /src/components/shop/CategoryFilter.tsx.

1. Build the /shop page as a Server Component that fetches all products from the database using Drizzle (from /src/db/index.ts), with PageHero (eyebrow "SHOP", title "The HABibi Collection", subtitle script "Thoughtfully made, lovingly designed.", backgroundImage /assets/shop/product-heritage.jpg, no CTA button needed).
2. Build a ProductCard: image, name, category Badge, price formatted as "QAR XX" (convert from fils), BrandCard styling, links to /shop/[slug].
3. Build a CategoryFilter: a horizontal row of pill buttons (one per category + an "All" option) using client-side state to filter the already-fetched product list (no need for a new DB query per filter click — filter in the browser for simplicity).
4. Build ProductGrid: responsive grid (4-col desktop, 2-col tablet, 1-col mobile) rendering ProductCards, with a staggered fade-up entrance animation.

Wire CategoryFilter + ProductGrid together inside the shop page (CategoryFilter will need to be a small client component wrapping the grid, or lift filter state into a client wrapper component — use whichever pattern is cleanest with Next.js Server/Client Components).
```

### Test Prompt 7.2
```
Visit localhost:3000/shop and confirm all 6 seeded products display correctly with images, names, prices in QAR, and category badges. Click through each category filter pill and confirm the grid updates to show only matching products, and "All" shows everything again.
```

### Expected Result 7.2
- All 6 products render correctly from the live Neon database (not hardcoded data).
- Category filtering works client-side without a page reload.
- Responsive grid behaves correctly at all breakpoints.

---

## Prompt 7.3 — Product detail page

```
Read /THEME_GUIDE.md sections 2, 3, 6, 7.
Do not modify files outside /src/app/(marketing)/shop/[slug]/page.tsx and /src/components/shop/ProductGallery.tsx.

Build the /shop/[slug] dynamic page as a Server Component:
1. Fetch the single product from Neon by slug using Drizzle; if not found, call Next.js notFound().
2. Two-column layout: ProductGallery component on the left (for now, just display the single product image large, with rounded-lg + shadow-card — build it so it can support a future array of images, but only one image exists per product right now), and on the right: category Badge, product name (font-heading, large), price (font-body, large, terracotta colored), description paragraph, an AddToCartButton (built in the next prompt — for now just leave a placeholder BrandButton "Add to Cart" with a TODO comment), and a small "In Stock" / "Out of Stock" indicator based on the inStock field.
3. Add a "← Back to Shop" link at the top.

Show me the page.
```

### Test Prompt 7.3
```
Visit localhost:3000/shop and click into any product. Confirm the detail page loads the correct product data, displays the image, name, price, description, and stock status correctly, and that clicking "Back to Shop" returns you to the grid.
```

### Expected Result 7.3
- Product detail pages load correctly for all 6 seeded slugs.
- Visiting a non-existent slug shows Next.js's not-found page.
- Layout is responsive (stacks on mobile).

---

## Prompt 7.4 — Cart drawer (client-side state)

```
Read /THEME_GUIDE.md sections 2, 3, 6, 7.
Do not modify files outside /src/components/shop/CartDrawer.tsx, /src/components/shop/AddToCartButton.tsx, /src/hooks/useCart.ts, and the layout/nav file (only to add a cart icon trigger — do not change anything else in SiteNav).

1. Build a simple client-side cart using React Context + the useCart hook (no database persistence needed for v1 — in-memory/localStorage is fine, document which one you chose and why). Cart items: productId, name, price, imageUrl, quantity.
2. Build AddToCartButton: replaces the placeholder button from Prompt 7.3 on the product detail page, adds the current product to cart context on click, shows a brief "Added!" micro-animation (scale/check icon swap using framer-motion) for ~1.5s.
3. Build CartDrawer: a slide-in panel from the right (similar pattern to MobileNavDrawer from Group 2), triggered by a small cart icon (lucide-react ShoppingBag) with an item-count badge added to SiteNav (desktop and mobile). Drawer shows line items (image, name, qty stepper, price, remove button), a subtotal, and a BrandButton "Checkout" linking to /checkout.

Wire AddToCartButton into the product detail page (replacing the earlier placeholder), and add the cart trigger icon to SiteNav.
```

### Test Prompt 7.4
```
Add 2-3 different products to the cart from their detail pages, confirm the "Added!" animation plays each time, then open the cart drawer from the nav icon and confirm all items, quantities, and the subtotal display correctly. Refresh the page and confirm the cart state persists (if you chose localStorage) or resets (if you chose in-memory only — confirm the AI documented which behavior to expect).
```

### Expected Result 7.4
- Cart works correctly across multiple products, with accurate subtotal math.
- Cart icon in nav shows correct item count.
- Drawer animates smoothly open/closed.
- AI has clearly stated whether cart persists on refresh.

---

## Prompt 7.5 — Stub checkout page

```
Read /THEME_GUIDE.md sections 2, 3, 6, 7 and /FEATURE_SRS.md section 11 (Out of Scope: real payment processing is Phase 2 — this is a stub only).
Do not modify files outside /src/app/(marketing)/checkout/page.tsx.

Build a simple /checkout page:
1. List cart items + subtotal (reuse useCart hook from Prompt 7.4).
2. A simple inquiry-based "checkout": a short form (name, email, phone, note) that, on submit, just shows a success message confirming "Thank you — Claire's team will follow up to confirm your order and arrange payment." (No real payment integration yet — this is intentional per FEATURE_SRS.md section 11. Add a visible code comment: `// TODO Phase 2: integrate Stripe`.)
3. After successful submit, clear the cart.

This page does not need a database table yet (we'll decide in a later phase whether shop inquiries reuse the leads table from Group 9 or get their own table) — for now just show the success state client-side without persisting anywhere; add a TODO comment noting this.
```

### Test Prompt 7.5
```
Add an item to cart, go to /checkout, fill out the inquiry form, submit, and confirm you see the success message and the cart is cleared afterward.
```

### Expected Result 7.5
- Checkout flow completes with the success message.
- Cart clears after "submission."
- Clear TODO comments mark this as a v1 stub, not real payment processing.

---

✅ **Group 7 complete.** Move to `/prompts/08-about.md`.
