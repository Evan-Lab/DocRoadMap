import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Bienvenue sur DocRoadMap</h1>
      <p>Vous êtes sur la page d'accueil.</p>
      <button onClick={() => navigate("/login")}>Se connecter</button>
    </div>
  );
}

export default Home;
