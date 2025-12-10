import React from 'react';
import { render, screen, act } from '@testing-library/react';
import CarShowcase from './CarShowcase';

jest.useFakeTimers();

const cars = [
  { id: 1, name: 'Lexus ES', image: 'lexus-es.jpg' },
  { id: 2, name: 'BYD Seal', image: 'byd-seal.webp' },
  { id: 3, name: 'Mercedes-Benz E-Class', image: 'merc-e-class.jpg' },
];

describe('CarShowcase', () => {
  it('1. Renders all car slides', () => {
    render(<CarShowcase />);
    const slides = screen.getAllByRole('heading');
    expect(slides).toHaveLength(cars.length);

    slides.forEach((slide, index) => {
      expect(slide).toHaveTextContent(cars[index].name);
    });
  });

  it('2. Displays the first car as active by default', () => {
    render(<CarShowcase />);
    const slides = screen.getAllByRole('heading');
    expect(slides[0].parentElement.parentElement).toHaveClass('active');
    expect(slides[1].parentElement.parentElement).not.toHaveClass('active');
    expect(slides[2].parentElement.parentElement).not.toHaveClass('active');
  });

  it('3. Automatically switches cars every 5 seconds', () => {
    render(<CarShowcase />);
    const slides = screen.getAllByRole('heading');

    expect(slides[0].parentElement.parentElement).toHaveClass('active');

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(slides[1].parentElement.parentElement).toHaveClass('active');

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(slides[2].parentElement.parentElement).toHaveClass('active');

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(slides[0].parentElement.parentElement).toHaveClass('active');
  });

  it('4. Clears timer on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
    const { unmount } = render(<CarShowcase />);
    unmount();
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it('5. Correct class assignment on each update', () => {
    render(<CarShowcase />);
    const slides = screen.getAllByRole('heading');

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(slides[0].parentElement.parentElement).not.toHaveClass('active');
    expect(slides[1].parentElement.parentElement).toHaveClass('active');
    expect(slides[2].parentElement.parentElement).not.toHaveClass('active');

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(slides[0].parentElement.parentElement).not.toHaveClass('active');
    expect(slides[1].parentElement.parentElement).not.toHaveClass('active');
    expect(slides[2].parentElement.parentElement).toHaveClass('active');
  });

  it('6. Button renders correctly', () => {
    render(<CarShowcase />);
    const buttons = screen.getAllByRole('button', { name: 'Explore Cars' });
    expect(buttons).toHaveLength(cars.length);
  });
});
