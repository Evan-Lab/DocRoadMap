import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ForgotPassword from "@/app/(tabs)/forgottenPassword";

describe("ForgotPassword Component", () => {
  it("renders the title and input field", () => {
    const { getByText, getByPlaceholderText } = render(<ForgotPassword />);

    expect(getByText("Forgot Password")).toBeTruthy();
    expect(getByPlaceholderText("Enter your email")).toBeTruthy();
  });

  it("updates email state on input", () => {
    const { getByPlaceholderText } = render(<ForgotPassword />);
    const emailInput = getByPlaceholderText("Enter your email");

    fireEvent.changeText(emailInput, "test@example.com");

    expect(emailInput.props.value).toBe("test@example.com");
  });

  it("triggers handleSend when Send button is pressed", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    const { getByText, getByPlaceholderText } = render(<ForgotPassword />);

    const emailInput = getByPlaceholderText("Enter your email");
    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.press(getByText("Send"));

    expect(consoleSpy).toHaveBeenCalledWith("Email:", "test@example.com");

    consoleSpy.mockRestore();
  });
});
