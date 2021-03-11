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
  expect(screen.queryByText(/characters/i)).toBeNull();
  expect(screen.queryByText(/required/i)).toBeNull();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const emailInput = screen.getByLabelText(/email/i);
  await userEvent.type(emailInput, "aaaaa");
  screen.getByText(/address/i);
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  const subButt = screen.getByRole("button", { name: /submit/i });
  await userEvent.click(subButt);
  expect(screen.queryByText(/lastName is a required field/i));
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);
  const firstInput = screen.getByLabelText(/first name/i);
  const lastInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const subButt = screen.getByRole("button", { name: /submit/i });
  userEvent.type(firstInput, "Maxim");
  userEvent.type(lastInput, "Huck");
  userEvent.type(emailInput, "mhuckstepp@gmail.com");
  userEvent.click(subButt);
  screen.getByTestId(/firstnamedisplay/i);
  screen.getByTestId(/lastnamedisplay/i);
  screen.getByTestId(/emaildisplay/i);
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);
  const firstInput = screen.getByLabelText(/first name/i);
  const lastInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const messageInput = screen.getByLabelText(/message/i);
  const subButt = screen.getByRole("button", { name: /submit/i });
  userEvent.type(firstInput, "Maxim");
  userEvent.type(lastInput, "Huck");
  userEvent.type(emailInput, "mhuckstepp@gmail.com");
  userEvent.type(messageInput, "tester");
  userEvent.click(subButt);
  screen.getByTestId(/firstnamedisplay/i);
  screen.getByTestId(/lastnamedisplay/i);
  screen.getByTestId(/emaildisplay/i);
  screen.getByTestId(/messagedisplay/i);
});
