import { useNavigate } from "react-router-dom"
// import DocRoadMap from "../../../public/docroadmap.png";
import "./registerConfirmation.css"

function RegisterConfirmation() {
  const navigate = useNavigate()

  const handleLoginRedirect = () => {
    navigate("/login")
  }

  const handleResendEmail = () => {
    alert("Email de confirmation renvoyé !")
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <div className="DocRoadMap-Logo confirmation">
            {/* <img src={DocRoadMap} alt="DocRoadMap" /> */}
          </div>
          <h1>Compte créé avec succès !</h1>
        </div>
        <p>
          Un email de confirmation a été envoyé à votre adresse email. Veuillez
          cliquer sur le lien de confirmation pour activer votre compte.
        </p>
        <div className="button-group">
          <button className="login-button" onClick={handleLoginRedirect}>
            Se connecter
          </button>
          <button className="resend-button" onClick={handleResendEmail}>
            Renvoyer l'email
          </button>
        </div>
      </div>
    </div>
  )
}

export default RegisterConfirmation
