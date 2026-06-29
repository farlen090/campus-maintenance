import type { ServiceRequest } from "../types";

export const serviceRequests: ServiceRequest[] = [
  {
    id: "REQ-001",
    title: "Proyektor Ruang 101 tidak menyala",
    description: "Proyektor tidak menampilkan gambar saat digunakan untuk kelas.",
    location: "Ruang 101",
    category: "Peralatan Kelas",
    priority: "High",
    status: "Submitted",
    statusKey: "submitted",
    reporterId: "USR-001",
    assignedTechnicianId: null,
    createdAt: "2026-06-29T08:00:00Z"
  },
  {
    id: "REQ-002",
    title: "Internet laboratorium bermasalah",
    description: "Koneksi internet sering putus saat praktikum.",
    location: "Laboratorium Komputer",
    category: "Internet",
    priority: "Urgent",
    status: "Assigned",
    statusKey: "assigned",
    reporterId: "USR-002",
    assignedTechnicianId: "USR-004",
    createdAt: "2026-06-29T08:20:00Z"
  },
  {
    id: "REQ-003",
    title: "AC Ruang 204 tidak dingin",
    description: "AC menyala tetapi ruangan tetap panas.",
    location: "Ruang 204",
    category: "AC",
    priority: "Medium",
    status: "In Progress",
    statusKey: "in-progress",
    reporterId: "USR-002",
    assignedTechnicianId: "USR-004",
    createdAt: "2026-06-29T09:00:00Z"
  },
  {
    id: "REQ-004",
    title: "Ruang kelas perlu dibersihkan",
    description: "Ruang kelas masih kotor setelah kegiatan organisasi.",
    location: "Ruang 305",
    category: "Kebersihan",
    priority: "Low",
    status: "Closed",
    statusKey: "closed",
    reporterId: "USR-001",
    assignedTechnicianId: "USR-006",
    createdAt: "2026-06-28T14:30:00Z"
  }
];
