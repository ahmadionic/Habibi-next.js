# Group 10 — Admin Dashboard Prompts (Feature 8)

**Do not start until Group 9 is fully checked off.**
Scope: only modify `/src/app/admin/`, `/src/app/api/admin/`, `/src/components/admin/`, and auth config files explicitly named below. This area can look more utilitarian than the marketing site but must still use brand colors/fonts per THEME_GUIDE.md.

---

## Prompt 10.1 — NextAuth credentials setup + login page

```
Read /FEATURE_SRS.md section 9 (Admin Dashboard — single admin user, NextAuth credentials provider) and /THEME_GUIDE.md sections 2 and 3 for visual styling of the login page only.
Do not modify any marketing pages, the booking system, or the shop.

1. Create /src/lib/auth.ts configuring NextAuth (Auth.js v5 style) with a single Credentials provider that checks email/password against two environment variables: ADMIN_EMAIL and ADMIN_PASSWORD_HASH (use bcrypt to hash/compare — install bcryptjs if needed). Add ADMIN_EMAIL and ADMIN_PASSWORD_HASH to .env.local.example with comments explaining how to generate a bcrypt hash for the password.
2. Create the NextAuth API route handler at /src/app/api/auth/[...nextauth]/route.ts.
3. Create a simple login page at /src/app/admin/login/page.tsx: cream background, centered card (BrandCard), heading "Admin Login" (font-heading), email + password fields, BrandButton "Sign In", error message display on failed login.

Do not build the protected dashboard yet — that's the next prompt.
```

### Test Prompt 10.1
```
Set ADMIN_EMAIL and a bcrypt-hashed ADMIN_PASSWORD_HASH in .env.local, visit localhost:3000/admin/login, and confirm: logging in with correct credentials succeeds (redirects somewhere, even if that page is still a placeholder), and logging in with wrong credentials shows a clear error message.
```

### Expected Result 10.1
- Login form is styled on-brand and functions correctly.
- Correct credentials authenticate successfully; incorrect ones show an error without crashing.

---

## Prompt 10.2 — Protected /admin layout

```
Do not modify any marketing pages or the login page logic itself.

Create /src/app/admin/layout.tsx that:
1. Checks the NextAuth session server-side (using the auth() helper from /src/lib/auth.ts); if there is no valid session, redirect to /admin/login.
2. If authenticated, renders a simple admin shell: a left sidebar (deep-pine background, cream text) with links to "Leads" (/admin/leads), "Portfolio" (/admin/portfolio), "Products" (/admin/products), and a "Sign Out" button at the bottom; main content area to the right with cream background.
3. Exclude /admin/login from this protection check (it should render without the sidebar shell, obviously, since you're not logged in yet — structure the layout so /admin/login is outside this protected layout, e.g. by using a route group like (protected) inside /admin if needed).

Show me the final folder structure under /src/app/admin/ and the layout file.
```

### Test Prompt 10.2
```
Try visiting localhost:3000/admin/leads directly while logged out — confirm you're redirected to /admin/login. Then log in and confirm you see the sidebar shell with all 3 nav links plus Sign Out, even though the pages themselves are still empty/placeholder.
```

### Expected Result 10.2
- Unauthenticated access to any /admin/* route (except /admin/login) redirects correctly.
- Authenticated access shows the sidebar shell correctly.
- Sign Out button successfully ends the session.

---

## Prompt 10.3 — Leads inbox table

```
Read /FEATURE_SRS.md section 9 (Leads/Bookings inbox requirements).
Do not modify files outside /src/app/admin/leads/page.tsx and /src/components/admin/LeadsTable.tsx.

Build /src/app/admin/leads/page.tsx as a Server Component that fetches all rows from the `leads` table (created in Group 9) ordered by createdAt descending, and passes them to a LeadsTable client component using shadcn's DataTable/Table primitives:
- Columns: Name, Email, Purpose (as a Badge), Status (as a colored Badge: new=sage, contacted=sand, closed=ink-soft), Created Date, and a "View" action that expands/shows the full message + conditional fields (pet names / workshop type / preferred date) in a dialog (shadcn Dialog component).
- Inside the dialog, allow the admin to change the status via a Select, which PATCHes a new API route /src/app/api/admin/leads/[id]/route.ts to update the status in the DB.

Show me both files.
```

### Test Prompt 10.3
```
Submit a couple of test bookings from the public /book page (if you haven't already from Group 9 testing), then visit /admin/leads while logged in and confirm they all appear in the table, sorted newest first, with working status badges. Open one lead's detail dialog, change its status, and confirm the table updates to reflect the new status.
```

### Expected Result 10.3
- All real leads from the `leads` table display correctly.
- Status updates persist to the database and reflect immediately in the UI.

---

## Prompt 10.4 — Portfolio manager (CRUD)

```
Read /FEATURE_SRS.md section 9 (Portfolio manager: add/edit/delete portrait case studies — image, title, story, package type).
Do not modify files outside /src/db/schema.ts (additive only), /src/app/admin/portfolio/, /src/components/admin/PortfolioManager.tsx, and /src/app/api/admin/portfolio/.

1. Add a `portfolioItems` table to schema.ts: id, title, story (text), packageType (text: "simple" | "something-special" | "remembrance"), imageUrl, createdAt. Generate and apply the migration.
2. Build a simple CRUD UI at /admin/portfolio: a table listing existing items (reuse shadcn Table patterns from LeadsTable for consistency), an "Add New" BrandButton opening a shadcn Dialog/Sheet with a form (title, story textarea, package type select, image URL text input for now — file upload can be a future enhancement, just accept a URL string for v1), Edit and Delete actions per row.
3. Build matching API routes under /src/app/api/admin/portfolio/ (GET list, POST create, PATCH update, DELETE) used by the UI.

Note: this table is a CMS-managed list for Claire's convenience; it does NOT need to be wired into the public /portraits page in this version (that page's case studies remain the hardcoded ones from Group 4) — flag this clearly as a "Phase 2: connect to public page" TODO comment.
```

### Test Prompt 10.4
```
In /admin/portfolio, add a new portfolio item, confirm it appears in the table, edit it, confirm the change persists, then delete it and confirm it's removed. Refresh the page each time to confirm changes are really saved to the database, not just local state.
```

### Expected Result 10.4
- Full CRUD works correctly against the real Neon database.
- Changes persist across page refreshes.
- Clear TODO comment notes that public-page wiring is a future phase.

---

## Prompt 10.5 — Product manager (CRUD)

```
Read /FEATURE_SRS.md section 9 (Product manager) and reuse the `products` table schema already created in Group 7 — do not duplicate or modify that table's structure.
Do not modify files outside /src/app/admin/products/, /src/components/admin/ProductManager.tsx, and /src/app/api/admin/products/.

Build a CRUD UI at /admin/products following the exact same pattern as Prompt 10.4's Portfolio manager (table + Add/Edit Dialog + Delete), but for the `products` table fields (name, slug, category, description, price, imageUrl, inStock). Build matching API routes under /src/app/api/admin/products/.

Important: this DOES connect to the live public /shop page automatically since it's the same table — confirm that adding a product here makes it appear on the public shop page after a refresh, and deleting one removes it from the public shop page too.
```

### Test Prompt 10.5
```
In /admin/products, add a new product, then visit the public /shop page (in a new tab or after refresh) and confirm the new product appears there. Edit its price in the admin, refresh /shop, confirm the new price shows. Delete it from admin, refresh /shop, confirm it's gone.
```

### Expected Result 10.5
- Admin product changes immediately reflect on the public shop page (same table, no separate sync step needed).
- Full CRUD works correctly.

---

✅ **Group 10 complete.** Move to `/prompts/11-polish-deploy.md`.
