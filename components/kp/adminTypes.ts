export type AdminUser = {
  id: string;
  email: string;
  fullName: string | null;
  role: "ADMIN" | "PRESTIGE_USER";
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
};
