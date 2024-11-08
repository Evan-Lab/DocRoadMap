import "./home.css";

function Menu() {
  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1>Bienvenue sur DocRoadMap</h1>
        <div className="menu-buttons">
          <button>Tableau de bord</button>
          <button>Profil</button>
          <button>Déconnexion</button>
        </div>
      </div>
      <p className="welcome-message">Vous êtes connecté</p>
    </div>
  );
}

export default Menu;
