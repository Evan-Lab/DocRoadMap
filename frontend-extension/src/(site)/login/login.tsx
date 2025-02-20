import axios from "axios";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./login.css";

const ArrowLeftIcon = FaArrowLeft as unknown as React.FC<any>;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const handleLogin = () => {
    axios
      .post("http://localhost:8082/auth/login", { email, password })
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);

        if (localStorage.getItem("token") != null) {
          navigate("/roadmap");
          console.log("i am connected, token: ", localStorage.getItem("token"));
        }
      })
      .catch(() => {
        setError("Email ou mot de passe incorrect");
        console.log("NOT connected, token: ", localStorage.getItem("token"));
      });
  };

  const handlePasswordReset = () => {
    setResetMessage(
      "Si un compte est associé à cet email, un lien de réinitialisation a été envoyé."
    );

    setTimeout(() => {
      setResetMessage("");
    }, 5000);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </button>

        {!isResetMode ? (
          <>
            <h1>Connexion</h1>
            {error && <p className="error-message">{error}</p>}
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Mot de passe</label>
              <input
                type="password"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="login-button" onClick={handleLogin}>
              Se connecter
            </button>
            <p className="forgot-password" onClick={() => setIsResetMode(true)}>
              Mot de passe oublié ?
            </p>
            <p className="signup-text">
              Pas encore de compte ? <a href="/register">Inscrivez-vous</a>
            </p>
          </>
        ) : (
          <>
            <h1>Réinitialisation du mot de passe</h1>
            {resetMessage && <p className="success-message">{resetMessage}</p>}
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Entrez votre email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>
            <button className="login-button" onClick={handlePasswordReset}>
              Envoyer le lien
            </button>
            <p className="back-to-login" onClick={() => setIsResetMode(false)}>
              Retour à la connexion
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
