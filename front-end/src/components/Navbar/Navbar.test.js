import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";

jest.mock("../../assets/logo-pokemon.png", () => "mocked-logo.png");

describe("Navbar Component", () => {
  test("renders the logo and home button", () => {
    render(<Navbar />);

    const logoImage = screen.getByAltText("Logo");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute("src", "mocked-logo.png");

    const homeLink = screen.getByText("Home");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveClass("nav-link active");
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
