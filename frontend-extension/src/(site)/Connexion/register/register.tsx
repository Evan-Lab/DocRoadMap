import axios from "axios"
import { useState } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import "./register.css"

const isDev = process.env.NODE_ENV !== "production"

const docroadmapImg = isDev
  ? "/assets/docroadmap.png"
  : "../images/docroadmap.png"

const ArrowLeftIcon = FaArrowLeft as unknown as React.FC<any>

function Register() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    axios
      .post("http://localhost:8082/auth/register", {
        firstName,
        lastName,
        email,
        password,
      })
      .then(() => {
        navigate("/account-confirmation")
      })
      .catch(() => {
        setError("Une erreur s'est produite lors de l'inscription")
      })
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </button>
        <div className="register-header">
          <div className="DocRoadMap-Logo register">
            <img src={docroadmapImg} alt="DocRoadMap" />
          </div>
          <h1>Inscription</h1>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <label>Prénom</label>
          <input
            type="text"
            placeholder="Prénom"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Nom de famille</label>
          <input
            type="text"
            placeholder="Nom"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Adresse e-mail</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Mot de passe</label>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Confirmation du mot de passe</label>
          <input
            type="password"
            placeholder="Mot de passe"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
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
  )
}

export default Register
