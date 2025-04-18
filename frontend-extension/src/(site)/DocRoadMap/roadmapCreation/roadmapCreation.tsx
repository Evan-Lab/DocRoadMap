import axios from "axios"
import { useEffect, useState } from "react"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import "./roadmapCreation.css"

const ArrowLeftIcon = FaArrowLeft as unknown as React.FC<any>
const ArrowRightIcon = FaArrowRight as unknown as React.FC<any>

const isDev = process.env.NODE_ENV !== "production"

const getImageForStep = (collectionName: string): string => {
  const basePath = isDev ? "/assets" : "../images"

  switch (collectionName) {
    case "acte_naissance":
      return `${basePath}/born_roadmap.png`
    case "demenagement_en_france":
      return `${basePath}/moving_roadmap.png`
    case "garde_enfants":
      return `${basePath}/keep_children.png`
    case "je_pars_de_chez_mes_parents":
      return `${basePath}/move_from_parents_roadmap.png`
    case "jachete_un_logement":
      return `${basePath}/buy_roadmap.png`
    case "recherche-emploi":
      return `${basePath}/find_job_roadmap.png`
    default:
      return `${basePath}/default.png`
  }
}

interface Step {
  id: number
  name: string
  collection_name: string
  image: string
}

const RoadmapCreation: React.FC = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [usedStepsIds, setUsedStepsIds] = useState<number[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [stepsData, setStepsData] = useState<Step[]>([])

  const current = stepsData[currentIndex]

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!token) throw new Error("Token non disponible.")
        const response = await fetch("http://localhost:8082/users/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok)
          throw new Error("Échec de la récupération de l'utilisateur")
        const data = await response.json()
        setUser({ id: data.id })
      } catch (error) {
        setError("Erreur lors de la récupération des données utilisateur.")
        console.error(error)
      }
    }

    const fetchStepsData = async () => {
      try {
        if (!token) throw new Error("Token non disponible.")
        const response = await axios.get(
          "http://localhost:8082/list-administrative-process",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const enrichedSteps = response.data.map((step: any) => ({
          ...step,
          image: getImageForStep(step.collection_name),
        }))

        setStepsData(enrichedSteps)
      } catch (error) {
        setError("Erreur lors de la récupération des démarches.")
        console.error(error)
      }
    }

    fetchUserProfile()
    fetchStepsData()
  }, [token])

  const generateUniqueStepsId = (): number => {
    let id: number
    do {
      id = Math.floor(Math.random() * 900) + 101
    } while (usedStepsIds.includes(id))
    setUsedStepsIds(prev => [...prev, id])
    return id
  }

  const handleCreateCard = async () => {
    if (!user?.id || !current) return
    const stepsId = generateUniqueStepsId()

    try {
      await axios.post(
        "http://localhost:8082/process/create",
        {
          name: current.name,
          description: current.collection_name,
          status: "PENDING",
          userId: user.id,
          stepsId,
          endedAt: "2024-12-12, 12:00:00",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )

      navigate("/chatbot-roadmap-creation", {
        state: { collectionName: current.collection_name },
      })
    } catch (error) {
      console.error("Erreur lors de la création ou redirection :", error)
      setError("Erreur lors de la création de la démarche.")
    }
  }

  const next = () => setCurrentIndex(prev => (prev + 1) % stepsData.length)
  const prev = () =>
    setCurrentIndex(prev => (prev - 1 + stepsData.length) % stepsData.length)

  return (
    <div className="roadmap-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ArrowLeftIcon />
      </button>
      <h1 className="roadmap-title">Création d'une Roadmap</h1>

      {stepsData.length > 0 ? (
        <div className="creation-container">
          <button className="carousel-arrow" onClick={prev}>
            <ArrowLeftIcon />
          </button>

          <div className="carousel-card">
            <img src={current.image} alt={current.name} />
            <h2>{current.name}</h2>
            <button onClick={handleCreateCard}>Créer cette démarche</button>
          </div>

          <button className="carousel-arrow" onClick={next}>
            <ArrowRightIcon />
          </button>
        </div>
      ) : (
        <p>Chargement des démarches...</p>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default RoadmapCreation
