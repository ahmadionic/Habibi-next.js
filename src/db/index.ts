import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const connect = (databaseUrl?: string) => {
  if (!databaseUrl) {
    return new Proxy({} as Record<string, unknown>, {
      get() {
        throw new Error('DATABASE_URL is required');
      },
    }) as unknown as ReturnType<typeof drizzle>;
  }

  return drizzle(neon(databaseUrl));
};

export const db = connect(process.env.DATABASE_URL);
export default db;
