export type AdminUser = {
  id: string;
  email: string;
  fullName: string | null;
  role: "ADMIN" | "CLIENT_USER";
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
};
