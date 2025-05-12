import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./register.css";

const isDev = process.env.NODE_ENV !== "production";

const docroadmapImg = isDev
  ? "/assets/docroadmap.png"
  : "../assets/docroadmap.png";

const ArrowLeftIcon = FaArrowLeft as unknown as React.FC<any>;

function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setError("login.passwordMismatch");
      return;
    }

    axios
      .post("http://localhost:8082/auth/register", {
        firstName,
        lastName,
        email,
        password,
      })
      .then(() => {
        navigate("/account-confirmation");
      })
      .catch(() => {
        setError("login.error");
      });
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </button>
        <div className="register-header">
          <div className="DocRoadMap-Logo register">
            <img src={docroadmapImg} alt="DocRoadMap" />
          </div>
          <h1>{t("login.register")}</h1>
        </div>
        {error && <p className="error-message">{t(error)}</p>}
        <div className="input-group">
          <label>{t("login.firstName")}</label>
          <input
            type="text"
            placeholder={t("login.firstName")}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>{t("login.lastName")}</label>
          <input
            type="text"
            placeholder={t("login.lastName")}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>{t("login.email")}</label>
          <input
            type="email"
            placeholder={t("login.email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>{t("login.password")}</label>
          <input
            type="password"
            placeholder={t("login.password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>{t("login.confirmPassword")}</label>
          <input
            type="password"
            placeholder={t("login.password")}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="register-button" onClick={handleRegister}>
          {t("login.submit")}
        </button>
        <p className="login-text">
          {t("login.hasAccount")} <a href="/login">{t("login.login")}</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
