import React, { useState } from 'react';
import { FaRegFileAlt, FaUniversalAccess, FaRoad, FaEye, FaRobot, FaCog } from 'react-icons/fa';
// Import your components, these are place holders for te cpmponents we will use
import Chatbot from './components/Chatbot/chatbot';
import RoadmapView from './components/ViewRoadmap/roadmapView';
import RoadmapCreation from './components/roadmapCreation/roadmapCreation';
//import GenerateRM from './GenerateRM';
// import RoadmapComponent from './RoadmapComponent';
// import SettingsComponent from './SettingsComponent';

const buttonData = [
  { icon: <FaUniversalAccess />, label: 'Accessibilité' },
  { icon: <FaRoad />, label: 'Générer Roadmap' },
  { icon: <FaEye />, label: 'Voir Roadmap' },
  { icon: <FaRobot />, label: 'Chatbot' },
  { icon: <FaCog />, label: 'Paramètres' },
];

interface PanelProps {
  activePanel: string | null;
}

const Panel: React.FC<PanelProps> = ({ activePanel }) => (
  <div
    style={{
      position: 'fixed',
      bottom: '90px',
      right: '80px',
      width: '250px',
      height: '400px',
      background: '#fff',
      border: '1px solid #1976d2',
      borderRadius: '8px',
      boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
      zIndex: 10000,
      padding: '16px',
    }}
  >
    {/* {activePanel === 'Accessibilité' && <AccessibilityPanel />*/}
    {activePanel === 'Générer Roadmap' && < RoadmapCreation />}
    {activePanel === 'Voir Roadmap' && <RoadmapView />} 
    {activePanel === 'Chatbot' && <Chatbot />}
    {/* {{activePanel === 'Paramètres' && <SettingsComponent />}} */}
  </div>
);

const DocRoadmapBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const handleButtonClick = (label: string) => {
    setActivePanel(current => current === label ? null : label);
  };

  return (
    <>
      {activePanel && <Panel activePanel={activePanel} />}

      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'row-reverse',
          alignItems: 'center',
        }}
      >
        {/* Main Button */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: '#1976d2',
            color: 'white',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            fontSize: 28,
            cursor: 'pointer',
          }}
          aria-label="Doc Roadmap"
        >
          <FaRegFileAlt />
        </button>
        
        {/* Expandable Bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            transition: 'width 0.3s',
            overflow: 'hidden',
            width: open ? 300 : 0,
          }}
        >
          {open &&
            buttonData.map((btn) => (
              <button
                key={btn.label}
                onClick={() => handleButtonClick(btn.label)}
                style={{
                  margin: '0 8px',
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: activePanel === btn.label ? '#1976d2' : '#fff',
                  color: activePanel === btn.label ? 'white' : '#1976d2',
                  border: '1px solid #1976d2',
                  fontSize: 22,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
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
