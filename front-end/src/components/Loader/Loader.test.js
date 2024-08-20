import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader Component", () => {
  test("renders the loader component", () => {
    render(<Loader />);

    const loaderElement = screen.getByTestId("loader");
    expect(loaderElement).toBeInTheDocument();
  });

  test("has the correct CSS classes applied", () => {
    render(<Loader />);

    const loaderElement = screen.getByTestId("loader");
    expect(loaderElement).toHaveClass(
      "spinner-container d-flex justify-content-center align-items-center"
    );

    const spinnerElement = screen.getByRole("status");
    expect(spinnerElement).toHaveClass("spinner-border text-primary");
  });

  test("contains visually hidden text for screen readers", () => {
    render(<Loader />);

    const visuallyHiddenText = screen.getByText("Loading...");
    expect(visuallyHiddenText).toBeInTheDocument();
    expect(visuallyHiddenText).toHaveClass("visually-hidden");
  });
});
