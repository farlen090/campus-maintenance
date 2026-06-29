import type { User } from "../types/user";

export const users: User[] = [
  {
    id: "USR-001",
    name: "Farlen Mahasiswa",
    email: "farlen@student.campus.ac.id",
    role: "student",
    department: "Teknik Informatika"
  },
  {
    id: "USR-002",
    name: "Sinta Staff",
    email: "sinta.staff@campus.ac.id",
    role: "staff",
    department: "Akademik"
  },
  {
    id: "USR-003",
    name: "Budi Admin",
    email: "budi.admin@campus.ac.id",
    role: "admin",
    department: "Sarana Prasarana"
  },
  {
    id: "USR-004",
    name: "Andi Teknisi IT",
    email: "andi.it@campus.ac.id",
    role: "technician",
    department: "IT Support"
  },
  {
    id: "USR-005",
    name: "Rina Manajer",
    email: "rina.manager@campus.ac.id",
    role: "facility_manager",
    department: "Fasilitas"
  }
];
