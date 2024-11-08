import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

interface LoginProps {
  onLogin: () => void;
}

function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    axios
      .post("http://localhost:3000/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        onLogin();
        navigate("/connected");
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion :", error);
        setError("Email ou mot de passe incorrect");
      });
  };

  return (
    <div className="login-container">
      <h1>Connexion</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="input-group">
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
}

export default Login;
