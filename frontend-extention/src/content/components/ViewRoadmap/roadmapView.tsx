import axios from "axios"
import { useEffect, useState } from "react"
// import { FaArrowLeft } from "react-icons/fa"
// import { useNavigate } from "react-router-dom"


const isDev = process.env.NODE_ENV !== "production"
const basePath = isDev ? "./assets/" : "./assets/"

// const ArrowLeftIcon = FaArrowLeft as React.FC<React.SVGProps<SVGSVGElement>>

const normalize = (str: string): string =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

const getImageForCardName = (name: string): string => {
  const lower = normalize(name)

  if (lower.includes("naissance")) return chrome.runtime.getURL(`${basePath}born_roadmap.png`)
  if (lower.includes("demenagement")) return chrome.runtime.getURL(`${basePath}moving_roadmap.png`)
  if (lower.includes("enfant")) return chrome.runtime.getURL(`${basePath}keep_children.png`)
  if (lower.includes("parent")) return chrome.runtime.getURL(`${basePath}move_from_parents_roadmap.png`)
  if (lower.includes("logement") || lower.includes("acheter")) return chrome.runtime.getURL(`${basePath}buy_roadmap.png`)
  if (lower.includes("emploi") || lower.includes("travail")) return chrome.runtime.getURL(`${basePath}find_job_roadmap.png`)
  if (lower.includes("passeport") || lower.includes("passport")) return chrome.runtime.getURL(`${basePath}passport_roadmap.png`)
  if (lower.includes("carte") && lower.includes("identite")) return chrome.runtime.getURL(`${basePath}id_roadmap.png`)

  return chrome.runtime.getURL(`${basePath}docroadmap.png`)
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
  // const navigate = useNavigate()
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
    <div className="roadmap-panel-container">
      <style>{`
        .roadmap-panel-container {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          background: #f7f8fa;
        }
        .roadmap-header {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
          padding-bottom: 0.25rem;
          flex-direction: row;
          border-bottom: 1px solid #e0e0e0;
        }
        .roadmap-title {
          font-size: 1.1rem;
          font-weight: bold;
          padding: 0.5rem 0;
          color:black;
          flex-direction: row;
          margin: 0;
        }
        .error-message {
          color: #e53e3e;
          background: #fff0f0;
          border: 1px solid #e53e3e;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }
        .carousel-container {
          flex: 1 1 auto;
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding-bottom: 0.5rem;
        }
        .card {
           background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(44,62,80,0.08);
          width: 100%;
          max-width: 100%;
          flex-direction: row;
          align-items: flex-start;
          transition: box-shadow 0.2s;
          position: relative;
          box-sizing: border-box;
        }
        .card:hover {
          box-shadow: 0 4px 16px rgba(44,62,80,0.14);
        }
        .card-image {
          width:100%;
          border-radius: 10px 10px 0 0;

        }
        .card-header {
          margin-bottom: 0.2rem;
          background: #007bff;
          padding: 0.5rem 0.75rem;
        }
        .card-header h3 {
          font-size: 1rem;
          font-weight: 600;
          background: #007bff;
          color:white;
          margin: 0;
          text-align: center;
          word-break: break-word;
        }
        .card-body {
          flex: 1 1 auto;
          padding: 0.5rem 0.75rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .process {
          font-size: 0.95rem;
          color: black;
          margin-bottom: 0.3rem;
          text-align: center;
          word-break: break-word;
        }
        .card-body p {
          margin: 0;
          color: black;
          font-size: 0.9rem;
          
        }
        .continue-button {
          margin-top: 0.5rem;
          width: 90%;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.18s;
          padding: 0.5rem 0.75rem;
          }
        .continue-button:hover {
          background: #225ea8;
        }
        /* Hide scrollbars for Chrome, Safari and Opera */
        .carousel-container::-webkit-scrollbar {
          width: 6px;
        }
        .carousel-container::-webkit-scrollbar-thumb {
          background: #e0e0e0;
          border-radius: 3px;
        }
        /* Hide scrollbars for IE, Edge and Firefox */
        .carousel-container {
          scrollbar-width: thin;
          scrollbar-color: #e0e0e0 #f7f8fa;
        }
      `}</style>
      <div className="roadmap-header">
        {/* <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </button> */}
        <h1 className="roadmap-title">Mes démarches en cours</h1>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="carousel-container">
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