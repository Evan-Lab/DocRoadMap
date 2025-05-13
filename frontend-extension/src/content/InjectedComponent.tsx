import React, { useEffect, useState } from "react";
import {
  FaCalendar,
  FaEye,
  FaRegFileAlt,
  FaRoad,
  FaRobot,
  FaUniversalAccess,
} from "react-icons/fa";
import Chatbot from "./components/Chatbot/chatbot";
import RoadmapView from "./components/ViewRoadmap/roadmapView";
import RoadmapCreation from "./components/roadmapCreation/roadmapCreation";
import StepsCalendar from "./components/Calendar/calendar";
import { getToken } from "./utils/utils";

const buttonData = [
  { icon: <FaUniversalAccess />, label: "Accessibilité" },
  { icon: <FaRoad />, label: "Générer Roadmap" },
  { icon: <FaEye />, label: "Voir Roadmap" },
  { icon: <FaRobot />, label: "Chatbot" },
  { icon: <FaCalendar />, label: "Calendrier" },
];

interface PanelProps {
  activePanel: string | null;
}

const Panel: React.FC<PanelProps> = ({ activePanel }) => (
  <div
    style={{
      position: "fixed",
      bottom: "90px",
      right: "80px",
      width: "300px",
      height: "450px",
      background: "#fff",
      border: "1px solid #1976d2",
      borderRadius: 8,
      boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
      zIndex: 10000,
      padding: 8,
    }}
  >
    {/* {activePanel === "Accessibilité" && < />} */}
    {activePanel === "Générer Roadmap" && <RoadmapCreation />}
    {activePanel === "Voir Roadmap" && <RoadmapView />}
    {activePanel === "Chatbot" && <Chatbot />}
    {activePanel === "Calendrier" && <StepsCalendar />}
  </div>
);

const DocRoadmapBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    getToken().then(setToken);
    // adding listener to asynchronously check when the user is logged in or not (token is set or not)
    // if token is set : display the button at bottom right of screen
    // if not : nothing gets displayed at bottom right of screen
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      const onChanged = (
        changes: { [key: string]: chrome.storage.StorageChange },
        area: string
      ) => {
        if (area === "local" && changes.token) {
          setToken(changes.token.newValue ?? null);
        }
      };
      chrome.storage.onChanged.addListener(onChanged);
      return () => {
        chrome.storage.onChanged.removeListener(onChanged);
      };
    } else {
      const onStorage = (e: StorageEvent) => {
        if (e.key === "token") {
          setToken(e.newValue);
        }
      };
      window.addEventListener("storage", onStorage);
      return () => {
        window.removeEventListener("storage", onStorage);
      };
    }
  }, []);

  if (!token) {
    return null;
  }

  const handleButtonClick = (label: string) => {
    setActivePanel((cur) => (cur === label ? null : label));
  };

  return (
    <>
      {activePanel && <Panel activePanel={activePanel} />}

      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => {
            setOpen((o) => !o);
            setActivePanel(null);
          }}
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#1976d2",
            color: "white",
            border: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            fontSize: 28,
            cursor: "pointer",
          }}
          aria-label="Doc Roadmap"
        >
          <FaRegFileAlt />
        </button>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            transition: "width 0.3s",
            overflow: "hidden",
            width: open ? 300 : 0,
          }}
        >
          {open &&
            buttonData.map((btn) => (
              <button
                key={btn.label}
                onClick={() => handleButtonClick(btn.label)}
                style={{
                  margin: "0 8px",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: activePanel === btn.label ? "#1976d2" : "#fff",
                  color: activePanel === btn.label ? "#fff" : "#1976d2",
                  border: "1px solid #1976d2",
                  fontSize: 22,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                aria-label={btn.label}
              >
                {btn.icon}
              </button>
            ))}
        </div>
      </div>
    </>
  );
};
export default DocRoadmapBar;
