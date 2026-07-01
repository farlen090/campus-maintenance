import type { StatusHistory } from "../types";

export const statusHistories: StatusHistory[] = [
  {
    id: "HIS-001",
    requestId: "REQ-001",
    changedBy: "USR-001",
    fromStatus: null,
    toStatus: "Submitted",
    note: "Laporan dibuat oleh pelapor.",
    createdAt: "2026-06-29T08:00:00Z"
  },
  {
    id: "HIS-002",
    requestId: "REQ-002",
    changedBy: "USR-002",
    fromStatus: null,
    toStatus: "Submitted",
    note: "Laporan dibuat oleh staff akademik.",
    createdAt: "2026-06-29T08:20:00Z"
  },
  {
    id: "HIS-003",
    requestId: "REQ-002",
    changedBy: "USR-003",
    fromStatus: "Submitted",
    toStatus: "Under Review",
    note: "Admin memeriksa dampak gangguan internet.",
    createdAt: "2026-06-29T08:35:00Z"
  },
  {
    id: "HIS-004",
    requestId: "REQ-002",
    changedBy: "USR-003",
    fromStatus: "Under Review",
    toStatus: "Assigned",
    note: "Ditugaskan ke teknisi IT.",
    createdAt: "2026-06-29T08:45:00Z"
  },
  {
    id: "HIS-005",
    requestId: "REQ-003",
    changedBy: "USR-002",
    fromStatus: null,
    toStatus: "Submitted",
    note: "Laporan dibuat oleh staff akademik.",
    createdAt: "2026-06-29T09:00:00Z"
  },
  {
    id: "HIS-006",
    requestId: "REQ-003",
    changedBy: "USR-003",
    fromStatus: "Submitted",
    toStatus: "Under Review",
    note: "Admin memeriksa laporan AC.",
    createdAt: "2026-06-29T09:12:00Z"
  },
  {
    id: "HIS-007",
    requestId: "REQ-003",
    changedBy: "USR-003",
    fromStatus: "Under Review",
    toStatus: "Assigned",
    note: "Ditugaskan ke teknisi IT.",
    createdAt: "2026-06-29T09:30:00Z"
  },
  {
    id: "HIS-008",
    requestId: "REQ-003",
    changedBy: "USR-004",
    fromStatus: "Assigned",
    toStatus: "In Progress",
    note: "Teknisi mulai pekerjaan.",
    createdAt: "2026-06-29T10:00:00Z"
  },
  {
    id: "HIS-009",
    requestId: "REQ-004",
    changedBy: "USR-001",
    fromStatus: null,
    toStatus: "Submitted",
    note: "Laporan dibuat oleh mahasiswa.",
    createdAt: "2026-06-28T14:30:00Z"
  },
  {
    id: "HIS-010",
    requestId: "REQ-004",
    changedBy: "USR-003",
    fromStatus: "Submitted",
    toStatus: "Under Review",
    note: "Admin memeriksa kebutuhan kebersihan.",
    createdAt: "2026-06-28T14:45:00Z"
  },
  {
    id: "HIS-011",
    requestId: "REQ-004",
    changedBy: "USR-003",
    fromStatus: "Under Review",
    toStatus: "Assigned",
    note: "Ditugaskan ke teknisi fasilitas.",
    createdAt: "2026-06-28T15:00:00Z"
  },
  {
    id: "HIS-012",
    requestId: "REQ-004",
    changedBy: "USR-006",
    fromStatus: "Assigned",
    toStatus: "In Progress",
    note: "Pembersihan dimulai.",
    createdAt: "2026-06-28T15:30:00Z"
  },
  {
    id: "HIS-013",
    requestId: "REQ-004",
    changedBy: "USR-006",
    fromStatus: "In Progress",
    toStatus: "Resolved",
    note: "Ruang sudah dibersihkan.",
    createdAt: "2026-06-28T16:00:00Z"
  },
  {
    id: "HIS-014",
    requestId: "REQ-004",
    changedBy: "USR-003",
    fromStatus: "Resolved",
    toStatus: "Closed",
    note: "Admin menutup laporan.",
    createdAt: "2026-06-28T16:20:00Z"
  },
  {
    id: "HIS-015",
    requestId: "REQ-005",
    changedBy: "USR-001",
    fromStatus: null,
    toStatus: "Submitted",
    note: "Laporan lampu koridor dibuat.",
    createdAt: "2026-06-29T11:00:00Z"
  },
  {
    id: "HIS-016",
    requestId: "REQ-005",
    changedBy: "USR-003",
    fromStatus: "Submitted",
    toStatus: "Under Review",
    note: "Admin mengecek kebutuhan perbaikan lampu.",
    createdAt: "2026-06-29T11:20:00Z"
  },
  {
    id: "HIS-017",
    requestId: "REQ-006",
    changedBy: "USR-002",
    fromStatus: null,
    toStatus: "Submitted",
    note: "Laporan meja praktikum dibuat.",
    createdAt: "2026-06-28T10:00:00Z"
  },
  {
    id: "HIS-018",
    requestId: "REQ-006",
    changedBy: "USR-003",
    fromStatus: "Submitted",
    toStatus: "Under Review",
    note: "Admin memeriksa laporan laboratorium.",
    createdAt: "2026-06-28T10:20:00Z"
  },
  {
    id: "HIS-019",
    requestId: "REQ-006",
    changedBy: "USR-003",
    fromStatus: "Under Review",
    toStatus: "Assigned",
    note: "Ditugaskan ke teknisi fasilitas.",
    createdAt: "2026-06-28T10:40:00Z"
  },
  {
    id: "HIS-020",
    requestId: "REQ-006",
    changedBy: "USR-006",
    fromStatus: "Assigned",
    toStatus: "In Progress",
    note: "Perbaikan meja dimulai.",
    createdAt: "2026-06-28T11:15:00Z"
  },
  {
    id: "HIS-021",
    requestId: "REQ-006",
    changedBy: "USR-006",
    fromStatus: "In Progress",
    toStatus: "Resolved",
    note: "Meja sudah diperbaiki.",
    createdAt: "2026-06-28T13:40:00Z"
  }
];
