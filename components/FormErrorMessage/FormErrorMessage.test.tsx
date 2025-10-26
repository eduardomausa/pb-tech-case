import { render } from "@testing-library/react-native";
import React from "react";
import FormErrorMessage from "./FormErrorMessage";

describe("FormErrorMessage", () => {
  it("renders the error message text", () => {
    const message = "This field is required";
    const { getByText } = render(<FormErrorMessage message={message} />);

    expect(getByText(message)).toBeTruthy();
  });

  it("has correct accessibilityLiveRegion", () => {
    const message = "Invalid input";
    const { getByText } = render(<FormErrorMessage message={message} />);
    const textElement = getByText(message);

    expect(textElement.props.accessibilityLiveRegion).toBe("polite");
  });
});
