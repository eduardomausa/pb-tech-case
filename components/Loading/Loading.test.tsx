import { render } from "@testing-library/react-native";
import React from "react";
import Loading from "./Loading";

describe("Loading", () => {
  it("renders ActivityIndicator when isLoading is true", () => {
    const { getByRole } = render(<Loading isLoading={true} />);
    const indicator = getByRole("alert");
    expect(indicator).toBeTruthy();
  });

  it("does not render anything when isLoading is false", () => {
    const { queryByRole } = render(<Loading isLoading={false} />);
    const indicator = queryByRole("alert");
    expect(indicator).toBeNull();
  });

  it("has correct accessibility props", () => {
    const { getByRole } = render(<Loading isLoading={true} />);
    const indicator = getByRole("alert");

    expect(indicator.props.accessibilityLiveRegion).toBe("polite");
    expect(indicator.props.accessibilityRole).toBe("alert");
    expect(indicator.props.accessible).toBe(true);
  });
});
