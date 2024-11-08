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
                <Navigate to="/connected" />
              )
            }
          />
          <Route
            path="/register"
            element={!isLoggedIn ? <Register /> : <Navigate to="/connected" />}
          />
          <Route
            path="/connected"
            element={isLoggedIn ? <Menu /> : <Navigate to="/" />}
          />
          <Route
            path="/account-confirmation"
            element={<AccountConfirmation />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
