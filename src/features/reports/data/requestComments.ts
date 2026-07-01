import type { RequestComment } from "../types";

export const requestComments: RequestComment[] = [
  {
    id: "COM-001",
    requestId: "REQ-002",
    authorId: "USR-003",
    commentType: "comment",
    message: "Laporan sudah diperiksa dan diprioritaskan karena mengganggu praktikum.",
    createdAt: "2026-06-29T08:40:00Z"
  },
  {
    id: "COM-002",
    requestId: "REQ-003",
    authorId: "USR-004",
    commentType: "work_note",
    message: "Teknisi mulai mengecek filter dan kompresor AC.",
    createdAt: "2026-06-29T10:05:00Z"
  },
  {
    id: "COM-003",
    requestId: "REQ-004",
    authorId: "USR-006",
    commentType: "work_note",
    message: "Ruang 305 sudah dibersihkan dan siap dipakai kembali.",
    createdAt: "2026-06-28T16:05:00Z"
  },
  {
    id: "COM-004",
    requestId: "REQ-006",
    authorId: "USR-006",
    commentType: "work_note",
    message: "Kaki meja sudah dikencangkan dan permukaan meja stabil.",
    createdAt: "2026-06-28T13:35:00Z"
  }
];
