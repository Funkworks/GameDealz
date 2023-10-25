import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";

describe("Default page", () => {
  it("Should render properly", () => {
    render(<Home />);

    const header = screen.getByText("GAMEDEALZ");
    var headerText = "GAMEDEALZ";

    expect(header).toHaveTextContent(headerText);
  });
});
