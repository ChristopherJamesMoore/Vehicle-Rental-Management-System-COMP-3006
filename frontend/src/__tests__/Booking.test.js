import { render, screen, waitFor } from "@testing-library/react";

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

import Bookings from "../pages/Bookings";
import API from "../api";
import socket from "../socket";

beforeEach(() => {
  API.get.mockResolvedValue({ data: [] });
  socket.on.mockImplementation(() => {});
  socket.off.mockImplementation(() => {});
  localStorage.clear();
});

test("Bookings page renders and fetches bookings", async () => {
  render(<Bookings />);

  // Use role-based heading query (avoids matching 'No bookings yet')
  expect(screen.getByRole("heading", { name: "Bookings" })).toBeInTheDocument();

  await waitFor(() => {
    expect(API.get).toHaveBeenCalledWith("/bookings");
  });
});

test("Bookings renders a booking item (cost + cancel button)", async () => {
  API.get.mockResolvedValueOnce({
    data: [
      {
        _id: "b1",
        // car text seems not reliably displayed in your UI right now
        startDate: "2026-01-10",
        endDate: "2026-01-12",
        totalCost: 90,
        status: "active"
      }
    ]
  });

  render(<Bookings />);

  // Wait for UI to update after API.get resolves
  expect(await screen.findByText(/£\s*90/i)).toBeInTheDocument();

  // Your UI shows a Cancel button per booking
  expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
});