import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navbar with site title', () => {
  render(<App />);
  const titleElement = screen.getByText(/CAR RENTAL/i);
  expect(titleElement).toBeInTheDocument();
});
