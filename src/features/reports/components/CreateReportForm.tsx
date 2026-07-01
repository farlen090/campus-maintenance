import { useState } from "react";
import type { FormEvent } from "react";
import { requestCategories } from "../constants";
import type { RequestCategory, ServiceRequest, StatusHistory } from "../types";

export type CreateReportInput = {
  title: string;
  description: string;
  location: string;
  category: RequestCategory;
};

export type CreatedReportResult = {
  request: ServiceRequest;
  history: StatusHistory;
};

type CreateReportFormProps = {
  canCreate: boolean;
  reporterName: string | null;
  onCreate: (input: CreateReportInput) => CreatedReportResult;
};

type FormValues = {
  title: string;
  description: string;
  location: string;
  category: "" | RequestCategory;
};

const initialValues: FormValues = {
  title: "",
  description: "",
  location: "",
  category: ""
};

export function CreateReportForm({
  canCreate,
  reporterName,
  onCreate
}: CreateReportFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<string[]>([]);
  const [createdReport, setCreatedReport] = useState<CreatedReportResult | null>(
    null
  );

  function updateValue(field: keyof FormValues, value: string) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedValues = {
      title: values.title.trim(),
      description: values.description.trim(),
      location: values.location.trim(),
      category: values.category
    };
    const nextErrors = [
      trimmedValues.title ? "" : "Judul wajib diisi.",
      trimmedValues.description ? "" : "Deskripsi wajib diisi.",
      trimmedValues.location ? "" : "Lokasi wajib diisi.",
      trimmedValues.category ? "" : "Kategori wajib dipilih."
    ].filter(Boolean);

    if (nextErrors.length > 0 || !trimmedValues.category) {
      setErrors(nextErrors);
      setCreatedReport(null);
      return;
    }

    const result = onCreate({
      title: trimmedValues.title,
      description: trimmedValues.description,
      location: trimmedValues.location,
      category: trimmedValues.category
    });

    setValues(initialValues);
    setErrors([]);
    setCreatedReport(result);
  }

  if (!canCreate) {
    return (
      <section className="form-panel" aria-labelledby="create-report-title">
        <div className="section-heading">
          <p className="eyebrow">ISSUE-03</p>
          <h2 id="create-report-title">Buat Laporan Baru</h2>
        </div>
        <p className="muted-text">
          Form laporan baru digunakan oleh role Mahasiswa dan Staff sebagai
          pelapor.
        </p>
      </section>
    );
  }

  return (
    <section className="form-panel" aria-labelledby="create-report-title">
      <div className="section-heading">
        <p className="eyebrow">ISSUE-03</p>
        <h2 id="create-report-title">Buat Laporan Baru</h2>
        {reporterName ? (
          <p className="muted-text">Pelapor: {reporterName}</p>
        ) : null}
      </div>

      {errors.length > 0 ? (
        <div className="validation-summary" role="alert">
          <strong>Lengkapi field wajib sebelum menyimpan.</strong>
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {createdReport ? (
        <div className="success-summary" role="status">
          <strong>Laporan baru berhasil dibuat.</strong>
          <span>{createdReport.request.id}</span>
          <span>Status awal: {createdReport.request.status}</span>
          <span>Riwayat awal: {createdReport.history.toStatus}</span>
        </div>
      ) : null}

      <form className="report-form" onSubmit={handleSubmit} noValidate>
        <label>
          <span>Judul laporan</span>
          <input
            aria-label="Judul laporan"
            value={values.title}
            onChange={(event) => updateValue("title", event.target.value)}
            type="text"
          />
        </label>

        <label>
          <span>Lokasi</span>
          <input
            aria-label="Lokasi"
            value={values.location}
            onChange={(event) => updateValue("location", event.target.value)}
            type="text"
          />
        </label>

        <label>
          <span>Kategori</span>
          <select
            aria-label="Kategori"
            value={values.category}
            onChange={(event) => updateValue("category", event.target.value)}
          >
            <option value="">Pilih kategori</option>
            {requestCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Deskripsi</span>
          <textarea
            aria-label="Deskripsi"
            value={values.description}
            onChange={(event) => updateValue("description", event.target.value)}
            rows={5}
          />
        </label>

        <div className="form-actions">
          <button className="primary-button" type="submit">
            Simpan Laporan
          </button>
        </div>
      </form>
    </section>
  );
}
