import { FaGlobe, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./settings.css";

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/profile");
  };

  const changeLanguage = () => {
    console.log("Work in progress");
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="roadmap-container">
      <h1 className="roadmap-title">DocRoadMap paramètres</h1>
      <div className="roadmap-buttons">
        <button onClick={goToProfile}>
          <FaUser className="button-icon" />
          <span className="button-text">Profil</span>
        </button>

        <button onClick={changeLanguage}>
          <FaGlobe className="button-icon" />
          <span className="button-text">Langue</span>
        </button>

        <button onClick={logout}>
          <FaSignOutAlt className="button-icon" />
          <span className="button-text">Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;
