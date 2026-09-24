import pg from 'pg';

async function check(conn: string, label: string) {
  const client = new pg.Client({ connectionString: conn });
  try {
    await client.connect();
    const db = await client.query('SELECT current_database() AS db');
    const tables = await client.query(
      "SELECT tablename FROM pg_tables WHERE schemaname='public' ORDER BY 1"
    );
    console.log(`[${label}] connected -> db=${db.rows[0].db}`);
    console.log(`[${label}] tables: ${tables.rows.map((r) => r.tablename).join(', ') || '(none)'}`);
  } catch (e) {
    console.log(`[${label}] FAILED: ${(e as Error).message}`);
  } finally {
    await client.end().catch(() => {});
  }
}

// What the app uses if `.env` is NOT loaded (db.configs.ts defaults)
await check('postgres://postgres:postgres@localhost:5432/postgres', 'config-defaults -> 5432/postgres');
// What `.env` points at
await check('postgres://postgres:user@localhost:5433/propertydb', '.env -> 5433/propertydb');
