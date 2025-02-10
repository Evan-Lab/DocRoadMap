import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./chatbot.css";

const Chatbot: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "bot" }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "PROVISORY-API-KEY";

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { text: input, sender: "user" as "user" },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    setMessages([...newMessages, { text: "", sender: "bot" }]);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: input }],
            stream: true,
          }),
        }
      );

      if (!response.body) throw new Error("Pas de réponse du serveur.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botMessage = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        const lines = chunk
          .split("\n")
          .filter((line) => line.startsWith("data:"));
        for (const line of lines) {
          const data = line.replace("data: ", "").trim();
          if (data === "[DONE]") return;

          try {
            const parsedData = JSON.parse(data);
            const text = parsedData.choices?.[0]?.delta?.content || "";
            botMessage += text;

            setMessages((prev) =>
              prev.map((msg, index) =>
                index === prev.length - 1 ? { ...msg, text: botMessage } : msg
              )
            );
          } catch (error) {
            console.error("Erreur de parsing JSON :", error);
          }
        }
      }
    } catch (error) {
      console.error("Erreur lors de la requête OpenAI", error);
      setMessages([
        ...newMessages,
        { text: "Erreur lors de la communication avec l'API.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <h1 className="chatbot-title">Donna Chatbot</h1>
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Posez votre question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading}>
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
