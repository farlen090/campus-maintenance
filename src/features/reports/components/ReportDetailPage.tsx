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
};

export function ReportDetailPage({
  request,
  users,
  comments,
  histories,
  onBack,
  onAddComment
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

  return (
    <section className="detail-panel" aria-labelledby="report-detail-title">
      <button className="secondary-button" type="button" onClick={onBack}>
        Kembali ke Daftar
      </button>

      <div className="detail-header">
        <div>
          <p className="eyebrow">ISSUE-05</p>
          <h2 id="report-detail-title">
            {request.id} - {request.title}
          </h2>
        </div>
        <span className={`status-badge ${request.statusKey}`}>
          {request.status}
        </span>
      </div>

      <div className="detail-grid">
        <article className="detail-section">
          <h3>Deskripsi</h3>
          <p>{request.description}</p>
        </article>

        <article className="detail-section">
          <h3>Informasi</h3>
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
      </div>

      <article className="detail-section">
        <h3>Komentar dan Catatan</h3>
        <form className="comment-form" onSubmit={handleSubmit} noValidate>
          <label>
            <span>Tulis komentar</span>
            <textarea
              aria-label="Tulis komentar"
              rows={3}
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

        <div className="timeline-list">
          {requestComments.length === 0 ? (
            <p className="muted-text">Belum ada komentar.</p>
          ) : (
            requestComments.map((comment) => (
              <div className="timeline-item" key={comment.id}>
                <strong>{userNames.get(comment.authorId) ?? "User tidak dikenal"}</strong>
                <span>{comment.commentType === "work_note" ? "Catatan kerja" : "Komentar"}</span>
                <p>{comment.message}</p>
              </div>
            ))
          )}
        </div>
      </article>

      <article className="detail-section">
        <h3>Riwayat Status</h3>
        <div className="timeline-list">
          {requestHistories.map((history) => (
            <div className="timeline-item" key={history.id}>
              <strong>{history.toStatus}</strong>
              <span>
                Oleh {userNames.get(history.changedBy) ?? "User tidak dikenal"}
              </span>
              {history.note ? <p>{history.note}</p> : null}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
