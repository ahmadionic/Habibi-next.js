/**
 * One-time seed script — inserts 6 sample products (one per category).
 * Run once with: npx tsx src/db/seed.ts
 *
 * Prices are stored in fils (smallest QAR unit): QAR 85 = 8500 fils.
 * Image paths point to placeholder assets in /public/assets/shop/.
 * FEATURE_SRS §6 categories:
 *   tote-bags | mugs | planners-journals | cards | qatar-heritage | home-essentials
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { drizzle } from 'drizzle-orm/neon-http';
import { neon }    from '@neondatabase/serverless';
import { products } from './schema';

if (!process.env.DATABASE_URL) {
  console.error('❌  DATABASE_URL is not set in .env.local — aborting.');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db  = drizzle(sql);

const SEED_PRODUCTS = [
  {
    name:        'Sage Linen Tote Bag',
    slug:        'sage-linen-tote-bag',
    category:    'tote-bags',
    description: 'A generously sized tote in natural linen, screen-printed with Claire\'s signature botanical motif in sage green. Sturdy enough for the souk, beautiful enough for anywhere.',
    price:       8500,   // QAR 85.00
    imageUrl:    '/assets/shop/product-tote.jpg',
    inStock:     true,
  },
  {
    name:        'Botanical Ceramic Mug',
    slug:        'botanical-ceramic-mug',
    category:    'mugs',
    description: 'A hand-finished ceramic mug featuring Claire\'s illustrated quail-and-botanicals design in warm earth tones. Dishwasher safe; holds a generous 350 ml.',
    price:       6500,   // QAR 65.00
    imageUrl:    '/assets/shop/product-mug.jpg',
    inStock:     true,
  },
  {
    name:        'HABibi Wellbeing Journal',
    slug:        'habibi-wellbeing-journal',
    category:    'planners-journals',
    description: 'A guided wellbeing journal with a cream linen cover, gold-foil HABibi wordmark, and 180 pages of prompted reflection, gratitude, and creative space — designed to sit beautifully on any desk.',
    price:       12000,  // QAR 120.00
    imageUrl:    '/assets/shop/product-journal.jpg',
    inStock:     true,
  },
  {
    name:        'Animal Connection Card Set',
    slug:        'animal-connection-card-set',
    category:    'cards',
    description: 'A set of 10 illustrated greeting cards, each featuring one of Claire\'s hand-drawn animal portraits on 350gsm art card. Blank inside; presented in a kraft sleeve.',
    price:       4500,   // QAR 45.00
    imageUrl:    '/assets/shop/product-cards.jpg',
    inStock:     true,
  },
  {
    name:        'Qatar Heritage Falcon Print',
    slug:        'qatar-heritage-falcon-print',
    category:    'qatar-heritage',
    description: 'A limited-edition giclée print of Claire\'s detailed graphite and pastel study of a Qatari Saker falcon — part of the HABibi Qatar Heritage Collection. Ships flat, ready to frame at A3.',
    price:       18500,  // QAR 185.00
    imageUrl:    '/assets/shop/product-heritage.jpg',
    inStock:     true,
  },
  {
    name:        'Cream & Sage Linen Cushion',
    slug:        'cream-sage-linen-cushion',
    category:    'home-essentials',
    description: 'A 45 × 45 cm cushion cover in natural cream linen, embroidered with a small sage-green paw motif. Zip fastening; cushion pad not included.',
    price:       14500,  // QAR 145.00
    imageUrl:    '/assets/shop/product-home.jpg',
    inStock:     true,
  },
];

async function seed() {
  console.log('🌱  Seeding products table…');

  const inserted = await db
    .insert(products)
    .values(SEED_PRODUCTS)
    .returning();

  console.log(`✅  Inserted ${inserted.length} products:\n`);
  inserted.forEach((p) => {
    const qar = (p.price / 100).toFixed(2);
    console.log(`  [${p.id}] ${p.name} — QAR ${qar} (${p.category})`);
  });
}

seed().catch((err) => {
  console.error('❌  Seed failed:', err);
  process.exit(1);
});
