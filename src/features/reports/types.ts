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
  createdAt: string;
};
