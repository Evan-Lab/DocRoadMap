import { useNavigate } from "react-router-dom";
import "./login.css";

interface LoginProps {
  onLogin: () => void;
}

function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();

  const handleLogin = () => {
    onLogin();
    navigate("/connected");
  };

  return (
    <div className="login-container">
      <h1>Connexion</h1>
      <div className="input-group">
        <label>Nom d'utilisateur</label>
        <input type="text" />
      </div>
      <div className="input-group">
        <label>Mot de passe</label>
        <input type="password" />
      </div>
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
}

export default Login;
