import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./(site)/Connexion/login/login";
import Register from "./(site)/Connexion/register/register";
import RegisterConfirmation from "./(site)/Connexion/registerConfirmation/registerConfirmation";
import Chatbot from "./(site)/chatbot/chatbot";
import Docroadmap from "./(site)/docroadmap/docroadmap";
import Profile from "./(site)/profile/profile";
import CreateRoadmap from "./(site)/roadmapCreation/roadmapCreation";
import RoadmapView from "./(site)/roadmapView/roadmapView";
import Settings from "./(site)/settings/settings";
import Home from "./Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/account-confirmation"
            element={<RegisterConfirmation />}
          />
          <Route path="/roadmap-view" element={<RoadmapView />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/create-roadmap" element={<CreateRoadmap />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/roadmap" element={<Docroadmap />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
