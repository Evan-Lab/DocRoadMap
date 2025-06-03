import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const isDev = process.env.NODE_ENV !== "production";

const docroadmapImg = isDev
  ? "/assets/docroadmap.png"
  : "../assets/docroadmap.png";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = (): Promise<string | null> => {
      return new Promise((resolve) => {
        if (typeof chrome !== "undefined" && chrome.storage?.local) {
          chrome.storage.local.get("token", (result) => {
            resolve(result.token ?? null);
          });
        } else {
          resolve(localStorage.getItem("token"));
        }
      });
    };

    getToken().then((token) => {
      if (token) {
        console.log("Redirection /roadmap");
        navigate("/roadmap");
      }
    });
  }, [navigate]);

  return (
    <div className="home-container">
      <div className="DocRoadMap-Logo">
        <img src={docroadmapImg} alt="DocRoadMap" />
      </div>
      <button onClick={() => navigate("/login")}>Se connecter</button>
      <button onClick={() => navigate("/register")}>S'inscrire</button>
    </div>
  );
}

export default Home;
