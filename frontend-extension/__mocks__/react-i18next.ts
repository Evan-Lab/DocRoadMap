import { jest } from "@jest/globals";

module.exports = {
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        currentRoadmaps: "Mes démarches en cours",
        missingToken: "Token manquant. Veuillez vous connecter.",
        fetchError: "Impossible de récupérer les roadmaps.",
        continue: "Continuer",
        step: "étape",
        validated: "validée sur",
        imageAlt: "Illustration démarche",
      };
      return translations[key] || key;
    },
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
};
