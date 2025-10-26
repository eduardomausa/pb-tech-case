import { render } from "@testing-library/react-native";
import React from "react";
import { Text, View } from "react-native";
import Background from "./Background";

describe("Background", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <Background>
        <Text>Child Content</Text>
      </Background>
    );

    expect(getByText("Child Content")).toBeTruthy();
  });

  it("renders the background layers correctly", () => {
    const { getByTestId } = render(
      <Background>
        <View />
      </Background>
    );

    expect(getByTestId("blue-background")).toBeTruthy();
    expect(getByTestId("light-background")).toBeTruthy();
  });

  it("applies correct container style", () => {
    const { getByTestId } = render(
      <Background>
        <View testID="child" />
      </Background>
    );

    const container = getByTestId("child").parent?.parent; // parent of child is container
    expect(container?.props.style).toMatchObject({
      flex: 1,
      backgroundColor: "#eff6ff",
    });
  });
});
