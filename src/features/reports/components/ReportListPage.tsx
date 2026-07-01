import { useMemo, useState } from "react";
import {
  requestCategories,
  requestPriorities,
  requestStatuses
} from "../constants";
import type {
  RequestCategory,
  RequestPriority,
  RequestStatus,
  ServiceRequest
} from "../types";
import type { User } from "../../../shared/types/user";

type ReportListPageProps = {
  requests: ServiceRequest[];
  users: User[];
  onCreateClick: () => void;
};

type FilterValues = {
  status: "" | RequestStatus;
  category: "" | RequestCategory;
  priority: "" | RequestPriority;
};

const initialFilters: FilterValues = {
  status: "",
  category: "",
  priority: ""
};

export function ReportListPage({
  requests,
  users,
  onCreateClick
}: ReportListPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterValues>(initialFilters);

  const technicianNames = useMemo(
    () =>
      new Map(
        users
          .filter((user) => user.role === "technician")
          .map((technician) => [technician.id, technician.name])
      ),
    [users]
  );

  const filteredRequests = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        request.title.toLowerCase().includes(normalizedSearch) ||
        request.location.toLowerCase().includes(normalizedSearch);
      const matchesStatus =
        filters.status === "" || request.status === filters.status;
      const matchesCategory =
        filters.category === "" || request.category === filters.category;
      const matchesPriority =
        filters.priority === "" || request.priority === filters.priority;

      return (
        matchesSearch && matchesStatus && matchesCategory && matchesPriority
      );
    });
  }, [filters, requests, searchTerm]);

  function updateFilter(field: keyof FilterValues, value: string) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [field]: value
    }));
  }

  return (
    <section className="list-panel" aria-labelledby="report-list-title">
      <div className="list-header">
        <div className="section-heading">
          <p className="eyebrow">ISSUE-04</p>
          <h2 id="report-list-title">Daftar Laporan</h2>
        </div>
        <button className="primary-button" type="button" onClick={onCreateClick}>
          Buat Laporan
        </button>
      </div>

      <div className="filter-bar">
        <label>
          <span>Cari laporan</span>
          <input
            aria-label="Cari laporan"
            placeholder="Cari judul atau lokasi"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>

        <label>
          <span>Status</span>
          <select
            aria-label="Filter status"
            value={filters.status}
            onChange={(event) => updateFilter("status", event.target.value)}
          >
            <option value="">Semua status</option>
            {requestStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Kategori</span>
          <select
            aria-label="Filter kategori"
            value={filters.category}
            onChange={(event) => updateFilter("category", event.target.value)}
          >
            <option value="">Semua kategori</option>
            {requestCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Prioritas</span>
          <select
            aria-label="Filter prioritas"
            value={filters.priority}
            onChange={(event) => updateFilter("priority", event.target.value)}
          >
            <option value="">Semua prioritas</option>
            {requestPriorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filteredRequests.length === 0 ? (
        <p className="empty-state">Tidak ada laporan yang cocok.</p>
      ) : (
        <div className="report-table-wrap">
          <table className="report-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Judul</th>
                <th>Lokasi</th>
                <th>Kategori</th>
                <th>Prioritas</th>
                <th>Status</th>
                <th>Teknisi</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.title}</td>
                  <td>{request.location}</td>
                  <td>{request.category}</td>
                  <td>{request.priority}</td>
                  <td>
                    <span className={`status-badge ${request.statusKey}`}>
                      {request.status}
                    </span>
                  </td>
                  <td>
                    {request.assignedTechnicianId
                      ? technicianNames.get(request.assignedTechnicianId) ??
                        "Teknisi tidak dikenal"
                      : "Belum ditugaskan"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
