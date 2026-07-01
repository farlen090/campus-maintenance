import { useMemo, useState } from "react";
import { RoleSelector } from "../features/users/components/RoleSelector";
import {
  CreateReportForm,
  type CreateReportInput,
  type CreatedReportResult
} from "../features/reports/components/CreateReportForm";
import { ReportListPage } from "../features/reports/components/ReportListPage";
import { requestStatusKeys } from "../features/reports/constants";
import { statusHistories as initialStatusHistories } from "../features/reports/data/statusHistories";
import { serviceRequests } from "../features/reports/data/serviceRequests";
import type { ServiceRequest, StatusHistory } from "../features/reports/types";
import { users } from "../shared/data/users";
import type { UserRole } from "../shared/types/user";

const navigationItems = [
  "Dashboard",
  "Daftar Laporan",
  "Buat Laporan",
  "Tugas Teknisi"
];

export function App() {
  const [activeRole, setActiveRole] = useState<UserRole>("student");
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [requests, setRequests] = useState<ServiceRequest[]>(serviceRequests);
  const [statusHistories, setStatusHistories] = useState<StatusHistory[]>(
    initialStatusHistories
  );

  const activeReporter = useMemo(() => {
    if (activeRole !== "student" && activeRole !== "staff") {
      return null;
    }

    return users.find((user) => user.role === activeRole) ?? null;
  }, [activeRole]);

  const dashboardCounts = useMemo(
    () => ({
      totalRequests: requests.length,
      activeRequests: requests.filter((request) => request.status !== "Closed")
        .length,
      urgentRequests: requests.filter((request) => request.priority === "Urgent")
        .length,
      closedRequests: requests.filter((request) => request.status === "Closed")
        .length
    }),
    [requests]
  );

  const visibleRequests = useMemo(() => {
    if (activeRole !== "technician") {
      return requests;
    }

    return requests.filter(
      (request) => request.assignedTechnicianId === "USR-004"
    );
  }, [activeRole, requests]);

  function handleCreateReport(input: CreateReportInput): CreatedReportResult {
    const createdAt = new Date().toISOString();
    const requestNumber = requests.length + 1;
    const newRequest: ServiceRequest = {
      id: `REQ-${String(requestNumber).padStart(3, "0")}`,
      title: input.title,
      description: input.description,
      location: input.location,
      category: input.category,
      priority: "Medium",
      status: "Submitted",
      statusKey: requestStatusKeys.Submitted,
      reporterId: activeReporter?.id ?? "USR-001",
      assignedTechnicianId: null,
      reviewedBy: null,
      reviewedAt: null,
      resolvedAt: null,
      closedAt: null,
      reopenReason: null,
      createdAt,
      updatedAt: createdAt
    };
    const newHistory: StatusHistory = {
      id: `HIS-${String(statusHistories.length + 1).padStart(3, "0")}`,
      requestId: newRequest.id,
      changedBy: newRequest.reporterId,
      fromStatus: null,
      toStatus: "Submitted",
      note: "Laporan dibuat oleh pelapor.",
      createdAt
    };

    setRequests((currentRequests) => [newRequest, ...currentRequests]);
    setStatusHistories((currentHistories) => [newHistory, ...currentHistories]);

    return {
      request: newRequest,
      history: newHistory
    };
  }

  const latestRequests = visibleRequests.slice(0, 4);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Campus Service Request</p>
          <h1>Campus Maintenance</h1>
        </div>
        <RoleSelector value={activeRole} onChange={setActiveRole} />
      </header>

      <nav className="main-nav" aria-label="Navigasi utama">
        {navigationItems.map((item) => (
          <button
            className={item === activeNav ? "nav-item active" : "nav-item"}
            key={item}
            onClick={() => setActiveNav(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </nav>

      <main className="content-grid">
        {activeNav === "Daftar Laporan" ? (
          <ReportListPage
            requests={visibleRequests}
            users={users}
            onCreateClick={() => setActiveNav("Buat Laporan")}
          />
        ) : activeNav === "Buat Laporan" ? (
          <CreateReportForm
            canCreate={activeReporter !== null}
            reporterName={activeReporter?.name ?? null}
            onCreate={handleCreateReport}
          />
        ) : (
          <section className="summary-panel" aria-labelledby="dashboard-title">
            <div className="section-heading">
              <p className="eyebrow">ISSUE-01 foundation</p>
              <h2 id="dashboard-title">Ringkasan Awal</h2>
            </div>

            <div className="metric-grid">
              <article className="metric-card">
                <span>Total</span>
                <strong>{dashboardCounts.totalRequests}</strong>
              </article>
              <article className="metric-card">
                <span>Aktif</span>
                <strong>{dashboardCounts.activeRequests}</strong>
              </article>
              <article className="metric-card">
                <span>Urgent</span>
                <strong>{dashboardCounts.urgentRequests}</strong>
              </article>
              <article className="metric-card">
                <span>Closed</span>
                <strong>{dashboardCounts.closedRequests}</strong>
              </article>
            </div>
          </section>
        )}

        {activeNav === "Daftar Laporan" ? null : (
          <section className="request-panel" aria-labelledby="requests-title">
            <div className="section-heading">
              <p className="eyebrow">Dummy data</p>
              <h2 id="requests-title">Laporan Terbaru</h2>
            </div>

            <div className="request-list">
              {latestRequests.map((request) => (
                <article className="request-item" key={request.id}>
                  <div>
                    <span className="request-id">{request.id}</span>
                    <h3>{request.title}</h3>
                    <p>{request.location}</p>
                  </div>
                  <span className={`status-badge ${request.statusKey}`}>
                    {request.status}
                  </span>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
