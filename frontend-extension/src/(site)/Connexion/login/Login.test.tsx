import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./login";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => jest.fn(),
  };
});

describe("Login component", () => {
  const renderWithRouter = () =>
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

  it("renders login page correctly", () => {
    renderWithRouter();
    expect(screen.getByText("Connexion")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("emailPlaceholder")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("passwordPlaceholder")
    ).toBeInTheDocument();
    expect(screen.getByText("login")).toBeInTheDocument();
    expect(screen.getByText("forgot")).toBeInTheDocument();
    expect(screen.getByText("noAccount")).toBeInTheDocument();
  });

  it("switches to password reset mode", () => {
    renderWithRouter();
    fireEvent.click(screen.getByText("forgot"));
    expect(screen.getByText("reset")).toBeInTheDocument();
    expect(screen.getByText("sendReset")).toBeInTheDocument();
  });

  it("returns to login mode from reset mode", () => {
    renderWithRouter();
    fireEvent.click(screen.getByText("forgot"));
    fireEvent.click(screen.getByText("back"));
    expect(screen.getByText("Connexion")).toBeInTheDocument();
  });
});
