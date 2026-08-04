import type { PoolConfig } from "pg";

/** Pooled URL for app queries (Neon pooler, PgBouncer, etc.). */
export function getAppDatabaseUrl(): string {
  const url =
    process.env.DATABASE_POOL_URL ??
    process.env.DATABASE_URL;

  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }

  return url;
}

/** Direct URL for Prisma CLI (migrations, db push, studio). */
export function getDirectDatabaseUrl(): string {
  if (process.env.DIRECT_URL) {
    return process.env.DIRECT_URL;
  }

  let url = getAppDatabaseUrl();

  // Neon pooler hostnames include "-pooler"; Prisma CLI needs the direct endpoint.
  if (url.includes("-pooler.")) {
    url = url.replace("-pooler.", ".");
  }

  // Neon cold starts can exceed Prisma's default connect timeout.
  if (isNeonDatabase(url) && !/connect_timeout=/i.test(url)) {
    const separator = url.includes("?") ? "&" : "?";
    url = `${url}${separator}connect_timeout=60`;
  }

  return url;
}

export function isNeonDatabase(url: string): boolean {
  return /neon\.tech|neon\.database/i.test(url);
}

function connectionNeedsSsl(url: string): boolean {
  return /sslmode=(require|verify-full|verify-ca|prefer)/i.test(url);
}

/** Tuned for low latency: warm pool, fast connect timeout, connection reuse. */
export function createPgPoolConfig(connectionString: string): PoolConfig {
  const max = Number(process.env.DB_POOL_MAX ?? 12);
  const min = Number(process.env.DB_POOL_MIN ?? 2);

  return {
    connectionString,
    max: Number.isFinite(max) && max > 0 ? max : 12,
    min: Number.isFinite(min) && min >= 0 ? min : 2,
    idleTimeoutMillis: 20_000,
    connectionTimeoutMillis: 3_000,
    allowExitOnIdle: false,
    ...(connectionNeedsSsl(connectionString)
      ? { ssl: { rejectUnauthorized: false } }
      : {}),
  };
}
