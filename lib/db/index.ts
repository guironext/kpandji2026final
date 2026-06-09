import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";
import { neonConfig } from "@neondatabase/serverless";
import { Pool } from "pg";
import ws from "ws";
import { PrismaClient, type Prisma } from "@/generated/prisma/client";
import {
  createPgPoolConfig,
  getAppDatabaseUrl,
  isNeonDatabase,
} from "@/lib/db/connection";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  pool?: Pool;
};

/** Models added after a dev server start won't exist on a cached client until it is recreated. */
const REQUIRED_DELEGATES = ["ecrireSav", "message_Contact"] as const;

function isStalePrismaClient(client: PrismaClient): boolean {
  return REQUIRED_DELEGATES.some((key) => !(key in client));
}

function createPrismaClient(): PrismaClient {
  const connectionString = getAppDatabaseUrl();
  const log: Prisma.LogLevel[] =
    process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"];

  if (isNeonDatabase(connectionString)) {
    neonConfig.webSocketConstructor = ws;
    const adapter = new PrismaNeon({ connectionString });
    return new PrismaClient({ adapter, log });
  }

  const pool =
    globalForPrisma.pool ?? new Pool(createPgPoolConfig(connectionString));
  globalForPrisma.pool = pool;

  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter, log });
}

function getPrismaClient(): PrismaClient {
  const cached = globalForPrisma.prisma;
  if (cached && !isStalePrismaClient(cached)) {
    return cached;
  }

  const client = createPrismaClient();
  globalForPrisma.prisma = client;
  return client;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getPrismaClient();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function"
      ? (value as (...args: unknown[]) => unknown).bind(client)
      : value;
  },
});

export {
  InvitationStatus,
  UserRole,
  UserStatus,
} from "@/generated/prisma/client";
