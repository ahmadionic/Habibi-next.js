import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// Next.js auto-loads .env.local for the app; this makes it available to drizzle-kit CLI commands too.
config({ path: '.env.local' });

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
