import axios from "axios";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./register.css";

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    axios
      .post("http://localhost:3000/auth/register", {
        firstName,
        lastName,
        email,
        password,
      })
      .then(() => {
        navigate("/account-confirmation");
      })
      .catch(() => {
        setError("Une erreur s'est produite lors de l'inscription");
      });
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <h1>Inscription</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <label>Prénom</label>
          <input
            type="text"
            placeholder="Entrez votre prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Nom de famille</label>
          <input
            type="text"
            placeholder="Entrez votre nom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Adresse e-mail</label>
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
            placeholder="Choisissez un mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Confirmation du mot de passe</label>
          <input
            type="password"
            placeholder="Confirmez votre mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="register-button" onClick={handleRegister}>
          S'inscrire
        </button>
        <p className="login-text">
          Vous avez déjà un compte ? <a href="/login">Connectez-vous</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
