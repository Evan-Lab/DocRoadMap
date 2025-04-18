import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom"
import Home from "./Home.tsx"

import Login from "./(site)/Connexion/login/login"
import Register from "./(site)/Connexion/register/register"
import RegisterConfirmation from "./(site)/Connexion/registerConfirmation/registerConfirmation"

import Chatbot from "./(site)/DocRoadMap/chatbotDonna/chatbot"
import DocroadmapHome from "./(site)/DocRoadMap/docroadmapHome/docroadmapHome"
import RoadmapCreation from "./(site)/DocRoadMap/roadmapCreation/roadmapCreation"
import RoadmapView from "./(site)/DocRoadMap/roadmapView/roadmapView"

import SettingsMenu from "./(site)/Settings/Menu/settingsMenu"
import Profile from "./(site)/Settings/profile/profile"

function App() {
  return (
    <Router>
      <div className="App popup-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/account-confirmation"
            element={<RegisterConfirmation />}
          />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/roadmap-view" element={<RoadmapView />} />
          <Route path="/create-roadmap" element={<RoadmapCreation />} />
          <Route path="/roadmap" element={<DocroadmapHome />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<SettingsMenu />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
