import { useNavigate } from "react-router-dom";
import "./accountConfirmation.css";

function AccountConfirmation() {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleResendEmail = () => {
    alert("Email de confirmation renvoyé !");
  };

  return (
    <div className="confirmation-wrapper">
      <div className="confirmation-container">
        <h1>Compte créé avec succès !</h1>
        <p>
          Un email de confirmation a été envoyé à votre adresse. Veuillez
          vérifier votre boîte de réception et cliquer sur le lien de
          confirmation pour activer votre compte.
        </p>
        <p>
          Si vous ne trouvez pas l'email, vérifiez également dans vos courriers
          indésirables.
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
  );
}

export default AccountConfirmation;
