import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Confirmation from "./Confirmation";
import '@testing-library/jest-dom/extend-expect';

test("renders confirmation page with correct reservation data", () => {
  const mockReservations = [
    {
      id: "reservation1",
      FirstName: "John",
      LastName: "Doe",
      FromDate: "2023-01-01",
      ReturnDate: "2023-01-02",
      Status: "Pending",
      Userid: "user1",
      Itemid: "item1",
      UserRoles: ['teacher']
    },
  ];

  const mockItems = [
    {
      ImageUrl: "http://example.com/image.jpg",
    },
  ];

  const mockOnStatusChange = jest.fn();

  render(
    <Confirmation 
      reservations={mockReservations} 
      items={mockItems} 
      onStatusChange={mockOnStatusChange} 
    />
  );

  expect(screen.getByText("Confirmation page")).toBeInTheDocument();
});
