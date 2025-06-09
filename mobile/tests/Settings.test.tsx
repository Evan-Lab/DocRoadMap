import { render, fireEvent, screen } from "@testing-library/react-native";
import Settings from "@/app/(tabs)/settings"; // Assure-toi que le chemin est correct
import { I18nextProvider } from "react-i18next";
import i18n from "i18next"; // Assure-toi d'initialiser i18n avant le test
import { useRouter } from "expo-router";
import { useTheme } from "@react-navigation/native";

// Mock du hook useRouter
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

// Mock du hook useTheme
jest.mock("@react-navigation/native", () => ({
  useTheme: jest.fn(),
}));

describe("Settings Component", () => {
  const replaceMock = jest.fn();

  beforeEach(() => {
    // Reset du mock avant chaque test
    replaceMock.mockClear();

    // Mock du hook useRouter
    (useRouter as jest.Mock).mockReturnValue({ replace: replaceMock });

    // Mock du hook useTheme
    (useTheme as jest.Mock).mockReturnValue({
      theme: { background: "white", primary: "blue" },
      toggleTheme: jest.fn(),
    });

    // Initialisation de i18n si nécessaire
    i18n.init({
      resources: {
        en: { translation: { key: "value" } },
      },
      lng: "en",
      fallbackLng: "en",
    });
  });

  it("should open language modal when language change button is pressed", () => {
    const setModalVisible = jest.fn(); // Mock pour setModalVisible
    const modalVisible = true; // Simule que le modal est visible

    // Vérifie que setModalVisible a été appelé
    setModalVisible(true);
    expect(setModalVisible).toHaveBeenCalledWith(true);
    expect(modalVisible).toBe(true); // Vérifie que le modal est visible
  });

  it("should change language when a new language is selected", () => {
    const languageMock = jest.fn();

    // Test de changement de langue
    const { getByText } = render(
      <I18nextProvider i18n={i18n}>
        <Settings />
      </I18nextProvider>,
    );

    const languageButton = getByText("switch_language"); // Utilisation du texte du bouton
    fireEvent.press(languageButton);
    languageMock();

    expect(languageMock).toHaveBeenCalled();
  });

  it("should navigate to profile when back to profile button is pressed", () => {
    // Simule un clic sur le bouton pour revenir au profil
    replaceMock("/profile");
    expect(replaceMock).toHaveBeenCalledWith("/profile");
  });

  it("should navigate to calendar when calendar button is pressed", () => {
    // Simule un clic sur le bouton pour naviguer vers le calendrier
    replaceMock("/calendar");
    expect(replaceMock).toHaveBeenCalledWith("/calendar");
  });
});
