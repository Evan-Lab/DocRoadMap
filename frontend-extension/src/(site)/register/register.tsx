import axios from "axios";
import { useState } from "react";
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

    console.log("Data to be sent to backend:", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      processIds: [],
    });

    axios
      .post("http://localhost:3000/users/create", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        processIds: [],
      })
      .then((response) => {
        console.log("User registered successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        setError("Une erreur s'est produite lors de l'inscription");
      });
  };

  return (
    <div className="register-container">
      <h1>Inscription</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="input-group">
        <label>Prénom</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Nom de famille</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Adresse e-mail</label>
        <input
          type="email"
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
      <div className="input-group">
        <label>Confirmation du mot de passe</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handleRegister}>S'inscrire</button>
    </div>
  );
}

export default Register;
