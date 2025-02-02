import "./roadmap.css";

import { useNavigate } from "react-router-dom";

function Roadmap() {
  const navigate = useNavigate();
  return (
    <div className="menu-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &#8592;
      </button>

      <div className="menu-header">
        <h1>Bienvenue sur vos Roadmaps</h1>
      </div>
      <div className="menu-buttons"></div>
    </div>
  );
}

export default Roadmap;
