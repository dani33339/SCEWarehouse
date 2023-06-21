import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Myorders from './Myorders';
import { auth, db } from "../../firebase-config";
import { getDocs, query, where, collection, getDoc, doc, getFirestore } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';

jest.mock('../../firebase-config');
jest.mock('react-firebase-hooks/auth');
jest.mock('firebase/firestore', () => {
  const actualFirestore = jest.requireActual('firebase/firestore');
  return {
    ...actualFirestore,
    getDocs: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    collection: jest.fn(),
    getDoc: jest.fn(),
    doc: jest.fn(),
    getFirestore: jest.fn(),
  };
});

getFirestore.mockImplementation(() => db); 

describe('Myorders Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders My Orders title', () => {
    useAuthState.mockReturnValue([null, false]);
    render(<Myorders />);
    expect(screen.getByText('My Orders')).toBeInTheDocument();
  });

});
