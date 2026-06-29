import { serviceRequests } from "../../reports/data/serviceRequests";

export const dashboardSummary = {
  totalRequests: serviceRequests.length,
  activeRequests: serviceRequests.filter((request) => request.status !== "Closed")
    .length,
  urgentRequests: serviceRequests.filter((request) => request.priority === "Urgent")
    .length,
  closedRequests: serviceRequests.filter((request) => request.status === "Closed")
    .length
};
