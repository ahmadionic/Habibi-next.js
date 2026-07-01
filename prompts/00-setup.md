# Group 0 — Setup Prompts

These prompts install everything the project needs. Run in order 0.1 → 0.6. Do this in your empty project folder, opened in your AI coding IDE's terminal/chat (e.g., Claude Code).

---

## Prompt 0.1 — Initialize Next.js project

```
I'm starting a brand-new Next.js project for "Claire Olivier / HABibi", a luxury animal-therapy, art, and education brand website. My folder is currently empty.

Please:
1. Initialize a new Next.js 14+ project using the App Router, TypeScript, and Tailwind CSS, in this current directory (do not create a nested folder).
2. Use these flags equivalent to: typescript=yes, eslint=yes, tailwind=yes, src-directory=yes, app-router=yes, import-alias="@/*".
3. After initializing, run the dev server briefly to confirm it builds with no errors, then stop it.
4. Show me the resulting top-level folder structure.

Do not install any other packages yet — that happens in the next prompts.
```

### Test Prompt 0.1
```
Run `npm run dev` and tell me the exact URL and port it's running on. Then show me the contents of package.json.
```

### Expected Result 0.1
- `npm run dev` starts without errors, serving on `http://localhost:3000`.
- `package.json` shows `next`, `react`, `react-dom`, `typescript`, `tailwindcss` as dependencies.
- Visiting `localhost:3000` in a browser shows the default Next.js starter page (not yet styled).

---

## Prompt 0.2 — Install Tailwind config extension, shadcn/ui, Framer Motion

```
Read and strictly follow /THEME_GUIDE.md for the color tokens I will use later — don't apply them yet, just note them for context.

Now, in this existing Next.js + Tailwind project:
1. Install and initialize shadcn/ui (latest CLI) with the "New York" style, base color "neutral", and CSS variables enabled.
2. Install framer-motion as a dependency.
3. Install lucide-react (icon library, since shadcn depends on it) if not already installed.
4. Confirm shadcn's components.json was created correctly and that a components/ui folder exists.
5. Do not add any custom colors to tailwind.config yet — that is a separate step.

Show me the final package.json dependencies list when done.
```

### Test Prompt 0.2
```
Add a single shadcn Button component using `npx shadcn@latest add button`, then show me the file it created at components/ui/button.tsx.
```

### Expected Result 0.2
- `components/ui/button.tsx` exists and exports a `Button` component using `class-variance-authority` patterns.
- No build errors when running `npm run dev`.
- `framer-motion` and `lucide-react` appear in `package.json` dependencies.

---

## Prompt 0.3 — Install Neon DB + Drizzle ORM

```
Read /FEATURE_SRS.md section 0 (Tech Stack) for confirmation of what we're using: Neon (serverless Postgres) as the database and Drizzle ORM as the query layer.

Please:
1. Install @neondatabase/serverless and drizzle-orm and drizzle-kit (as a dev dependency).
2. Create a /src/db folder with:
   - /src/db/schema.ts (empty schema file for now, just export an empty object placeholder with a comment explaining tables will be added per-feature)
   - /src/db/index.ts (the Drizzle client setup, reading the connection string from process.env.DATABASE_URL)
3. Create a drizzle.config.ts at the project root pointing to /src/db/schema.ts, dialect "postgresql", and reading DATABASE_URL from env.
4. Create a .env.local.example file with a DATABASE_URL placeholder line and a comment explaining it should be a Neon connection string from https://neon.tech.
5. Add .env.local to .gitignore if it isn't already there.

Do NOT attempt to actually connect to a live database yet — I have not created my Neon project. Just scaffold the files so it's ready to go once I paste in my real connection string.
```

### Test Prompt 0.3
```
Show me the full contents of /src/db/index.ts, /src/db/schema.ts, drizzle.config.ts, and .env.local.example.
```

### Expected Result 0.3
- All four files exist with the described contents.
- `drizzle-orm`, `drizzle-kit`, `@neondatabase/serverless` appear in package.json.
- `.env.local` is listed in `.gitignore`.
- The project still builds successfully (`npm run dev` has no errors) even without a real DATABASE_URL set, because we haven't wired any pages to the DB yet.

---

## Prompt 0.4 — Install auth + email packages

```
Read /FEATURE_SRS.md sections 8 and 9 for context on why we need these: a booking form that sends emails, and an admin login for Claire.

Please:
1. Install next-auth (v5/Auth.js) as a dependency, but do not configure any providers yet — just install it.
2. Install resend (for transactional email).
3. Add RESEND_API_KEY, NEXTAUTH_SECRET, and NEXTAUTH_URL placeholder lines (with explanatory comments) to .env.local.example.
4. Do not create any auth config or API routes yet — that happens in Group 9 and Group 10. This step is just package installation and env scaffolding.

Confirm package.json afterward.
```

### Test Prompt 0.4
```
Show me the updated .env.local.example file and confirm next-auth and resend appear in package.json dependencies.
```

### Expected Result 0.4
- `.env.local.example` now has 4 placeholder env vars total (DATABASE_URL, RESEND_API_KEY, NEXTAUTH_SECRET, NEXTAUTH_URL), each with a one-line comment.
- `next-auth` and `resend` appear in `package.json`.
- App still builds with no errors.

---

## Prompt 0.5 — Create industry-standard folder structure

```
Read /FEATURE_SRS.md section 1 (Sitemap) for the list of pages we will build.

Inside /src, create this exact folder structure (empty folders/placeholder files are fine — we will fill them in later prompts). Use Next.js App Router conventions:

/src
  /app
    /(marketing)
      /portraits
      /education
      /workshops
      /shop
        /[slug]
      /about
      /book
    /admin
      /leads
      /portfolio
      /products
    /api
      /booking
      /admin
  /components
    /ui            (already created by shadcn)
    /layout        (Nav, Footer, PageHero)
    /sections       (reusable marketing section blocks)
    /portraits
    /education
    /workshops
    /shop
    /about
    /admin
  /db
  /lib
  /hooks
  /types

Explain briefly why you used a (marketing) route group, then show me the full resulting tree with `tree -L 4 src` or equivalent.
```

### Test Prompt 0.5
```
Show me the full src folder tree, 4 levels deep.
```

### Expected Result 0.5
- The tree matches the structure above.
- The app still runs with `npm run dev` (empty folders don't break Next.js).
- The AI explains that `(marketing)` is a route group so these pages can share a layout (Nav+Footer) separate from `/admin`, without adding `/marketing` to the URL.

---

## Prompt 0.6 — Asset folders

```
Read /00_ASSET_PLACEHOLDERS.md in full.

Create the exact folder structure described there under /public/assets/ (logo, icons, portraits, education, workshops, shop, about — all empty for now).

Then, for every single filename listed in that document, create a placeholder file using a placehold.co URL pattern saved as a real local file OR, if you cannot fetch external URLs, create a simple solid-color placeholder image at the correct path and filename using a generated SVG with the text "Placeholder: [filename]" in deep-pine (#334B3A) text on a cream (#F7F3EC) background, sized 800x600 for photos and 64x64 for icons.

List every file you created, organized by folder.
```

### Test Prompt 0.6
```
Show me `ls -la public/assets/portraits` and `ls -la public/assets/logo`.
```

### Expected Result 0.6
- Every folder from `00_ASSET_PLACEHOLDERS.md` exists under `/public/assets/`.
- Every filename listed in that doc exists as a real file (even if it's just a placeholder SVG/PNG).
- No build errors.

---

✅ **Group 0 complete.** Move to `/prompts/01-design-system.md`.
