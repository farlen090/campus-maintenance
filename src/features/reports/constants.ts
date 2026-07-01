import type {
  RequestCategory,
  RequestPriority,
  RequestStatus,
  RequestStatusKey
} from "./types";

export const requestStatuses: RequestStatus[] = [
  "Submitted",
  "Under Review",
  "Assigned",
  "In Progress",
  "Resolved",
  "Closed"
];

export const requestStatusKeys: Record<RequestStatus, RequestStatusKey> = {
  Submitted: "submitted",
  "Under Review": "under-review",
  Assigned: "assigned",
  "In Progress": "in-progress",
  Resolved: "resolved",
  Closed: "closed"
};

export const requestPriorities: RequestPriority[] = [
  "Low",
  "Medium",
  "High",
  "Urgent"
];

export const requestCategories: RequestCategory[] = [
  "Internet",
  "AC",
  "Peralatan Kelas",
  "Kebersihan",
  "Laboratorium",
  "Lainnya"
];
