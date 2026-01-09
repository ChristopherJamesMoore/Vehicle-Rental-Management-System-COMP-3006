import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders Vehicle Rental System title", () => {
  render(<App />);
  expect(screen.getByText(/vehicle rental system/i)).toBeInTheDocument();
});