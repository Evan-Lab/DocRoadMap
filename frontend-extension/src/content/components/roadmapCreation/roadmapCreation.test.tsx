import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import RoadmapCreation from "./roadmapCreation";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const backendUrl = "https://www.docroadmap.fr";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockGet = jest.fn();

(global as any).chrome = {
  runtime: {
    getURL: (path: string) => path,
  },
  storage: {
    local: {
      get: mockGet,
    },
  },
};

describe("RoadmapCreation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("renders the title", async () => {
    mockGet.mockImplementation((_key: string, cb: any) =>
      cb({ token: "abc123" })
    );
    mockedAxios.get
      .mockResolvedValueOnce({ data: { id: 42 } })
      .mockResolvedValueOnce({ data: [] });

    render(<RoadmapCreation />);
    expect(await screen.findByText("createRoadmap")).toBeInTheDocument();
  });

  it("shows error if token is missing", async () => {
    mockGet.mockImplementation((_key: string, cb: any) => cb({}));
    render(<RoadmapCreation />);
    expect(await screen.findByText("tokenUnavailable")).toBeInTheDocument();
  });

  it("renders steps and calls handleCreateCard on click", async () => {
    mockGet.mockImplementation((_key: string, cb: any) =>
      cb({ token: "abc123" })
    );
    mockedAxios.get
      .mockResolvedValueOnce({ data: { id: 1 } })
      .mockResolvedValueOnce({
        data: [{ id: 10, name: "Passeport", collection_name: "Identité" }],
      });

    mockedAxios.post.mockResolvedValueOnce({});

    render(<RoadmapCreation />);

    expect(await screen.findByText("Passeport")).toBeInTheDocument();

    const button = screen.getByText("createThis");
    fireEvent.click(button);
    await waitFor(() =>
      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${backendUrl}/process/create`,

        expect.objectContaining({ name: "Passeport" }),
        expect.any(Object)
      )
    );
  });

  it("shows error if creation fails", async () => {
    mockGet.mockImplementation((_key: string, cb: any) =>
      cb({ token: "abc123" })
    );
    mockedAxios.get
      .mockResolvedValueOnce({ data: { id: 1 } })
      .mockResolvedValueOnce({
        data: [{ id: 12, name: "Emploi", collection_name: "Travail" }],
      });

    mockedAxios.post.mockRejectedValueOnce(new Error("Erreur serveur"));

    render(<RoadmapCreation />);

    const createButton = await screen.findByText("createThis");
    fireEvent.click(createButton);

    await waitFor(() =>
      expect(screen.getByText("createError")).toBeInTheDocument()
    );
  });
});
