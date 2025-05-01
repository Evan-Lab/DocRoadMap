import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "./Home";

import Login from "./(site)/Connexion/login/login";
import Register from "./(site)/Connexion/register/register";
import RegisterConfirmation from "./(site)/Connexion/registerConfirmation/registerConfirmation";

import DocroadmapHome from "./(site)/DocRoadMap/docroadmapHome/docroadmapHome";
import Profile from "./(site)/DocRoadMap/profile/profile";

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
          <Route path="/roadmap" element={<DocroadmapHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
