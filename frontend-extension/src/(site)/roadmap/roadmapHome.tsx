import { FaEye, FaMap, FaRobot } from "react-icons/fa";
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

  return (
    <div className="roadmap-container">
      <h1 className="roadmap-title">DocRoadMap</h1>
      <div className="roadmap-buttons">
        {/* Bouton Chatbot */}
        <button onClick={goToChatbot}>
          <FaRobot className="button-icon" />
          <span className="button-text">Donna Chatbot</span>
        </button>

        {/* Bouton Créer une Roadmap */}
        <button onClick={createRoadmap}>
          <FaMap className="button-icon" />
          <span className="button-text">Créer une Roadmap</span>
        </button>

        {/* Bouton Voir les Roadmaps */}
        <button onClick={viewRoadmaps}>
          <FaEye className="button-icon" />
          <span className="button-text">Voir les Roadmaps</span>
        </button>
      </div>
    </div>
  );
};

export default Roadmap;
