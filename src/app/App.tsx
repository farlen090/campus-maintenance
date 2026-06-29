import { useMemo, useState } from "react";
import { RoleSelector } from "../features/users/components/RoleSelector";
import { dashboardSummary } from "../features/dashboard/data/dashboardSummary";
import { serviceRequests } from "../features/reports/data/serviceRequests";
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

  const visibleRequests = useMemo(() => {
    if (activeRole !== "technician") {
      return serviceRequests;
    }

    return serviceRequests.filter(
      (request) => request.assignedTechnicianId === "USR-004"
    );
  }, [activeRole]);

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
        <section className="summary-panel" aria-labelledby="dashboard-title">
          <div className="section-heading">
            <p className="eyebrow">ISSUE-01 foundation</p>
            <h2 id="dashboard-title">Ringkasan Awal</h2>
          </div>

          <div className="metric-grid">
            <article className="metric-card">
              <span>Total</span>
              <strong>{dashboardSummary.totalRequests}</strong>
            </article>
            <article className="metric-card">
              <span>Aktif</span>
              <strong>{dashboardSummary.activeRequests}</strong>
            </article>
            <article className="metric-card">
              <span>Urgent</span>
              <strong>{dashboardSummary.urgentRequests}</strong>
            </article>
            <article className="metric-card">
              <span>Closed</span>
              <strong>{dashboardSummary.closedRequests}</strong>
            </article>
          </div>
        </section>

        <section className="request-panel" aria-labelledby="requests-title">
          <div className="section-heading">
            <p className="eyebrow">Dummy data</p>
            <h2 id="requests-title">Laporan Terbaru</h2>
          </div>

          <div className="request-list">
            {visibleRequests.slice(0, 4).map((request) => (
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
      </main>
    </div>
  );
}
