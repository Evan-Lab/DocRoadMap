import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./roadmapCreation.css";

const ArrowLeftIcon = FaArrowLeft as unknown as React.FC<any>;

const RoadmapCreation: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleButtonClick = () => {
    console.log("Button clicked! Feature coming soon.");
  };

  const handleCreateCard = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8082/process/create",
        {
          name: "id card",
          description: "ID card process",
          status: "PENDING",
          userId: 1,
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
      <button className="back-button" onClick={() => navigate(-1)}>
        <ArrowLeftIcon />
      </button>
      <h1 className="roadmap-title">Création d'une Roadmap</h1>
      <div className="action-section">
        <button
          className="feature-button"
          onClick={() => {
            handleButtonClick();
            handleCreateCard();
          }}
        >
          Click Me
        </button>
      </div>
    </div>
  );
};

export default RoadmapCreation;
