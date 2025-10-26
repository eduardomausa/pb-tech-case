/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import React from "react";
import Root from "../+html";

describe("Root (web)", () => {
  it.skip("renders html structure correctly", () => {
    const { container } = render(
      <Root>
        <p>Child content</p>
      </Root>
    );

    const html = container.querySelector("html");
    expect(html).not.toBeNull();

    expect(container.querySelector("meta[charSet='utf-8']")).not.toBeNull();
    expect(
      container.querySelector("meta[httpEquiv='X-UA-Compatible']")
    ).not.toBeNull();

    expect(container.querySelector("body")?.textContent).toContain(
      "Child content"
    );
  });
});
