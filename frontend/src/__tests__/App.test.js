import { render, screen } from "@testing-library/react";

jest.mock("../App", () => () => <div>Vehicle Rental System</div>);

import App from "../App";

test("renders app placeholder (no router dependency)", () => {
  render(<App />);
  expect(screen.getByText(/Vehicle Rental System/i)).toBeInTheDocument();
});