import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ScrollToTopButton from './ScrollToButton';

describe('ScrollToTopButton', () => {
  beforeEach(() => {
    // Mock the scrollY property of the window object
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    });
  });

  afterEach(() => {
    // Restore the original scrollY property of the window object
    delete window.scrollY;
  });

  test('renders without errors', () => {
    render(<ScrollToTopButton />);
    // No errors means the component rendered successfully
  });

  test('does not display the button initially', () => {
    const { queryByRole } = render(<ScrollToTopButton />);
    const button = queryByRole('button');
    expect(button).toBeNull();
  });



  test('does not display the button when scrolled up', () => {
    window.scrollY = 0;

    const { queryByRole } = render(<ScrollToTopButton />);
    const button = queryByRole('button');
    expect(button).toBeNull();
  });

});
