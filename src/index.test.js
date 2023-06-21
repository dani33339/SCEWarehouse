import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  let rootContainer;

  beforeEach(() => {
    rootContainer = document.createElement('div');
    document.body.appendChild(rootContainer);
  });

  afterEach(() => {
    document.body.removeChild(rootContainer);
    rootContainer = null;
  });

  it('renders without crashing', () => {
    render(<App />, { container: rootContainer });

    expect(rootContainer.innerHTML).toBeTruthy();
  });
});
