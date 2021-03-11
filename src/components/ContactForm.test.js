import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "./ContactForm";

test("renders without errors", () => {
  // Arrange
  render(<ContactForm />);
  // Act
  // Assert
});

test("renders the contact form header", () => {
  const { debug } = render(<ContactForm />);
  const header = screen.getByRole("heading");
  screen.getByText(/contact form/i);
  expect(header).toBeInTheDocument();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);
  const input = screen.getByLabelText(/first name/i);
  await userEvent.type(input, "aaaa");
  screen.getByText(/characters/i);
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);
  const subButt = screen.getByRole("button", { name: /submit/i });
  await userEvent.click(subButt);
  screen.getByText(/characters/i);
  screen.getByText(/required/i);
  screen.getByText(/address/i);
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  const firstInput = screen.getByLabelText(/first name/i);
  const lastInput = screen.getByLabelText(/last name/i);
  const subButt = screen.getByRole("button", { name: /submit/i });
  await userEvent.type(firstInput, "aaaaa");
  await userEvent.type(lastInput, "aaaa");
  await userEvent.click(subButt);
  screen.getByText(/address/i);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {});

test("renders all fields text when all fields are submitted.", async () => {});
