export type UserRole =
  | "student"
  | "staff"
  | "admin"
  | "technician"
  | "facility_manager";

export type UserRoleOption = {
  value: UserRole;
  label: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  createdAt: string;
  updatedAt: string;
};
