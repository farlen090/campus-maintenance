import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import type {
  RequestComment,
  ServiceRequest,
  StatusHistory
} from "../types";
import type { User } from "../../../shared/types/user";

export type AddCommentInput = {
  requestId: string;
  message: string;
};

type ReportDetailPageProps = {
  request: ServiceRequest;
  users: User[];
  comments: RequestComment[];
  histories: StatusHistory[];
  onBack: () => void;
  onAddComment: (input: AddCommentInput) => RequestComment;
  canAddComment?: boolean;
};

export function ReportDetailPage({
  request,
  users,
  comments,
  histories,
  onBack,
  onAddComment,
  canAddComment = true
}: ReportDetailPageProps) {
  const [message, setMessage] = useState("");
  const [commentError, setCommentError] = useState("");

  const userNames = useMemo(
    () => new Map(users.map((user) => [user.id, user.name])),
    [users]
  );

  const requestComments = useMemo(
    () =>
      comments
        .filter((comment) => comment.requestId === request.id)
        .sort((first, second) => first.createdAt.localeCompare(second.createdAt)),
    [comments, request.id]
  );

  const requestHistories = useMemo(
    () =>
      histories
        .filter((history) => history.requestId === request.id)
        .sort((first, second) => first.createdAt.localeCompare(second.createdAt)),
    [histories, request.id]
  );

  const reporterName = userNames.get(request.reporterId) ?? "Pelapor tidak dikenal";
  const technicianName = request.assignedTechnicianId
    ? userNames.get(request.assignedTechnicianId) ?? "Teknisi tidak dikenal"
    : "Belum ditugaskan";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      setCommentError("Komentar wajib diisi.");
      return;
    }

    onAddComment({
      requestId: request.id,
      message: trimmedMessage
    });
    setMessage("");
    setCommentError("");
  }

  function formatTimestamp(value: string) {
    return new Date(value).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }

  const priorityClass = request.priority.toLowerCase().replace(/\s+/g, "-");

  return (
    <section className="detail-panel" aria-labelledby="report-detail-title">
      <div className="detail-shell">
        <div className="detail-topbar">
          <button className="secondary-button" type="button" onClick={onBack}>
            ← Kembali ke Daftar
          </button>
          <div className="detail-topbar-meta">
            <span className={`status-badge ${request.statusKey}`}>
              {request.status}
            </span>
            <span className={`priority-badge ${priorityClass}`}>
              {request.priority}
            </span>
          </div>
        </div>

        <div className="detail-hero">
          <div className="detail-hero-copy">
            <p className="eyebrow">ISSUE-05 · Detail Laporan</p>
            <h2 id="report-detail-title">
              {request.id} - {request.title}
            </h2>
            <p className="detail-hero-description">{request.description}</p>
          </div>
          <div className="detail-hero-quickstats">
            <div>
              <span>Lokasi</span>
              <strong>{request.location}</strong>
            </div>
            <div>
              <span>Kategori</span>
              <strong>{request.category}</strong>
            </div>
            <div>
              <span>Pelapor</span>
              <strong>{reporterName}</strong>
            </div>
          </div>
        </div>

        <div className="detail-grid">
          <div className="detail-main-column">
            <article className="detail-card">
              <div className="card-title-bar">
                <h3>Informasi Laporan</h3>
              </div>
              <dl className="info-list">
                <div>
                  <dt>Lokasi</dt>
                  <dd>{request.location}</dd>
                </div>
                <div>
                  <dt>Kategori</dt>
                  <dd>{request.category}</dd>
                </div>
                <div>
                  <dt>Prioritas</dt>
                  <dd>{request.priority}</dd>
                </div>
                <div>
                  <dt>Pelapor</dt>
                  <dd>{reporterName}</dd>
                </div>
                <div>
                  <dt>Teknisi</dt>
                  <dd>{technicianName}</dd>
                </div>
              </dl>
            </article>

            <article className="detail-card">
              <div className="card-title-bar">
                <h3>Deskripsi</h3>
              </div>
              <p className="detail-summary-copy">{request.description}</p>
            </article>
          </div>

          <div className="detail-side-column">
            <article className="detail-card">
              <div className="card-title-bar">
                <h3>Riwayat Status</h3>
              </div>
              <div className="timeline-list">
                {requestHistories.length === 0 ? (
                  <p className="muted-text">Belum ada riwayat status.</p>
                ) : (
                  requestHistories.map((history) => (
                    <div className="timeline-item" key={history.id}>
                      <div className="timeline-meta">
                        <strong>{history.toStatus}</strong>
                        <span>{formatTimestamp(history.createdAt)}</span>
                      </div>
                      <span className="timeline-tag">
                        Oleh {userNames.get(history.changedBy) ?? "User tidak dikenal"}
                      </span>
                      {history.note ? <p>{history.note}</p> : null}
                    </div>
                  ))
                )}
              </div>
            </article>

            <article className="detail-card">
              <div className="card-title-bar">
                <h3>Komentar & Catatan</h3>
              </div>
              {canAddComment ? (
                <form className="comment-form" onSubmit={handleSubmit} noValidate>
                  <label>
                    <span>Tulis komentar</span>
                    <textarea
                      aria-label="Tulis komentar"
                      rows={4}
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                    />
                  </label>
                  {commentError ? (
                    <p className="field-error" role="alert">
                      {commentError}
                    </p>
                  ) : null}
                  <button className="primary-button" type="submit">
                    Tambah Komentar
                  </button>
                </form>
              ) : (
                <p className="muted-text">
                  Manajer fasilitas hanya memantau komentar dan catatan laporan.
                </p>
              )}

              <div className="timeline-list comment-timeline">
                {requestComments.length === 0 ? (
                  <p className="muted-text">Belum ada komentar.</p>
                ) : (
                  requestComments.map((comment) => (
                    <div className="timeline-item" key={comment.id}>
                      <div className="timeline-meta">
                        <strong>{userNames.get(comment.authorId) ?? "User tidak dikenal"}</strong>
                        <span>{formatTimestamp(comment.createdAt)}</span>
                      </div>
                      <span className="timeline-tag">
                        {comment.commentType === "work_note" ? "Catatan kerja" : "Komentar"}
                      </span>
                      <p>{comment.message}</p>
                    </div>
                  ))
                )}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
