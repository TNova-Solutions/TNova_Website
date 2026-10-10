import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import NotFoundPage from "./NotFoundPage";

describe("NotFoundPage", () => {
  it("explains the page is missing and links home", () => {
    render(<MemoryRouter><NotFoundPage /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: /404/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to home/i })).toHaveAttribute("href", "/");
  });
});
