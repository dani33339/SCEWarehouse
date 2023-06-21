import React from "react";
import Signin from './Signin';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('My Component', () => {
  test('renders a button with "here" text', () => {
    render(
      <MemoryRouter>
        <Signin />
      </MemoryRouter>
    );
    const button = screen.getByText('Forgot Password');
    expect(button).toBeInTheDocument();
  });
});

