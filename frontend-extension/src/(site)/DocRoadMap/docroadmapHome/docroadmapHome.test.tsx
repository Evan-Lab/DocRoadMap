import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DocroadmapHome from "./docroadmapHome";

const mockNavigate = jest.fn();

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("DocroadmapHome component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem("token", "test");
    sessionStorage.setItem("something", "test");
    global.chrome = {
      storage: {
        local: {
          remove: jest.fn((key, callback) => callback && callback()),
        },
      },
    } as any;
  });

  const renderWithRouter = () =>
    render(
      <MemoryRouter>
        <DocroadmapHome />
      </MemoryRouter>
    );

  it("renders translated texts", () => {
    renderWithRouter();
    expect(screen.getByText("settings")).toBeInTheDocument();
    expect(screen.getByText("profile")).toBeInTheDocument();
    expect(screen.getByText("language")).toBeInTheDocument();
    expect(screen.getByText("logout")).toBeInTheDocument();
  });

  it("navigates to profile when profile button is clicked", () => {
    renderWithRouter();
    fireEvent.click(screen.getByText("profile"));
    expect(mockNavigate).toHaveBeenCalledWith("/profile");
  });

  it("navigates to language when language button is clicked", () => {
    renderWithRouter();
    fireEvent.click(screen.getByText("language"));
    expect(mockNavigate).toHaveBeenCalledWith("/language");
  });

  it("clears storage and navigates to root on logout", () => {
    renderWithRouter();
    fireEvent.click(screen.getByText("logout"));

    expect(localStorage.getItem("token")).toBeNull();
    expect(sessionStorage.getItem("something")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
