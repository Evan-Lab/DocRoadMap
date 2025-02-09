import { useNavigate } from "react-router-dom";
import "./home.css";

function Menu() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const goToRoadmap = () => {
    navigate("/roadmap");
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1>Bienvenue sur DocRoadMap</h1>
      </div>
      <div className="menu-buttons">
        <button onClick={goToRoadmap}>Tableau de bord</button>
        <button onClick={goToProfile}>Profil</button>
        <button onClick={handleLogout}>Déconnexion</button>
      </div>
    </div>
  );
}

export default Menu;
