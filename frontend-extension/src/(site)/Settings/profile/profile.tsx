import { useEffect, useState } from "react"
import { FaArrowLeft, FaEnvelope, FaLock, FaUser } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import "./profile.css"

const ArrowLeftIcon = FaArrowLeft as unknown as React.FC<any>
const UserIcon = FaUser as unknown as React.FC<any>
const EnvelopeIcon = FaEnvelope as unknown as React.FC<any>
const LockIcon = FaLock as unknown as React.FC<any>

function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "********",
  })

  const [error, setError] = useState<string>("")
  const [editingField, setEditingField] = useState<string | null>(null)
  const [tempValue, setTempValue] = useState("")

  useEffect(() => {
    const fetchUserProfile = async () => {
      const getToken = (): Promise<string | null> => {
        return new Promise(resolve => {
          if (typeof chrome !== "undefined" && chrome.storage?.local) {
            chrome.storage.local.get("token", result => {
              resolve(result.token ?? null)
            })
          } else {
            resolve(localStorage.getItem("token"))
          }
        })
      }
      try {
        const token = await getToken()
        if (!token) {
          throw new Error("Token non disponible. Veuillez vous connecter.")
        }

        const response = await fetch("http://localhost:8082/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Échec de la récupération des données utilisateur")
        }

        const data = await response.json()
        setUser({
          firstName: data.firstName || "Non spécifié",
          lastName: data.lastName || "Non spécifié",
          email: data.email || "Non spécifié",
          password: "********",
        })
      } catch (error) {
        setError(
          "Une erreur s'est produite lors de la récupération des données."
        )
        console.error(error)
      }
    }

    fetchUserProfile()
  }, [])

  const handleEditClick = (field: string, value: string) => {
    setEditingField(field)
    setTempValue(value)
  }

  const handleConfirmEdit = () => {
    setUser(prevUser => ({
      ...prevUser,
      [editingField as string]: tempValue,
    }))
    setEditingField(null)
  }

  const handleCancelEdit = () => {
    setEditingField(null)
  }

  return (
    <div className="profile-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ArrowLeftIcon />
      </button>
      <h1 className="profile-title">Profil</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="profile-picture">
        <FaUser size={80} />
      </div>
      <div className="profile-info">
        {["firstName", "lastName", "email", "password"].map(field => (
          <div className="profile-item" key={field}>
            <span className="profile-label">
              {field === "firstName" || field === "lastName" ? (
                <UserIcon color="black" />
              ) : field === "email" ? (
                <EnvelopeIcon color="black" />
              ) : (
                <LockIcon color="black" />
              )}
            </span>
            {editingField === field ? (
              <div className="edit-container">
                <input
                  type={field === "password" ? "password" : "text"}
                  value={tempValue}
                  onChange={e => setTempValue(e.target.value)}
                  className="edit-input"
                />
                <button className="confirm-button" onClick={handleConfirmEdit}>
                  ✔
                </button>
                <button className="cancel-button" onClick={handleCancelEdit}>
                  ✖
                </button>
              </div>
            ) : (
              <>
                <span className="profile-value">
                  {user[field as keyof typeof user]}
                </span>
                <button
                  className="edit-button"
                  onClick={() =>
                    handleEditClick(field, user[field as keyof typeof user])
                  }
                >
                  Modifier
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile
