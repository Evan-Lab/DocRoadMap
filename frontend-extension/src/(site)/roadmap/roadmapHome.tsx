import { FaEye, FaMap, FaRobot, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./roadmapHome.css";

const Roadmap: React.FC = () => {
  const navigate = useNavigate();

  const goToChatbot = () => {
    navigate("/chatbot");
  };

  const createRoadmap = () => {
    navigate("/create-roadmap");
  };

  const viewRoadmaps = () => {
    navigate("/roadmap-view");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="roadmap-container">
      <h1 className="roadmap-title">DocRoadMap</h1>
      <div className="roadmap-buttons">
        <button onClick={goToChatbot}>
          <FaRobot className="button-icon" />
          <span className="button-text">Donna Chatbot</span>
        </button>

        <button onClick={createRoadmap}>
          <FaMap className="button-icon" />
          <span className="button-text">Créer une Roadmap</span>
        </button>

        <button onClick={viewRoadmaps}>
          <FaEye className="button-icon" />
          <span className="button-text">Voir les Roadmaps</span>
        </button>

        <button onClick={goToProfile}>
          <FaUser className="button-icon" />
          <span className="button-text">Profil</span>
        </button>
      </div>
    </div>
  );
};

export default Roadmap;
