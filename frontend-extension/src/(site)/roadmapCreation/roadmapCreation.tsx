import { FaArrowLeft, FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./roadmapCreation.css";

const CreateRoadmap: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="roadmap-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
      <h1 className="roadmap-title">Création d'une Roadmap</h1>
      <div className="work-in-progress">
        <FaTools className="icon" />
        <p>Work in Progress...</p>
      </div>
    </div>
  );
};

export default CreateRoadmap;
