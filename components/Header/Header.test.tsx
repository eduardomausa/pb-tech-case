import { render } from "@testing-library/react-native";
import React from "react";
import Header from "./Header";

describe("Header", () => {
  const props = {
    title: "Bem-vindo",
    subtitle: "Vamos começar",
  };

  it("renders title and subtitle correctly", () => {
    const { getByText } = render(<Header {...props} />);

    expect(getByText(props.title)).toBeTruthy();
    expect(getByText(props.subtitle)).toBeTruthy();
  });

  it("has correct accessibility label and role", () => {
    const { getByRole } = render(<Header {...props} />);
    const header = getByRole("header"); // Correct query

    expect(header.props.accessibilityLabel).toBe(
      `${props.title}. ${props.subtitle}`
    );
  });

  it("renders icon circle view", () => {
    const { getByTestId } = render(<Header {...props} />);
    expect(getByTestId("icon-circle")).toBeTruthy();
  });
});
