import { FaGlobe, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./docroadmapHome.css";

const UserIcon = FaUser as unknown as React.FC<any>;
const GlobeIcon = FaGlobe as unknown as React.FC<any>;
const SignOutIcon = FaSignOutAlt as unknown as React.FC<any>;

const DocroadmapHome: React.FC = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/profile");
  };

  const changeLanguage = () => {
    navigate("/language");
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();

    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      chrome.storage.local.remove("token", () => {
        console.log("Token supprimé de chrome.storage");
      });
    }
    navigate("/");
  };

  return (
    <div className="roadmap-container">
      <div className="settings-content">
        <h1 className="roadmap-title">Paramètres</h1>
        <div className="roadmap-buttons">
          <button onClick={goToProfile}>
            <UserIcon className="button-icon" />
            <span className="button-text">Profil</span>
          </button>

          <button onClick={changeLanguage}>
            <GlobeIcon className="button-icon" />
            <span className="button-text">Langue</span>
          </button>

          <button onClick={logout}>
            <SignOutIcon className="button-icon" />
            <span className="button-text">Déconnexion</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocroadmapHome;
