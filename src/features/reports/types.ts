export type RequestStatus =
  | "Submitted"
  | "Under Review"
  | "Assigned"
  | "In Progress"
  | "Resolved"
  | "Closed";

export type RequestStatusKey =
  | "submitted"
  | "under-review"
  | "assigned"
  | "in-progress"
  | "resolved"
  | "closed";

export type RequestPriority = "Low" | "Medium" | "High" | "Urgent";

export type RequestCategory =
  | "Internet"
  | "AC"
  | "Peralatan Kelas"
  | "Kebersihan"
  | "Laboratorium"
  | "Lainnya";

export type RequestCommentType = "comment" | "work_note" | "reopen_note";

export type ServiceRequest = {
  id: string;
  title: string;
  description: string;
  location: string;
  category: RequestCategory;
  priority: RequestPriority;
  status: RequestStatus;
  statusKey: RequestStatusKey;
  reporterId: string;
  assignedTechnicianId: string | null;
  reviewedBy: string | null;
  reviewedAt: string | null;
  resolvedAt: string | null;
  closedAt: string | null;
  reopenReason: string | null;
  createdAt: string;
  updatedAt: string;
};

export type RequestComment = {
  id: string;
  requestId: string;
  authorId: string;
  commentType: RequestCommentType;
  message: string;
  createdAt: string;
};

export type StatusHistory = {
  id: string;
  requestId: string;
  changedBy: string;
  fromStatus: RequestStatus | null;
  toStatus: RequestStatus;
  note: string | null;
  createdAt: string;
};
