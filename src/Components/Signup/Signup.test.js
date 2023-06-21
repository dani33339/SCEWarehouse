import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signup from './Signup';
import { MemoryRouter } from 'react-router-dom';
import React from "react";

// It tests whether the user can successfully register by filling out the form fields and submitting the form.
test('allows user to register', async () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );
  
  const emailInput = screen.getByPlaceholderText(/Enter email here.../i);
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

  const passwordInput = screen.getByPlaceholderText(/Enter password here.../i);
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  const firstNameInput = screen.getByPlaceholderText(/Enter First name here.../i);
  fireEvent.change(firstNameInput, { target: { value: 'John' } });

  const lastNameInput = screen.getByPlaceholderText(/Enter Last name here.../i);
  fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

  const submitButton = screen.getByText(/submit/i);
  fireEvent.click(submitButton);

  
  
});

test('allows user to select birthday date', () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );  

  const label = screen.getByText(/Select your birthday date/i);
  const dateInput = label.parentElement.querySelector('input[type="date"]');

  const mockDate = '2023-05-29'; // Set an example date
  fireEvent.change(dateInput, { target: { value: mockDate } });

  expect(dateInput.value).toBe(mockDate);
});

