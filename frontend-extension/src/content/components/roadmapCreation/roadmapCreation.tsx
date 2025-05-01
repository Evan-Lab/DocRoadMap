import axios from "axios";
import { useEffect, useState } from "react";

const RoadmapCreation: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleButtonClick = () => {
    console.log("Button clicked! Feature coming soon.");
  };

  const getToken = (): Promise<string | null> => {
    return new Promise((resolve) => {
      if (typeof chrome !== "undefined" && chrome.storage?.local) {
        chrome.storage.local.get("token", (result) => {
          resolve(result.token ?? null);
        });
      } else {
        resolve(localStorage.getItem("token"));
      }
    });
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = await getToken();
      try {
        if (!token) {
          throw new Error("Token non disponible. Veuillez vous connecter.");
        }

        const response = await fetch("http://localhost:8082/users/me", {
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
        setUser({ id: data.id });
      } catch (error) {
        setError(
          "Une erreur s'est produite lors de la récupération des données."
        );
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleCreateCard = async () => {
    const token = await getToken();
    if (!user?.id) {
      console.warn("L'utilisateur n'est pas pas encore chargé.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8082/process/create",
        {
          name: "id card",
          description: "ID card process",
          status: "PENDING",
          userId: user.id,
          stepsId: 15,
          endedAt: "2024-12-12, 12:00:00",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Process created successfully:", response.data);
    } catch (error) {
      console.error("Error creating process:", error);
    }
  };

  return (
    <div className="roadmap-container">
      <style>{`
        .roadmap-container {
          max-width: 300px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          text-align: center;
          padding: 20px;
          position: relative;
        }
        .back-button {
          position: absolute;
          top: 15px;
          left: 15px;
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
        }
        .roadmap-title {
          font-size: 24px;
          color: #333333;
          margin-bottom: 20px;
        }
        .work-in-progress {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #777;
          margin-top: 40px;
        }
        .icon {
          font-size: 40px;
          color: #ff9800;
          animation: spin 2s linear infinite;
          margin-bottom: 10px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .feature-button {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          background-color: #007bff;
          color: white;
          cursor: pointer;
          font-size: 16px;
        }
        .feature-button:disabled {
          background-color: #999;
          cursor: not-allowed;
        }
        .error-message {
          color: #c00;
          margin-top: 15px;
        }
      `}</style>

      <h1 className="roadmap-title">Création d'une Roadmap</h1>

      <div className="action-section">
        <button
          className="feature-button"
          onClick={() => {
            handleButtonClick();
            handleCreateCard();
          }}
          disabled={!user?.id}
        >
          Click Me
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default RoadmapCreation;
