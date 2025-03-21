import { FaArrowLeft, FaGlobe, FaSignOutAlt, FaUser } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import "./settingsMenu.css"

const ArrowLeftIcon = FaArrowLeft as unknown as React.FC<any>
const UserIcon = FaUser as unknown as React.FC<any>
const GlobeIcon = FaGlobe as unknown as React.FC<any>
const SignOutIcon = FaSignOutAlt as unknown as React.FC<any>

const SettingsMenu: React.FC = () => {
  const navigate = useNavigate()

  const goToProfile = () => {
    navigate("/profile")
  }

  const changeLanguage = () => {
    console.log("Work in progress")
  }

  const logout = () => {
    localStorage.removeItem("token")
    sessionStorage.clear()
    navigate("/")
  }

  return (
    <div className="roadmap-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ArrowLeftIcon />
      </button>
      <div className="settings-content">
        <h1 className="roadmap-title">Paramètres</h1>
        <div className="roadmap-buttons">
          <button onClick={goToProfile}>
            <UserIcon className="button-icon" />
            <span className="button-text">Profil</span>
          </button>

          <button onClick={changeLanguage}>
            <GlobeIcon className="button-icon" />
            <span className="button-text">Langue</span>
          </button>

          <button onClick={logout}>
            <SignOutIcon className="button-icon" />
            <span className="button-text">Déconnexion</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsMenu
