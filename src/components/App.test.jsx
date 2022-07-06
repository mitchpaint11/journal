import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import fetch from "node-fetch";
import App from "./App";

global.fetch = fetch;

describe("App component", () => {
  beforeEach(function () {
    render(<App />);
  });

  it("Shows the All Categories heading", () => {
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "All Categories"
    );
  });
  it('Shows category selection page when "New Entry" clicked', async () => {
    await userEvent.click(screen.getByText("New Entry"));
    expect(screen.getByText("Please select a category:")).toBeInTheDocument();
  });
});
