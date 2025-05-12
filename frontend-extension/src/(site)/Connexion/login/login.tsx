import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./login.css";

const isDev = process.env.NODE_ENV !== "production";

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
      .post("http://localhost:8082/auth/login", { email, password })
      .then((response) => {
        const token = response.data.accessToken;

        localStorage.setItem("token", token);
        if (typeof chrome !== "undefined" && chrome.storage) {
          chrome.storage.local.set({ token }, () => {
            console.log("Token saved in chrome.storage :", token);
          });
        }

        if (token) {
          if (
            chrome &&
            chrome.tabs &&
            chrome.tabs.query &&
            chrome.tabs.sendMessage
          ) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
              if (tabs[0]?.id) {
                chrome.tabs.sendMessage(tabs[0].id, {
                  type: "logToken",
                  token,
                });
              }
            });
          }
          console.log("Connected, token: ", token);
          navigate("/roadmap");
        }
      })
      .catch(() => {
        setError(t("login.error"));
        console.log("Not connected, token: ", localStorage.getItem("token"));
      });
  };

  const handlePasswordReset = () => {
    setResetMessage(t("login.resetSuccess"));
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

        {!isResetMode ? (
          <>
            <div className="login-header">
              <div className="DocRoadMap-Logo login">
                <img src={docroadmapImg} alt="DocRoadMap" />
              </div>
              <h1>{t("login.Connexion")}</h1>
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="input-group">
              <label>{t("login.email")}</label>
              <input
                type="email"
                placeholder={t("login.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>{t("login.password")}</label>
              <input
                type="password"
                placeholder={t("login.passwordPlaceholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="login-button" onClick={handleLogin}>
              {t("login.login")}
            </button>
            <p className="forgot-password" onClick={() => setIsResetMode(true)}>
              {t("login.forgot")}
            </p>
            <p className="signup-text">
              {t("login.noAccount")}{" "}
              <a href="/register">{t("login.register")}</a>
            </p>
          </>
        ) : (
          <>
            <h2>{t("login.reset")}</h2>
            {resetMessage && <p className="success-message">{resetMessage}</p>}
            <div className="input-group">
              <label>{t("login.email")}</label>
              <input
                type="email"
                placeholder={t("login.emailPlaceholder")}
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>
            <button className="login-button" onClick={handlePasswordReset}>
              {t("login.sendReset")}
            </button>
            <p className="back-to-login" onClick={() => setIsResetMode(false)}>
              {t("login.back")}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
