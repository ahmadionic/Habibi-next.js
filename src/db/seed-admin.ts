import { config } from 'dotenv';
config({ path: '.env.local' });

import { drizzle } from 'drizzle-orm/neon-http';
import { neon }    from '@neondatabase/serverless';
import { adminUsers } from './schema';
import bcrypt from 'bcryptjs';

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set.');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db  = drizzle(sql);

async function main() {
  console.log('🔄 Seeding admin user...');
  await db.delete(adminUsers);
  const passwordHash = await bcrypt.hash('admin@habibi', 10);
  const [newAdmin] = await db
    .insert(adminUsers)
    .values({
      email: 'admin@habibi.com',
      passwordHash,
    })
    .returning();
  console.log(`🎉 Admin created: ${newAdmin.email}`);
}

main().catch(console.error);
