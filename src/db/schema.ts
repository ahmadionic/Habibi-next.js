// Tables are added here per-feature (see FEATURE_SRS.md).
// Each feature prompt appends its table definitions to this file.

import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';

/* ── Feature 5 — Shop (/shop) — FEATURE_SRS §6 ──────────────────────────── */

/**
 * products — one row per shop item.
 *
 * price is stored in the smallest currency unit (fils for QAR).
 *   QAR 85.00 → 8500 fils.  Display as price / 100 with currency symbol.
 *
 * category is constrained at the application layer to one of the six
 * values from FEATURE_SRS §6:
 *   "tote-bags" | "mugs" | "planners-journals" | "cards"
 *   | "qatar-heritage" | "home-essentials"
 */
export const products = pgTable('products', {
  id:          serial('id').primaryKey(),
  name:        text('name').notNull(),
  slug:        text('slug').unique().notNull(),
  category:    text('category').notNull(),
  description: text('description'),
  price:       integer('price').notNull(),       // fils — smallest unit
  imageUrl:    text('image_url'),
  inStock:     boolean('in_stock').default(true),
  createdAt:   timestamp('created_at').defaultNow(),
});

/* ── Feature 7 — Booking Form (/book) — FEATURE_SRS §8 ──────────────────── */

/**
 * leads — one row per booking/consultation form submission.
 *
 * purpose is constrained at the application layer to:
 *   "portrait-inquiry" | "school-program" | "workshop-reservation" | "general-question"
 *
 * Conditional fields (nullable — only populated for the relevant purpose):
 *   petNames        → portrait-inquiry only
 *   workshopType    → workshop-reservation only
 *   preferredDate   → workshop-reservation only
 *
 * status lifecycle:  "new" → "contacted" → "closed"
 *   Updated by Claire via the admin dashboard (Feature 8, FEATURE_SRS §9).
 */
export const leads = pgTable('leads', {
  id:                     serial('id').primaryKey(),
  name:                   text('name').notNull(),
  email:                  text('email').notNull(),
  phone:                  text('phone'),
  purpose:                text('purpose').notNull(),
  message:                text('message'),
  petNames:               text('pet_names'),
  workshopType:           text('workshop_type'),
  preferredDate:          text('preferred_date'),
  preferredContactMethod: text('preferred_contact_method'),
  status:                 text('status').default('new'),
  createdAt:              timestamp('created_at').defaultNow(),
});

/* ── Feature 8 — Portfolio Items (/admin/portfolio) ────────────────────── */

/**
 * portfolioItems — one row per portfolio piece Claire highlights in her portfolio manager.
 * 
 * packageType is constrained to: "simple" | "something-special" | "remembrance"
 */
export const portfolioItems = pgTable('portfolio_items', {
  id:          serial('id').primaryKey(),
  title:       text('title').notNull(),
  story:       text('story').notNull(),
  packageType: text('package_type').notNull(), // "simple" | "something-special" | "remembrance"
  imageUrl:    text('image_url').notNull(),
  createdAt:   timestamp('created_at').defaultNow(),
});

/* ── Feature 10 (Follow-up) — Admin Users Table ───────────────────────── */

export const adminUsers = pgTable('admin_users', {
  id:           serial('id').primaryKey(),
  email:        text('email').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  createdAt:    timestamp('created_at').defaultNow(),
});
