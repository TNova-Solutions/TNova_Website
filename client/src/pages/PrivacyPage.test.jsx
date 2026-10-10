import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import PrivacyPage from "./PrivacyPage";

describe("PrivacyPage", () => {
  it("states what is collected and how to reach TNova", () => {
    render(<MemoryRouter><PrivacyPage /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: /privacy policy/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/job applications/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "info@tnovasolutions.com" }).length).toBeGreaterThan(0);
  });
});
