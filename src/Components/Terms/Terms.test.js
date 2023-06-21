import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import the necessary matcher

import Terms from './Terms';

describe('Terms component', () => {
  it('renders the component without errors', () => {
    render(<Terms />);
  });

  it('displays the correct title', () => {
    render(<Terms />);
    const title = screen.getByText('Terms and Conditions');
    expect(title).toBeInTheDocument();
  });

  it('displays the welcome message', () => {
    render(<Terms />);
    const welcomeMessage = screen.getByText('Welcome to Collage Warehouse!');
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('displays the rental period section', () => {
    render(<Terms />);
    const rentalPeriodTitle = screen.getByText('Rental Period');
    const rentalPeriodText = screen.getByText(/The rental period starts from the day/i);
    expect(rentalPeriodTitle).toBeInTheDocument();
    expect(rentalPeriodText).toBeInTheDocument();
  });

  // Add more test cases for other sections and content

});
