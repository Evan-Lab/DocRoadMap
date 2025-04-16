import { FaAccessibleIcon, FaCog, FaEye, FaMap, FaRobot } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import "./docroadmapHome.css"

const RobotIcon = FaRobot as unknown as React.FC<any>
const MapIcon = FaMap as unknown as React.FC<any>
const EyeIcon = FaEye as unknown as React.FC<any>
const CogIcon = FaCog as unknown as React.FC<any>

const DocroadmapHome: React.FC = () => {
  const navigate = useNavigate()

  const createRoadmap = () => {
    navigate("/create-roadmap")
  }
  const viewRoadmaps = () => {
    navigate("/roadmap-view")
  }
  const goToChatbot = () => {
    navigate("/chatbot")
  }
  const goToSettings = () => {
    navigate("/settings")
  }

  const accessibility = () => {
    console.log("Work in progress")
  }

  return (
    <div className="roadmap-container">
      <div className="roadmap-inner">
        <div className="roadmap-buttons">
          <button onClick={accessibility}>
            <FaAccessibleIcon className="button-icon" />
            <span className="button-text">Accessibilité</span>
            <span className="button-text">(Non fonctionnel)</span>
          </button>

          <button onClick={createRoadmap}>
            <MapIcon className="button-icon" />
            <span className="button-text">Générer une Roadmap</span>
          </button>

          <button onClick={viewRoadmaps}>
            <EyeIcon className="button-icon" />
            <span className="button-text">Voir mes Roadmaps</span>
          </button>

          <button onClick={goToChatbot}>
            <RobotIcon className="button-icon" />
            <span className="button-text">Donna Chatbot</span>
          </button>

          <button onClick={goToSettings}>
            <CogIcon className="button-icon" />
            <span className="button-text">Paramètres</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DocroadmapHome
