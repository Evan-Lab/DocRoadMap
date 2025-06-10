import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./login.css";

const isDev = process.env.NODE_ENV !== "production";
const backendUrl = "https://www.docroadmap.fr";
const docroadmapImg = isDev
  ? "/assets/docroadmap.png"
  : "../assets/docroadmap.png";
const ArrowLeftIcon = FaArrowLeft as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;

function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const handleLogin = () => {
    axios
      .post(`${backendUrl}/auth/login`, { email, password })
      .then((response) => {
        const token = response.data.accessToken;
        localStorage.setItem("token", token);
        if (typeof chrome !== "undefined" && chrome.storage) {
          chrome.storage.local.set({ token }, () => {
            console.log("Token saved in chrome.storage :", token);
          });
        }
        if (token) {
          if (chrome?.tabs?.query && chrome?.tabs?.sendMessage) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
              if (tabs[0]?.id) {
                chrome.tabs.sendMessage(tabs[0].id, {
                  type: "logToken",
                  token,
                });
              }
            });
          }
          navigate("/roadmap");
        }
      })
      .catch(() => {
        setError(t("error"));
        console.error("Login failed.");
      });
  };

  const handlePasswordReset = () => {
    setResetMessage(t("resetSuccess"));
    setTimeout(() => {
      setResetMessage("");
    }, 5000);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </button>

        <div className="login-header">
          <img src={docroadmapImg} alt="DocRoadMap" />
        </div>

        {!isResetMode ? (
          <>
            {error && <p className="error-message">{error}</p>}
            <div className="input-group small">
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group small">
              <input
                type="password"
                placeholder={t("passwordPlaceholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-group small">
              <button className="login-button" onClick={handleLogin}>
                {t("login")}
              </button>
            </div>
            <p className="forgot-password" onClick={() => setIsResetMode(true)}>
              {t("forgot")}
            </p>
            <p className="signup-text">
              {t("noAccount")} <a href="/register">{t("register")}</a>
            </p>
          </>
        ) : (
          <>
            <h2>{t("reset")}</h2>
            {resetMessage && <p className="success-message">{resetMessage}</p>}
            <div className="input-group small">
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>
            <div className="input-group small">
              <button className="login-button" onClick={handlePasswordReset}>
                {t("sendReset")}
              </button>
            </div>
            <p className="back-to-login" onClick={() => setIsResetMode(false)}>
              {t("back")}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
