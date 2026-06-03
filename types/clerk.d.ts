import type { KpUserRole } from "@/lib/auth/roles";

declare global {
  interface CustomJwtSessionClaims {
    metadata?: {
      role?: KpUserRole;
    };
    publicMetadata?: {
      role?: KpUserRole;
    };
  }

  interface UserPublicMetadata {
    role?: KpUserRole;
  }
}

export {};
