import axios from "axios"
import { useEffect, useState } from "react"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import "./roadmapCreation.css"

const ArrowLeftIcon = FaArrowLeft as unknown as React.FC<any>
const ArrowRightIcon = FaArrowRight as unknown as React.FC<any>

const isDev = process.env.NODE_ENV !== "production"

const passportImg = isDev
  ? "/assets/passport_roadmap.png"
  : "../images/passport_roadmap.png"

const idImg = isDev ? "/assets/id_roadmap.png" : "../images/id_roadmap.png"

const movingImg = isDev
  ? "/assets/moving_roadmap.png"
  : "../images/moving_roadmap.png"

const stepsData = [
  {
    name: "Demande de passport",
    title: "Demande de passeport",
    description: "Cr\u00e9er une demande de passeport en quelques clics.",
    image: passportImg,
  },
  {
    name: "Demande de carte d'identité",
    title: "Demande de carte d'identit\u00e9",
    description: "Proc\u00e9dure rapide pour votre carte d'identit\u00e9.",
    image: idImg,
  },
  {
    name: "Déménagement",
    title: "D\u00e9m\u00e9nagement",
    description: "G\u00e9rez facilement votre changement d'adresse.",
    image: movingImg,
  },
]

const RoadmapCreation: React.FC = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [usedStepsIds, setUsedStepsIds] = useState<number[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

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
        setError(
          "Une erreur s'est produite lors de la récupération des données."
        )
        console.error(error)
      }
    }

    fetchUserProfile()
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
    if (!user?.id) return
    const stepsId = generateUniqueStepsId()

    try {
      await axios.post(
        "http://localhost:8082/process/create",
        {
          name: current.name,
          description: current.description,
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
    } catch (error) {
      console.error("Erreur lors de la création :", error)
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

      <div className="creation-container {">
        <button className="carousel-arrow" onClick={prev}>
          <ArrowLeftIcon />
        </button>

        <div className="carousel-card">
          <img src={current.image} alt={current.title} />
          <h2>{current.title}</h2>
          <p>{current.description}</p>
          <button onClick={handleCreateCard}>Créer cette démarche</button>
        </div>

        <button className="carousel-arrow" onClick={next}>
          <ArrowRightIcon />
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default RoadmapCreation
