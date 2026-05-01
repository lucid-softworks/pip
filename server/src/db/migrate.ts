import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { env } from '../env.ts';

/**
 * Applies any pending Drizzle migrations from ./drizzle. Idempotent — drizzle
 * tracks applied migrations in __drizzle_migrations, so calling this on every
 * boot is safe and is what we want on platforms like Railway where there's no
 * separate "release" hook.
 */
export async function runMigrations() {
  const client = postgres(env.DATABASE_URL, { max: 1 });
  try {
    const db = drizzle(client);
    await migrate(db, { migrationsFolder: './drizzle' });
  } finally {
    await client.end({ timeout: 5 });
  }
}

// When invoked directly (`bun src/db/migrate.ts`), run and exit. Useful for
// one-off CLI invocations from a Railway shell or CI.
if (import.meta.main) {
  await runMigrations();
  console.log('migrations: applied');
  process.exit(0);
}
