import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePicture: "",
  });

  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token non disponible. Veuillez vous connecter.");
        }

        const response = await fetch("http://localhost:3000/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Échec de la récupération des données utilisateur");
        }

        const data = await response.json();
        setUser({
          firstName: data.firstName || "Non spécifié",
          lastName: data.lastName || "Non spécifié",
          email: data.email || "Non spécifié",
          password: "********",
          profilePicture: data.profilePicture || "/user.png",
        });
      } catch (error) {
        setError(
          "Une erreur s'est produite lors de la récupération des données."
        );
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="profile-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &#8592;
      </button>
      <h1 className="profile-title">Profil</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="profile-picture">
        <img src={user.profilePicture} alt="Profil" />
      </div>
      <div className="profile-info">
        <div className="profile-item">
          <span className="profile-label">Prénom :</span>
          <span className="profile-value">{user.firstName}</span>
          <span className="profile-edit">✏️</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Nom :</span>
          <span className="profile-value">{user.lastName}</span>
          <span className="profile-edit">✏️</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Email :</span>
          <span className="profile-value">{user.email}</span>
          <span className="profile-edit">✏️</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Mot de passe :</span>
          <span className="profile-value">{user.password}</span>
          <span className="profile-edit">✏️</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
