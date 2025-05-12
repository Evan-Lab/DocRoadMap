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
      setError("register.passwordMismatch");
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
        setError("register.error");
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
          <h1>{t("register.title")}</h1>
        </div>
        {error && <p className="error-message">{t(error)}</p>}
        <div className="input-group">
          <label>{t("register.firstName")}</label>
          <input
            type="text"
            placeholder={t("register.firstName")}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>{t("register.lastName")}</label>
          <input
            type="text"
            placeholder={t("register.lastName")}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>{t("register.email")}</label>
          <input
            type="email"
            placeholder={t("register.email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>{t("register.password")}</label>
          <input
            type="password"
            placeholder={t("register.password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>{t("register.confirmPassword")}</label>
          <input
            type="password"
            placeholder={t("register.password")}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="register-button" onClick={handleRegister}>
          {t("register.submit")}
        </button>
        <p className="login-text">
          {t("register.hasAccount")} <a href="/login">{t("register.login")}</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
