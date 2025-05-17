import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";

const mockNavigate = jest.fn();
const mockChangeLanguage = jest.fn();

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: mockChangeLanguage,
    },
  }),
}));

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("LanguageSelector component", () => {
  const renderWithRouter = () =>
    render(
      <MemoryRouter>
        <LanguageSelector />
      </MemoryRouter>,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all language buttons and title", () => {
    renderWithRouter();
    expect(screen.getByText("languageTitle")).toBeInTheDocument();
    expect(screen.getByText("french")).toBeInTheDocument();
    expect(screen.getByText("english")).toBeInTheDocument();
    expect(screen.getByText("spanish")).toBeInTheDocument();
  });

  it("changes language and navigates back when French is selected", () => {
    renderWithRouter();
    fireEvent.click(screen.getByText("french"));
    expect(mockChangeLanguage).toHaveBeenCalledWith("fr");
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("changes language and navigates back when English is selected", () => {
    renderWithRouter();
    fireEvent.click(screen.getByText("english"));
    expect(mockChangeLanguage).toHaveBeenCalledWith("en");
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("changes language and navigates back when Spanish is selected", () => {
    renderWithRouter();
    fireEvent.click(screen.getByText("spanish"));
    expect(mockChangeLanguage).toHaveBeenCalledWith("es");
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("navigates back when back button is clicked", () => {
    renderWithRouter();
    fireEvent.click(screen.getByRole("button", { name: "" }));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
