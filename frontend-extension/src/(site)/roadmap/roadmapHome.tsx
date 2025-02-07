import { FaArrowLeft } from "react-icons/fa";
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
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
      <h1 className="roadmap-title">DocRoadMap</h1>
      <div className="roadmap-buttons">
        <button onClick={goToChatbot}>Donna Chatbot</button>
        <button onClick={createRoadmap}>Créer une Roadmap</button>
        <button onClick={viewRoadmaps}>Voir les Roadmaps</button>
      </div>
    </div>
  );
};

export default Roadmap;
