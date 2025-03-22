import axios from "axios"
import { useEffect, useState } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import "./roadmapCreation.css"

const ArrowLeftIcon = FaArrowLeft as unknown as React.FC<any>

const RoadmapCreation: React.FC = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleButtonClick = () => {
    console.log("Button clicked! Feature coming soon.")
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
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
          id: data.id,
        })
      } catch (error) {
        setError(
          "Une erreur s'est produite lors de la récupération des données."
        )
        console.error(error)
      }
    }

    fetchUserProfile()
  }, [token])

  const handleCreateCard = async () => {
    if (!user?.id) {
      console.warn("L'utilisateur n'est pas encore chargé.")
      return
    }

    try {
      const response = await axios.post(
        "http://localhost:8082/process/create",
        {
          name: "id card",
          description: "ID card process",
          status: "PENDING",
          userId: user.id,
          stepsId: 15,
          endedAt: "2024-12-12, 12:00:00",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
    } catch (error) {
      console.error("Error creating process:", error)
    }
  }

  return (
    <div className="roadmap-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ArrowLeftIcon />
      </button>
      <h1 className="roadmap-title">Création d'une Roadmap</h1>
      <div className="action-section">
        <button
          className="feature-button"
          onClick={() => {
            handleButtonClick()
            handleCreateCard()
          }}
          disabled={!user?.id}
        >
          Click Me
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default RoadmapCreation
