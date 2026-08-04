import "dotenv/config";
import { defineConfig } from "prisma/config";
import { getDirectDatabaseUrl } from "./lib/db/connection";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Direct connection for migrations; app runtime uses the pooled URL.
    url: getDirectDatabaseUrl(),
  },
});