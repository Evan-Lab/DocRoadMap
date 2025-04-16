// import axios from "axios"
import { useState } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import "./login.css"

const isDev = process.env.NODE_ENV !== "production"

const docroadmapImg = isDev
  ? "/assets/docroadmap.png"
  : "../images/docroadmap.png"

const ArrowLeftIcon = FaArrowLeft as unknown as React.FC<React.SVGProps<SVGSVGElement>>

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [error, setError] = useState("")
  const [isResetMode, setIsResetMode] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetMessage, setResetMessage] = useState("")

  const handleLogin = () => {
  //   axios
  //     .post("http://localhost:8082/auth/login", { email, password })
  //     .then(response => {
  //       const token = response.data.accessToken

  //       localStorage.setItem("token", token)
  //       if (typeof chrome !== "undefined" && chrome.storage) {
  //         chrome.storage.local.set({ token }, () => {
  //           console.log("Token saved in chrome.storage :", token)
  //         })
  //       }
  //       if (token) {
  //         console.log("Connected, token: ", token)
  //         navigate("/roadmap")
  //       }
  //     })
  //     .catch(() => {
  //       setError("Email ou mot de passe incorrect")
  //       console.log("Not connected, token: ", localStorage.getItem("token"))
  //     })
    navigate("/roadmap")
  }

  const handlePasswordReset = () => {
    setResetMessage(
      "Si un compte est associé à cet email, un lien de réinitialisation a été envoyé."
    )
    setTimeout(() => {
      setResetMessage("")
    }, 5000)
  navigate("/roadmap")
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </button>

        {!isResetMode ? (
          <>
            <div className="login-header">
              <div className="DocRoadMap-Logo login">
                <img src={docroadmapImg} alt="DocRoadMap" />
              </div>
              <h1>Connexion</h1>
            </div>
            {/* {error && <p className="error-message">{error}</p>} */}
            <div className="input-group">
              <label>Email</label>
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
            <h2>Réinitialisation du mot de passe</h2>
            {resetMessage && <p className="success-message">{resetMessage}</p>}
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={resetEmail}
                onChange={e => setResetEmail(e.target.value)}
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
  )
}

export default Login
