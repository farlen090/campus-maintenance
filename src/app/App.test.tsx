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
});
