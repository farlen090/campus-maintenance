import { useMemo, useState, type FormEvent } from "react";
import {
  CreateReportForm,
  type CreateReportInput,
  type CreatedReportResult
} from "../features/reports/components/CreateReportForm";
import {
  ReportDetailPage,
  type AddCommentInput
} from "../features/reports/components/ReportDetailPage";
import { ReportListPage } from "../features/reports/components/ReportListPage";
import { requestStatusKeys } from "../features/reports/constants";
import { requestComments as initialRequestComments } from "../features/reports/data/requestComments";
import { statusHistories as initialStatusHistories } from "../features/reports/data/statusHistories";
import { serviceRequests } from "../features/reports/data/serviceRequests";
import type {
  RequestComment,
  ServiceRequest,
  StatusHistory
} from "../features/reports/types";
import { users } from "../shared/data/users";
import type { UserRole } from "../shared/types/user";

const navigationItems = [
  "Dashboard",
  "Daftar Laporan",
  "Buat Laporan",
  "Tugas Teknisi"
];

type SessionActor = "pelapor" | "admin" | "teknisi" | null;

export function App() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [sessionActor, setSessionActor] = useState<SessionActor>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const storedRole = window.localStorage.getItem("userRole");

    if (storedRole === "pelapor" || storedRole === "admin" || storedRole === "teknisi") {
      return storedRole;
    }

    return null;
  });
  const [loginInput, setLoginInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [requests, setRequests] = useState<ServiceRequest[]>(serviceRequests);
  const [requestComments, setRequestComments] = useState<RequestComment[]>(
    initialRequestComments
  );
  const [statusHistories, setStatusHistories] = useState<StatusHistory[]>(
    initialStatusHistories
  );

  const activeRole = useMemo<UserRole>(() => {
    if (sessionActor === "admin") {
      return "admin";
    }

    if (sessionActor === "teknisi") {
      return "technician";
    }

    return "student";
  }, [sessionActor]);

  const activeReporter = useMemo(() => {
    if (activeRole !== "student" && activeRole !== "staff") {
      return null;
    }

    return users.find((user) => user.role === activeRole) ?? null;
  }, [activeRole]);

  const visibleNavigationItems = useMemo(() => {
    switch (sessionActor) {
      case "pelapor":
        return ["Dashboard", "Daftar Laporan", "Buat Laporan"];
      case "admin":
        return ["Dashboard", "Daftar Laporan", "Buat Laporan"];
      case "teknisi":
        return ["Dashboard", "Daftar Laporan", "Tugas Teknisi"];
      default:
        return [];
    }
  }, [sessionActor]);

  const currentNav =
    activeNav === "Detail Laporan"
      ? "Detail Laporan"
      : visibleNavigationItems.includes(activeNav)
        ? activeNav
        : visibleNavigationItems[0] ?? "Dashboard";

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
    if (sessionActor === "pelapor") {
      return requests.filter(
        (request) => request.reporterId === activeReporter?.id
      );
    }

    if (sessionActor === "teknisi") {
      return requests.filter(
        (request) => request.assignedTechnicianId === "USR-004"
      );
    }

    return requests;
  }, [activeReporter?.id, requests, sessionActor]);

  const activeUser = useMemo(
    () => users.find((user) => user.role === activeRole) ?? users[0],
    [activeRole]
  );

  const selectedRequest = useMemo(
    () =>
      selectedRequestId
        ? requests.find((request) => request.id === selectedRequestId) ?? null
        : null,
    [requests, selectedRequestId]
  );

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

  function handleSelectRequest(requestId: string) {
    setSelectedRequestId(requestId);
    setActiveNav("Detail Laporan");
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedActor = loginInput.trim().toLowerCase();

    if (normalizedActor === "pelapor" || normalizedActor === "admin" || normalizedActor === "teknisi") {
      window.localStorage.setItem("userRole", normalizedActor);
      setSessionActor(normalizedActor);
      setLoginError("");
      setLoginInput("");
      setSelectedRequestId(null);

      if (normalizedActor === "pelapor") {
        setActiveNav("Buat Laporan");
      } else if (normalizedActor === "teknisi") {
        setActiveNav("Tugas Teknisi");
      } else {
        setActiveNav("Daftar Laporan");
      }

      return;
    }

    setLoginError("Aktor tidak dikenal! Gunakan 'pelapor', 'admin', atau 'teknisi'.");
  }

  function handleLogout() {
    window.localStorage.removeItem("userRole");
    setSessionActor(null);
    setLoginInput("");
    setLoginError("");
    setSelectedRequestId(null);
    setActiveNav("Dashboard");
  }

  function handleAdminDemo(action: "priority" | "assign") {
    if (!selectedRequestId && requests.length === 0) {
      return;
    }

    const targetRequest = requests.find((request) => request.id === selectedRequestId) ?? requests[0];

    if (!targetRequest) {
      return;
    }

    const updatedAt = new Date().toISOString();
    const newStatus = action === "assign" ? "Assigned" : targetRequest.status;
    const updatedPriority = action === "priority" ? "High" : targetRequest.priority;
    const updatedAssignedTechnicianId = action === "assign" ? "USR-004" : targetRequest.assignedTechnicianId;

    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === targetRequest.id
          ? {
              ...request,
              priority: updatedPriority,
              assignedTechnicianId: updatedAssignedTechnicianId,
              status: newStatus,
              statusKey: requestStatusKeys[newStatus as keyof typeof requestStatusKeys],
              updatedAt
            }
          : request
      )
    );

    setStatusHistories((currentHistories) => [
      {
        id: `HIS-${String(currentHistories.length + 1).padStart(3, "0")}`,
        requestId: targetRequest.id,
        changedBy: activeUser.id,
        fromStatus: targetRequest.status,
        toStatus: newStatus,
        note:
          action === "priority"
            ? "Prioritas diset ke High oleh admin simulasi."
            : "Laporan ditugaskan ke teknisi IT oleh admin simulasi.",
        createdAt: updatedAt
      },
      ...currentHistories
    ]);
  }

  function handleAddComment(input: AddCommentInput): RequestComment {
    const newComment: RequestComment = {
      id: `COM-${String(requestComments.length + 1).padStart(3, "0")}`,
      requestId: input.requestId,
      authorId: activeUser.id,
      commentType: "comment",
      message: input.message,
      createdAt: new Date().toISOString()
    };

    setRequestComments((currentComments) => [...currentComments, newComment]);

    return newComment;
  }

  const latestRequests = visibleRequests.slice(0, 4);

  if (sessionActor === null) {
    return (
      <div className="auth-shell">
        <section className="auth-card" aria-labelledby="login-title">
          <p className="eyebrow">FR-13 · Login Simulasi</p>
          <h1 id="login-title">Masuk ke Campus Maintenance</h1>
          <p className="auth-copy">
            Masukkan salah satu aktor dummy berikut: pelapor, admin, atau teknisi.
          </p>
          <form className="auth-form" onSubmit={handleLogin} noValidate>
            <label htmlFor="actor-login">
              <span>Masukkan Username/Aktor Anda</span>
              <input
                id="actor-login"
                aria-label="Masukkan Username/Aktor Anda"
                autoComplete="off"
                onChange={(event) => setLoginInput(event.target.value)}
                placeholder="Contoh: pelapor"
                type="text"
                value={loginInput}
              />
            </label>
            {loginError ? (
              <p className="field-error" role="alert">
                {loginError}
              </p>
            ) : null}
            <button className="primary-button" type="submit">
              Masuk
            </button>
          </form>
        </section>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Campus Service Request</p>
          <h1>Campus Maintenance</h1>
        </div>
        <div className="header-actions">
          <div className="session-pill">
            <span>Aktor aktif</span>
            <strong>{sessionActor}</strong>
          </div>
          <button className="secondary-button" type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <nav className="main-nav" aria-label="Navigasi utama">
        {visibleNavigationItems.map((item) => (
          <button
            className={item === currentNav ? "nav-item active" : "nav-item"}
            key={item}
            onClick={() => setActiveNav(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </nav>

      <main className="content-grid">
        {currentNav === "Detail Laporan" && selectedRequest ? (
          <ReportDetailPage
            request={selectedRequest}
            users={users}
            comments={requestComments}
            histories={statusHistories}
            onBack={() => setActiveNav("Daftar Laporan")}
            onAddComment={handleAddComment}
          />
        ) : currentNav === "Daftar Laporan" ? (
          <>
            {sessionActor === "admin" ? (
              <section className="admin-panel" aria-labelledby="admin-sim-title">
                <div className="section-heading">
                  <p className="eyebrow">Simulasi Admin</p>
                  <h2 id="admin-sim-title">Kelola prioritas & penugasan</h2>
                </div>
                <div className="admin-actions">
                  <button
                    className="secondary-button"
                    onClick={() => handleAdminDemo("priority")}
                    type="button"
                  >
                    Tetapkan prioritas High
                  </button>
                  <button
                    className="secondary-button"
                    onClick={() => handleAdminDemo("assign")}
                    type="button"
                  >
                    Tugaskan ke teknisi
                  </button>
                </div>
              </section>
            ) : null}
            <ReportListPage
              requests={visibleRequests}
              users={users}
              onCreateClick={() => setActiveNav("Buat Laporan")}
              onSelectRequest={handleSelectRequest}
            />
          </>
        ) : currentNav === "Buat Laporan" ? (
          <CreateReportForm
            canCreate={activeReporter !== null}
            reporterName={activeReporter?.name ?? null}
            onCreate={handleCreateReport}
          />
        ) : currentNav === "Tugas Teknisi" ? (
          <ReportListPage
            requests={visibleRequests}
            users={users}
            onCreateClick={() => setActiveNav("Buat Laporan")}
            onSelectRequest={handleSelectRequest}
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

        {currentNav === "Daftar Laporan" || currentNav === "Detail Laporan" || currentNav === "Tugas Teknisi" ? null : (
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
