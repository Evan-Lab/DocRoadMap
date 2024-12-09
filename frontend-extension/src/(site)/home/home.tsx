import { useNavigate } from "react-router-dom";
import "./home.css";

function Menu() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1>Bienvenue sur DocRoadMap</h1>
      </div>
      <div className="menu-buttons">
        <button>Tableau de bord</button>
        <button>Profil</button>
        <button onClick={handleLogout}>Déconnexion</button>
      </div>
    </div>
  );
}

export default Menu;
