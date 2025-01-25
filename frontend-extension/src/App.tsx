import { useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AccountConfirmation from "./(site)/accountConfirmation/accountConfirmation";
import Menu from "./(site)/home/home";
import Login from "./(site)/login/login";
import Profile from "./(site)/profile/profile";
import Register from "./(site)/register/register";
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
                <Navigate to="/docroadmap" />
              )
            }
          />
          <Route
            path="/register"
            element={!isLoggedIn ? <Register /> : <Navigate to="/docroadmap" />}
          />
          <Route
            path="/docroadmap"
            element={isLoggedIn ? <Menu /> : <Navigate to="/" />}
          />
          <Route
            path="/account-confirmation"
            element={<AccountConfirmation />}
          />
          <Route path="/profile" element={<Profile />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
