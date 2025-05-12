import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./docroadmapHome.css";

const ArrowLeftIcon = FaArrowLeft as unknown as React.FC<any>;

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    navigate(-1);
  };

  return (
    <div className="roadmap-container">
      <div className="settings-content">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </button>
        <h1 className="roadmap-title">{t("settings.languageTitle")}</h1>
        <div className="roadmap-buttons">
          <button onClick={() => handleLanguageChange("fr")}>
            🇫🇷 <span className="button-text">Français</span>
          </button>
          <button onClick={() => handleLanguageChange("en")}>
            🇬🇧 <span className="button-text">English</span>
          </button>
          <button onClick={() => handleLanguageChange("es")}>
            🇪🇸 <span className="button-text">Español</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
