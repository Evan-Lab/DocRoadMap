import axios from "axios"
import { useEffect, useState } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import "./roadmapView.css"

const isDev = process.env.NODE_ENV !== "production"
const basePath = isDev ? "../assets/" : "../assets/"

const ArrowLeftIcon = FaArrowLeft as React.FC<React.SVGProps<SVGSVGElement>>

const normalize = (str: string): string =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

const getImageForCardName = (name: string): string => {
  const lower = normalize(name)

  if (lower.includes("naissance")) return `${basePath}/born_roadmap.png`
  if (lower.includes("demenagement")) return `${basePath}/moving_roadmap.png`
  if (lower.includes("enfant")) return `${basePath}/keep_children.png`
  if (lower.includes("parent"))
    return `${basePath}/move_from_parents_roadmap.png`
  if (lower.includes("logement") || lower.includes("acheter"))
    return `${basePath}/buy_roadmap.png`
  if (lower.includes("emploi") || lower.includes("travail"))
    return `${basePath}/find_job_roadmap.png`
  if (lower.includes("passeport") || lower.includes("passport"))
    return `${basePath}/passport_roadmap.png`
  if (lower.includes("carte") && lower.includes("identite"))
    return `${basePath}/id_roadmap.png`

  return `${basePath}/docroadmap.png`
}

interface Card {
  id: number
  name: string
  description: string
  status: string
  createdAt: string
  updatedAt: string
  endedAt?: string
  steps: unknown[]
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
