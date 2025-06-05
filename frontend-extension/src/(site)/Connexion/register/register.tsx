import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

const isDev = process.env.NODE_ENV !== "production";

const backendUrl = "http://localhost:8082";

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
      setError("passwordMismatch");
      return;
    }

    axios
      .post(`${backendUrl}/auth/register`, {
        firstName,
        lastName,
        email,
        password,
      })
      .then(() => {
        navigate("/account-confirmation");
      })
      .catch(() => {
        setError("error");
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
          <h1>{t("register")}</h1>
        </div>
        {error && <p className="error-message">{t(error)}</p>}
        <div className="input-group">
          <label>{t("firstName")}</label>
          <input
            type="text"
            placeholder={t("firstName")}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>{t("lastName")}</label>
          <input
            type="text"
            placeholder={t("lastName")}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>{t("email")}</label>
          <input
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>{t("password")}</label>
          <input
            type="password"
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>{t("confirmPassword")}</label>
          <input
            type="password"
            placeholder={t("password")}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="register-button" onClick={handleRegister}>
          {t("submit")}
        </button>
        <p className="login-text">
          {t("hasAccount")} <Link to="/login">{t("login")}</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
