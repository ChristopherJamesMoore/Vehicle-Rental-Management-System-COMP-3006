import { render, screen, waitFor } from "@testing-library/react";

// Mock API and socket BEFORE importing Cars
jest.mock("../api", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn()
  }
}));

jest.mock("../socket", () => ({
  __esModule: true,
  default: {
    on: jest.fn(),
    off: jest.fn()
  }
}));

import Cars from "../pages/Cars";
import API from "../api";
import socket from "../socket";

beforeEach(() => {
  API.get.mockResolvedValue({ data: [] });
  API.post.mockResolvedValue({ data: {} });
  API.delete.mockResolvedValue({ data: {} });

  socket.on.mockImplementation(() => {});
  socket.off.mockImplementation(() => {});

  localStorage.clear();
});

test("Cars page renders and fetches cars", async () => {
  render(<Cars />);
  expect(screen.getByText("Cars")).toBeInTheDocument();

  await waitFor(() => {
    expect(API.get).toHaveBeenCalledWith("/cars");
  });
});

test("Cars shows admin add form when role=admin", async () => {
  localStorage.setItem("role", "admin");
  render(<Cars />);

  expect(await screen.findByText(/Add a car \(admin\)/i)).toBeInTheDocument();
});

test("Cars renders car list from API", async () => {
  API.get.mockResolvedValueOnce({
    data: [
      { _id: "1", make: "Ford", model: "Fiesta", pricePerDay: 30, available: true, imageUrl: "" }
    ]
  });

  render(<Cars />);
  expect(await screen.findByText(/Ford Fiesta/i)).toBeInTheDocument();
});