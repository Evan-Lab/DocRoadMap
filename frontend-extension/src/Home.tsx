import { useNavigate } from "react-router-dom"
import "./Home.css"

const isDev = process.env.NODE_ENV !== "production"

const docroadmapImg = isDev
  ? "/assets/docroadmap.png"
  : "../images/docroadmap.png"

function Home() {
  const navigate = useNavigate()

  return (
    <div className="home-container">
      <div className="DocRoadMap-Logo">
        <img src={docroadmapImg} alt="DocRoadMap" />
      </div>
      <button onClick={() => navigate("/login")}>Se connecter</button>
      <button onClick={() => navigate("/register")}>S'inscrire</button>
    </div>
  )
}

export default Home
