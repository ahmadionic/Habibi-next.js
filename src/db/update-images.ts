import { config } from 'dotenv';
config({ path: '.env.local' });

import { drizzle } from 'drizzle-orm/neon-http';
import { neon }    from '@neondatabase/serverless';
import { products } from './schema';
import { eq }      from 'drizzle-orm';

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set.');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db  = drizzle(sql);

const UPDATES = [
  { slug: 'sage-linen-tote-bag',        imageUrl: '/assets/shop/product-tote.jpg' },
  { slug: 'botanical-ceramic-mug',      imageUrl: '/assets/shop/product-mug.jpg' },
  { slug: 'habibi-wellbeing-journal',   imageUrl: '/assets/shop/product-journal.jpg' },
  { slug: 'animal-connection-card-set', imageUrl: '/assets/shop/product-cards.jpg' },
  { slug: 'qatar-heritage-falcon-print', imageUrl: '/assets/shop/product-heritage.jpg' },
  { slug: 'cream-sage-linen-cushion',   imageUrl: '/assets/shop/product-home.jpg' },
];

async function main() {
  console.log('🔄 Updating database product image URLs...');
  for (const item of UPDATES) {
    await db
      .update(products)
      .set({ imageUrl: item.imageUrl })
      .where(eq(products.slug, item.slug));
    console.log(`✅ Updated ${item.slug} -> ${item.imageUrl}`);
  }
  console.log('🎉 Done updating product images.');
}

main().catch(console.error);
