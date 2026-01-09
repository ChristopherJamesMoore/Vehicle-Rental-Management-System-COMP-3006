import { render, screen, fireEvent, waitFor } from "@testing-library/react";

jest.mock("../api", () => ({
  __esModule: true,
  default: {
    post: jest.fn()
  }
}));

import Login from "../pages/Login";
import API from "../api";

beforeEach(() => {
  localStorage.clear();
  API.post.mockReset();
});

test("Login page renders heading and buttons", () => {
  render(<Login />);

  // Use role-based queries to avoid "multiple elements" issues
  expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Switch to Register/i })).toBeInTheDocument();
});

test("Login stores token and role on success", async () => {
  API.post.mockResolvedValueOnce({
    data: { token: "abc123", role: "user", username: "testuser" }
  });

  render(<Login />);

  fireEvent.change(screen.getByPlaceholderText("Username"), {
    target: { value: "testuser" }
  });

  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "password" }
  });

  fireEvent.click(screen.getByRole("button", { name: "Login" }));

  await waitFor(() => {
    expect(API.post).toHaveBeenCalled();
  });

  expect(localStorage.getItem("token")).toBe("abc123");
  expect(localStorage.getItem("role")).toBe("user");
});