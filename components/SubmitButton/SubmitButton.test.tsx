import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import SubmitButton from "./SubmitButton";

describe("SubmitButton", () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with the given text", () => {
    const { getByText } = render(
      <SubmitButton onPress={mockOnPress} buttonText="Enviar" />
    );

    expect(getByText("Enviar")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const { getByRole } = render(
      <SubmitButton onPress={mockOnPress} buttonText="Enviar" />
    );

    const button = getByRole("button");
    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("has correct accessibility props", () => {
    const { getByRole } = render(
      <SubmitButton onPress={mockOnPress} buttonText="Enviar" />
    );

    const button = getByRole("button");

    expect(button.props.accessibilityLabel).toBe("Enviar");
    expect(button.props.accessibilityHint).toBe(
      "Enviar formulário e ver proposta"
    );
  });
});
