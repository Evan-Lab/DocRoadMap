import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Chatbot from "./chatbot";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Chatbot component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("renders static content", () => {
    render(<Chatbot />);
    expect(screen.getByText("Donna")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("questionchatbot")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("does not send empty message", () => {
    render(<Chatbot />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByText("user")).not.toBeInTheDocument();
  });

  it("adds user message and bot placeholder", async () => {
    const mockReader = {
      read: jest.fn().mockResolvedValueOnce({ done: true }),
    };
    const mockBody = {
      getReader: () => mockReader,
    };

    global.fetch = jest.fn().mockResolvedValue({
      body: mockBody,
    });

    render(<Chatbot />);
    const input = screen.getByPlaceholderText("questionchatbot");
    fireEvent.change(input, { target: { value: "Hello bot" } });
    fireEvent.click(screen.getByRole("button"));

    expect(await screen.findByText("Hello bot")).toBeInTheDocument();
    await waitFor(() => {
      expect(mockReader.read).toHaveBeenCalled();
    });
  });

  it("shows error message on fetch error", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("API Error"));

    render(<Chatbot />);
    const input = screen.getByPlaceholderText("questionchatbot");
    fireEvent.change(input, { target: { value: "Bad request" } });
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() =>
      expect(screen.getByText("apiError")).toBeInTheDocument(),
    );
  });
});
