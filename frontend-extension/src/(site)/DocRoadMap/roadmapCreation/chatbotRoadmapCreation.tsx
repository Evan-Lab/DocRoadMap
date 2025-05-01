import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaPaperPlane, FaRobot } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./chatbotRoadmapCreation.css";

const ChatbotRoadmapCreation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const collectionName = location.state?.collectionName;
  const token = localStorage.getItem("token");

  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "bot" }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialIA = async () => {
      if (!collectionName || !token) return;

      try {
        console.log("Requête IA en cours pour :", collectionName);
        const res = await axios.post(
          "http://localhost:8082/ai/start-conversation",
          { collection_name: collectionName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const reply = res.data?.question || "Pas de réponse.";
        setMessages([{ text: reply, sender: "bot" }]);
      } catch (err) {
        console.error("Erreur IA:", err);
        setMessages([{ text: "Erreur serveur IA", sender: "bot" }]);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialIA();
  }, [collectionName, token]);

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <div className="chatbot-title-container">
          <FaRobot className="chatbot-icon" />
          <h1 className="chatbot-title">Assistant IA</h1>
        </div>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="chat-message bot">...</div>}
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Posez votre question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled
        />
        <button disabled className="send-button">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatbotRoadmapCreation;
