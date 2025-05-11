import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import RoadmapView from "./roadmapView";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockGet = jest.fn();
(global as any).chrome = {
  runtime: {
    getURL: jest.fn((path) => path),
  },
  storage: {
    local: {
      get: mockGet,
    },
  },
};

describe("RoadmapView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the header", async () => {
    mockGet.mockImplementation((_key, cb) => cb({ token: "abc123" }));
    mockedAxios.get.mockResolvedValueOnce({ data: { processes: [] } });
    render(<RoadmapView />);
    expect(screen.getByText(/Mes démarches en cours/i)).toBeInTheDocument();
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalled());
  });

  it("shows error if token is missing", async () => {
    mockGet.mockImplementation((_key, cb) => cb({}));
    render(<RoadmapView />);
    expect(await screen.findByText(/Token manquant/i)).toBeInTheDocument();
  });

  it("shows error if axios fails", async () => {
    mockGet.mockImplementation((_key, cb) => cb({ token: "abc123" }));
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));
    render(<RoadmapView />);
    expect(
      await screen.findByText(/Impossible de récupérer les roadmaps/i)
    ).toBeInTheDocument();
  });

  it("renders cards with correct info", async () => {
    mockGet.mockImplementation((_key, cb) => cb({ token: "abc123" }));
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        processes: [
          {
            id: 1,
            name: "Naissance",
            description: "Birth process",
            status: "COMPLETED",
            createdAt: "",
            updatedAt: "",
            steps: [],
          },
          {
            id: 2,
            name: "Emploi",
            description: "Job process",
            status: "IN_PROGRESS",
            createdAt: "",
            updatedAt: "",
            steps: [],
          },
        ],
      },
    });
    render(<RoadmapView />);
    expect(await screen.findByText("Naissance")).toBeInTheDocument();
    expect(screen.getByText("Emploi")).toBeInTheDocument();

    expect(screen.getByText(/3 étapes validée/)).toBeInTheDocument();
    expect(screen.getByText(/1 étape validée/)).toBeInTheDocument();

    expect(screen.getAllByText("Continuer").length).toBe(2);
  });

  it("renders default image for unknown card name", async () => {
    mockGet.mockImplementation((_key, cb) => cb({ token: "abc123" }));
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        processes: [
          {
            id: 3,
            name: "Inconnu",
            description: "Unknown process",
            status: "PENDING",
            createdAt: "",
            updatedAt: "",
            steps: [],
          },
        ],
      },
    });
    render(<RoadmapView />);
    const img = await screen.findByAltText(/Illustration démarche/i);
    expect(img).toHaveAttribute(
      "src",
      expect.stringContaining("docroadmap.png")
    );
  });
});
