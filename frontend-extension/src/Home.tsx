import { useNavigate } from "react-router-dom"
// import DocRoadMap from "../public/docroadmap.png";
import "./Home.css"

function Home() {
  const navigate = useNavigate()

  return (
    <div className="home-container">
      <div className="DocRoadMap-Logo">
        {/* <img src={DocRoadMap} alt="DocRoadMap" /> */}
      </div>
      <button onClick={() => navigate("/login")}>Se connecter</button>
      <button onClick={() => navigate("/register")}>S'inscrire</button>
    </div>
  )
}

export default Home
