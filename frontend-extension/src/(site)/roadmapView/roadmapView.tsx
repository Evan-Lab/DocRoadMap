import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./roadmapView.css";

const token = localStorage.getItem("token");

// Define TypeScript interface for cards
interface Card {
  id: number;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  endedAt?: string;
  steps: any[]; // Adjust type if necessary
}

const fetchProcesses = async (): Promise<Card[]> => {
  try {
    const response = await axios.get("http://localhost:8082/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data.processes || [];
  } catch (error) {
    console.error("Unauthorized access. You do not have permission.");
    return [];
  }
};

const RoadmapView: React.FC = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Card[]>([]); // Explicitly setting type

  useEffect(() => {
    const getProcesses = async () => {
      const processes = await fetchProcesses();
      setCards(processes);
    };
    getProcesses();
  }, []);

  return (
    <div className="roadmap-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
      <h1 className="roadmap-title">Mes Roadmaps </h1>
      {/* <button className="fetch-process-button" onClick={() => console.log(cards)}>click me</button> */}
      <div className="carousel-container">
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <div className="card-header">
              <h3>{card.name}</h3>
            </div>
            <div className="card-body">
              <p className="process">{card.description}</p>
              <p>Status: {card.status}</p>
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