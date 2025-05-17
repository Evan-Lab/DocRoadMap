import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Profile from "./profile";

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

global.fetch = jest.fn();

describe("Profile component", () => {
  const renderWithRouter = () =>
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("renders user data from chrome.storage", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      }),
    });

    global.chrome = {
      storage: {
        local: {
          get: (_key: string, callback: (result: any) => void) =>
            callback({ token: "valid-token" }),
        },
      },
    } as any;

    renderWithRouter();

    expect(await screen.findByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  it("renders user data from localStorage fallback", async () => {
    delete (global as any).chrome;
    localStorage.setItem("token", "valid-token");

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        firstName: "Alice",
        lastName: "Smith",
        email: "alice@example.com",
      }),
    });

    renderWithRouter();

    expect(await screen.findByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Smith")).toBeInTheDocument();
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
  });

  it("shows error if token is missing", async () => {
    global.chrome = {
      storage: {
        local: {
          get: (_key: string, callback: (result: any) => void) => callback({}),
        },
      },
    } as any;

    renderWithRouter();

    await waitFor(() =>
      expect(screen.getByText("genericError")).toBeInTheDocument(),
    );
  });

  it("shows error if fetch fails", async () => {
    global.chrome = {
      storage: {
        local: {
          get: (_key: string, callback: (result: any) => void) =>
            callback({ token: "invalid-token" }),
        },
      },
    } as any;

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    renderWithRouter();

    await waitFor(() =>
      expect(screen.getByText("genericError")).toBeInTheDocument(),
    );
  });
});
