import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import fetch from "node-fetch";
import App from "./App";

global.fetch = fetch;

describe("App component", () => {
  it("Shows the All Categories heading", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "All Categories"
    );
  });
});
