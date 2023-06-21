import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Footer from "./Footer";

describe("Footer", () => {
  test("Moodle link redirects to the correct URL", () => {
    const { location } = window;
    delete window.location;
    window.location = { href: "" };

    render(<Footer />);
    const moodleLink = screen.getByText("Moodle");
    userEvent.click(moodleLink);

    expect(window.location.href).toBe("https://moodle.sce.ac.il/my/");

    window.location = location;
  });

  test("SCE link redirects to the correct URL", () => {
    const { location } = window;
    delete window.location;
    window.location = { href: "" };
  
    render(<Footer />);
    const sceLinks = screen.getAllByText("SCE");
    const sceLink = sceLinks.find((link) => link.nodeName === "LI"); // Select the appropriate LI element
  
    userEvent.click(sceLink);
  
    expect(window.location.href).toBe("https://www.sce.ac.il/");
  
    window.location = location;
  });
  

  test("Portal link redirects to the correct URL", () => {
    const { location } = window;
    delete window.location;
    window.location = { href: "" };

    render(<Footer />);
    const portalLink = screen.getByText("Portal");
    userEvent.click(portalLink);

    expect(window.location.href).toBe("https://portal.sce.ac.il/");

    window.location = location;
  });

  test("Moodle link exists", () => {
    render(<Footer />);
    const moodleLink = screen.getByText(/Moodle/i);

    expect(moodleLink.innerHTML).toContain("Moodle");
  });

  test("Portal link exists", () => {
    render(<Footer />);
    const portalLink = screen.getByText(/Portal/i);

    expect(portalLink.innerHTML).toContain("Portal");
  });
});
