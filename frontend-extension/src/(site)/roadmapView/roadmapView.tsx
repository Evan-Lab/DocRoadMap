import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./roadmapView.css";

const token = localStorage.getItem("token");
console.log(token);

const fetchProcesses = async () => {
  try {
    const response = await axios.get("http://localhost:8080/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.process);
    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      error: "Unauthorized access. You do not have permission.",
    };
  }
};

const RoadmapView: React.FC = () => {
  const navigate = useNavigate();

  const roadmaps = [
    { id: 1, title: "Déclaration des impôts", process: "Collecting documents", progress: 50 },
    { id: 2, title: "nouveau Passport", process: "Waiting for appointment", progress: 20 },
    { id: 3, title: "Renouveler titre de séjour", process: "Collecting documents", progress: 80 },
    { id: 4, title: "Créer mon entreprise", process: "Creating business plan", progress: 10 },
    { id: 5, title: "Demander ma retraite", process: "Collecting documents", progress: 30 },
  ];
  
  const cards = fetchProcesses() 
  return (
    <div className="roadmap-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
      <h1 className="roadmap-title">Mes Roadmaps </h1>
      <button className="fetch-process-button" onClick={() => console.log(cards)}>click me</button>
      <div className="carousel-container">
        {roadmaps.map((roadmap) => (
          <div className="card">
          <div key={roadmap.id} className="card-header">
            <h3>{roadmap.title}</h3>
          </div><div className="card-body">
              <p className="process">{roadmap.process}</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${roadmap.progress}%` }}></div>
              </div>
              <p>{roadmap.progress}% completed</p>
              <button className="chat-button">Chat with Assistant</button>
              <button className="continue-button"> Continue </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapView;