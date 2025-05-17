import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "./register";

jest.mock("axios");
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

describe("Register component", () => {
  const renderWithRouter = () =>
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );

  it("renders all input fields and submit button", () => {
    renderWithRouter();
    expect(screen.getByText("register")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("firstName")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("lastName")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText("password")).toHaveLength(2);
    expect(screen.getByText("submit")).toBeInTheDocument();
    expect(screen.getByText("hasAccount")).toBeInTheDocument();
  });

  it("shows error if passwords do not match", () => {
    renderWithRouter();
    fireEvent.change(screen.getByPlaceholderText("firstName"), {
      target: { value: "Evan" },
    });
    fireEvent.change(screen.getByPlaceholderText("lastName"), {
      target: { value: "Lab" },
    });
    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "evanLab@outlook.com" },
    });
    fireEvent.change(screen.getAllByPlaceholderText("password")[0], {
      target: { value: "1234" },
    });
    fireEvent.change(screen.getAllByPlaceholderText("password")[1], {
      target: { value: "abcd" },
    });
    fireEvent.click(screen.getByText("submit"));

    expect(screen.getByText("passwordMismatch")).toBeInTheDocument();
  });
});
