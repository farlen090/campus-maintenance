import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App shell", () => {
  it("TC-001 renders the app shell", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Campus Maintenance" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Ringkasan Awal" })
    ).toBeInTheDocument();
  });

  it("TC-002 renders the main navigation", () => {
    render(<App />);

    expect(screen.getByRole("button", { name: "Dashboard" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Daftar Laporan" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Buat Laporan" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Tugas Teknisi" })
    ).toBeInTheDocument();
  });

  it("TC-003 changes the active role using the role selector", async () => {
    const user = userEvent.setup();
    render(<App />);

    const selector = screen.getByLabelText("Pilih role aktif");
    await user.selectOptions(selector, "technician");

    expect(selector).toHaveValue("technician");
  });

  it("TC-007 submits a valid report", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Buat Laporan" }));
    await user.type(
      screen.getByLabelText("Judul laporan"),
      "Kursi auditorium rusak"
    );
    await user.type(screen.getByLabelText("Lokasi"), "Auditorium Utama");
    await user.selectOptions(screen.getByLabelText("Kategori"), "Lainnya");
    await user.type(
      screen.getByLabelText("Deskripsi"),
      "Sandaran kursi bagian depan patah dan perlu diperbaiki."
    );
    await user.click(screen.getByRole("button", { name: "Simpan Laporan" }));

    expect(
      screen.getByText("Laporan baru berhasil dibuat.")
    ).toBeInTheDocument();
    expect(screen.getByText("Kursi auditorium rusak")).toBeInTheDocument();
    expect(screen.getByText("Auditorium Utama")).toBeInTheDocument();
  });

  it("TC-008 validates required fields", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Buat Laporan" }));
    await user.click(screen.getByRole("button", { name: "Simpan Laporan" }));

    expect(
      screen.getByText("Lengkapi field wajib sebelum menyimpan.")
    ).toBeInTheDocument();
    expect(screen.getByText("Judul wajib diisi.")).toBeInTheDocument();
    expect(screen.getByText("Deskripsi wajib diisi.")).toBeInTheDocument();
    expect(screen.getByText("Lokasi wajib diisi.")).toBeInTheDocument();
    expect(screen.getByText("Kategori wajib dipilih.")).toBeInTheDocument();
    expect(
      screen.queryByText("Laporan baru berhasil dibuat.")
    ).not.toBeInTheDocument();
  });

  it("TC-009 creates a Submitted report with initial status history", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Buat Laporan" }));
    await user.type(screen.getByLabelText("Judul laporan"), "AC aula bocor");
    await user.type(screen.getByLabelText("Lokasi"), "Aula Barat");
    await user.selectOptions(screen.getByLabelText("Kategori"), "AC");
    await user.type(
      screen.getByLabelText("Deskripsi"),
      "Air menetes dari AC saat acara berlangsung."
    );
    await user.click(screen.getByRole("button", { name: "Simpan Laporan" }));

    expect(screen.getByText("Status awal: Submitted")).toBeInTheDocument();
    expect(screen.getByText("Riwayat awal: Submitted")).toBeInTheDocument();
  });

  it("TC-010 renders the report list with key report columns", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Daftar Laporan" }));

    expect(
      screen.getByRole("heading", { name: "Daftar Laporan" })
    ).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "ID" })).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Judul" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Lokasi" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Kategori" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Prioritas" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Status" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Teknisi" })
    ).toBeInTheDocument();
    expect(screen.getByText("REQ-001")).toBeInTheDocument();
    expect(
      screen.getByText("Proyektor Ruang 101 tidak menyala")
    ).toBeInTheDocument();
    expect(screen.getByText("Ruang 101")).toBeInTheDocument();
    expect(screen.getAllByText("Peralatan Kelas").length).toBeGreaterThan(0);
    expect(screen.getAllByText("High").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Submitted").length).toBeGreaterThan(0);
  });

  it("TC-011 searches reports by title", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Daftar Laporan" }));
    await user.type(screen.getByLabelText("Cari laporan"), "internet");

    expect(
      screen.getByText("Internet laboratorium bermasalah")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Proyektor Ruang 101 tidak menyala")
    ).not.toBeInTheDocument();
  });

  it("TC-012 searches reports by location", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Daftar Laporan" }));
    await user.type(screen.getByLabelText("Cari laporan"), "Ruang 204");

    expect(screen.getByText("AC Ruang 204 tidak dingin")).toBeInTheDocument();
    expect(
      screen.queryByText("Internet laboratorium bermasalah")
    ).not.toBeInTheDocument();
  });

  it("TC-013 filters reports by status, category, and priority", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Daftar Laporan" }));
    await user.selectOptions(screen.getByLabelText("Filter status"), "Closed");
    await user.selectOptions(screen.getByLabelText("Filter kategori"), "Kebersihan");
    await user.selectOptions(screen.getByLabelText("Filter prioritas"), "Low");

    expect(
      screen.getByText("Ruang kelas perlu dibersihkan")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Internet laboratorium bermasalah")
    ).not.toBeInTheDocument();
  });
});
