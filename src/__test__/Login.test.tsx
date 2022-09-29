import {
  getByTestId,
  queryByRole,
  queryByTestId,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Login, validateEmail, validatePassword } from "../components/Login";

test("should be successed on email validation", () => {
  const email = "komiyama@gmail.com";
  expect(validateEmail(email)).toBe(true);
});

test("should be failed on email validation", () => {
  const email = "komiyama.com";
  expect(validateEmail(email)).not.toBe(true);
});

test("should be successed on password validation", () => {
  const password = "12345678";
  expect(validatePassword(password)).toBe(true);
});

test("should be failed on password validation", () => {
  const password = "1234567";
  expect(validatePassword(password)).not.toBe(true);
});

test("should be able to submit the form", () => {
  render(<Login />);

  const submitButton = screen.getByTestId("submit");
  const email = screen.getByLabelText("email");
  const password = screen.getByLabelText("password");

  userEvent.type(email, "komiyama@gmail.com");
  userEvent.type(password, "komiyama12345");

  userEvent.click(submitButton);

  const userEmail = screen.getByText(/!!!/i);
  expect(userEmail).toBeInTheDocument();
});
