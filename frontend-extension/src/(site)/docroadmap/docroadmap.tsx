import { FaCog, FaEye, FaMap, FaRobot } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./docroadmap.css";

const RobotIcon = FaRobot as unknown as React.FC<any>;
const MapIcon = FaMap as unknown as React.FC<any>;
const EyeIcon = FaEye as unknown as React.FC<any>;
const CogIcon = FaCog as unknown as React.FC<any>;

const Docroadmap: React.FC = () => {
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

  const goToSettings = () => {
    navigate("/settings");
  };

  return (
    <div className="roadmap-container">
      <h1 className="roadmap-title">DocRoadMap</h1>
      <div className="roadmap-buttons">
        <button onClick={goToChatbot}>
          <RobotIcon className="button-icon" />
          <span className="button-text">Donna Chatbot</span>
        </button>

        <button onClick={createRoadmap}>
          <MapIcon className="button-icon" />
          <span className="button-text">Créer une Roadmap</span>
        </button>

        <button onClick={viewRoadmaps}>
          <EyeIcon className="button-icon" />
          <span className="button-text">Voir les Roadmaps</span>
        </button>

        <button onClick={goToSettings}>
          <CogIcon className="button-icon" />
          <span className="button-text">Paramètres</span>
        </button>
      </div>
    </div>
  );
};

export default Docroadmap;
