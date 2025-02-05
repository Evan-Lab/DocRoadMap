import { useNavigate } from "react-router-dom";
import "./accountConfirmation.css";

function AccountConfirmation() {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
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

        <button className="login-button" onClick={handleLoginRedirect}>
          Se connecter
        </button>
      </div>
    </div>
  );
}

export default AccountConfirmation;
