import { neon } from "@neondatabase/serverless";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const envPath = ".env";

if (existsSync(envPath)) {
  const envFile = readFileSync(envPath, "utf8");

  for (const line of envFile.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const [key, ...parts] = trimmed.split("=");
    const value = parts.join("=").trim().replace(/^['"]|['"]$/g, "");

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

const databaseUrl = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL or POSTGRES_URL is required to run migrations.");
}

const sql = neon(databaseUrl);
const migrationsDir = "sql/migrations";
const migrationFiles = readdirSync(migrationsDir)
  .filter((file) => file.endsWith(".sql"))
  .sort();

function splitSqlStatements(sqlText) {
  return sqlText
    .split(";")
    .map((statement) => statement.trim())
    .filter(Boolean);
}

await sql.query(`
  create table if not exists app_migrations (
    id text primary key,
    applied_at timestamptz not null default now()
  )
`);

for (const file of migrationFiles) {
  const alreadyApplied = await sql`
    select exists (
      select 1 from app_migrations where id = ${file}
    ) as applied
  `;

  if (alreadyApplied[0]?.applied) {
    console.log(`Skipping migration ${file}`);
    continue;
  }

  const migration = readFileSync(join(migrationsDir, file), "utf8");

  for (const statement of splitSqlStatements(migration)) {
    await sql.query(statement);
  }

  await sql`
    insert into app_migrations (id) values (${file})
  `;

  console.log(`Applied migration ${file}`);
}
