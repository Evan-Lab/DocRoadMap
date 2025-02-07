import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./roadmapView.css";

const RoadmapView: React.FC = () => {
  const navigate = useNavigate();

  const roadmaps = [
    { id: 1, title: "Déclaration des impôts" },
    { id: 2, title: "nouveau Passport" },
    { id: 3, title: "Renouveler titre de séjour" },
    { id: 4, title: "Créer mon entreprise" },
    { id: 5, title: "Demander ma retraite" },
  ];

  return (
    <div className="roadmap-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
      <h1 className="roadmap-title">Liste des Roadmaps</h1>
      <ul className="roadmap-list">
        {roadmaps.map((roadmap) => (
          <li key={roadmap.id} className="roadmap-item">
            {roadmap.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoadmapView;
