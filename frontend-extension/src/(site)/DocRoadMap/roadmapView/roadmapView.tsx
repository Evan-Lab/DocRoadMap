import axios from "axios"
import { useEffect, useState } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import "./roadmapView.css"

const isDev = process.env.NODE_ENV !== "production"

const passportImg = isDev
  ? "/assets/passport_roadmap.png"
  : "../images/passport_roadmap.png"

const idImg = isDev ? "/assets/id_roadmap.png" : "../images/id_roadmap.png"

const movingImg = isDev
  ? "/assets/moving_roadmap.png"
  : "../images/moving_roadmap.png"

const unknownImg = isDev ? "/assets/docroadmap.png" : "../images/docroadmap.png"

const ArrowLeftIcon = FaArrowLeft as unknown as React.FC<any>

interface Card {
  id: number
  name: string
  description: string
  status: string
  createdAt: string
  updatedAt: string
  endedAt?: string
  steps: any[]
}

const RoadmapView: React.FC = () => {
  const navigate = useNavigate()
  const [cards, setCards] = useState<Card[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserProcesses = async () => {
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

      const token = await getToken()

      if (!token) {
        setError("Token manquant. Veuillez vous connecter.")
        return
      }

      try {
        const response = await axios.get("http://localhost:8082/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const processes = response.data.processes || []
        setCards(processes)
      } catch (error) {
        console.error("Erreur lors de la récupération des roadmaps :", error)
        setError("Impossible de récupérer les roadmaps.")
      }
    }

    fetchUserProcesses()
  }, [])

  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")

  const getImageForCardName = (name: string) => {
    const lower = normalize(name)

    if (lower.includes("passport")) return passportImg
    if (lower.includes("carte") && lower.includes("identite")) return idImg
    if (lower.includes("demenagement")) return movingImg
    return unknownImg
  }

  const getValidatedStepsCount = (status: string) => {
    switch (status) {
      case "PENDING":
        return 0
      case "IN_PROGRESS":
        return 1
      case "COMPLETED":
        return 3
      default:
        return 0
    }
  }

  return (
    <div className="roadmap-container">
      <div className="roadmap-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </button>
        <h1 className="roadmap-title">Mes démarches en cours</h1>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="view-container">
        {cards.map(card => (
          <div className="card" key={card.id}>
            <img
              className="card-image"
              src={getImageForCardName(card.name)}
              alt="Illustration démarche"
            />
            <div className="card-header">
              <h3>{card.name}</h3>
            </div>
            <div className="card-body">
              <p className="process">{card.description}</p>
              <p>
                {getValidatedStepsCount(card.status)} étape
                {getValidatedStepsCount(card.status) > 1 ? "s" : ""} validée sur
                3
              </p>
              <button className="continue-button">Continuer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RoadmapView
