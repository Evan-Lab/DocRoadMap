import React, { useState } from 'react';
import { FaRegFileAlt, FaUniversalAccess, FaRoad, FaEye, FaRobot, FaCog } from 'react-icons/fa';

const buttonData = [
  { icon: <FaUniversalAccess />, label: 'Accessibilité' },
  { icon: <FaRoad />, label: 'Générer Roadmap' },
  { icon: <FaEye />, label: 'Voir Roadmap' },
  { icon: <FaRobot />, label: 'Chatbot' },
  { icon: <FaCog />, label: 'Paramètres' },
];

const DocRoadmapBar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
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
              style={{
                margin: '0 8px',
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: '#fff',
                color: '#1976d2',
                border: '1px solid #1976d2',
                fontSize: 22,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              aria-label={btn.label}
            >
              {btn.icon}
            </button>
          ))}
      </div>
    </div>
  );
};

export default DocRoadmapBar;
