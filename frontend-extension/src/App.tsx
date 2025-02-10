import { useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AccountConfirmation from "./(site)/accountConfirmation/accountConfirmation";
import Chatbot from "./(site)/chatbot/chatbot";
import Menu from "./(site)/home/home";
import Login from "./(site)/login/login";
import Profile from "./(site)/profile/profile";
import Register from "./(site)/register/register";
import Roadmap from "./(site)/roadmap/roadmapHome";
import CreateRoadmap from "./(site)/roadmapCreation/roadmapCreation";
import RoadmapView from "./(site)/roadmapView/roadmapView";
import Home from "./Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              !isLoggedIn ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to="/roadmap" />
              )
            }
          />
          <Route
            path="/register"
            element={!isLoggedIn ? <Register /> : <Navigate to="/roadmap" />}
          />
          <Route
            path="/docroadmap"
            element={isLoggedIn ? <Menu /> : <Navigate to="/" />}
          />
          <Route
            path="/account-confirmation"
            element={<AccountConfirmation />}
          />
          <Route path="/roadmap-view" element={<RoadmapView />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/create-roadmap" element={<CreateRoadmap />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
