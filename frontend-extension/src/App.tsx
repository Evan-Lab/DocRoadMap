import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AccountConfirmation from "./(site)/accountConfirmation/accountConfirmation";
import Chatbot from "./(site)/chatbot/chatbot";
import Docroadmap from "./(site)/docroadmap/docroadmap";
import Login from "./(site)/login/login";
import Profile from "./(site)/profile/profile";
import Register from "./(site)/register/register";
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
            element={<AccountConfirmation />}
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
