import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signin from './Signin';
import { MemoryRouter } from 'react-router-dom';
import React from "react";


// It tests whether the user can successfully sign- in  by filling out the form fields and submitting the form.
test('allows user to Sign-in', async () => {
  render(
    <MemoryRouter>
      <Signin />
    </MemoryRouter>
  );
  
  const emailInput = screen.getByPlaceholderText(/Enter email here.../i);
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

  const passwordInput = screen.getByPlaceholderText(/Enter password here.../i);
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  const submitButton = screen.getByText(/submit/i);
  fireEvent.click(submitButton);
  
});



