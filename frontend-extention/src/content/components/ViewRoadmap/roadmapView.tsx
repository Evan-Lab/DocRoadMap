import axios from "axios"
import { useEffect, useState } from "react"

const isDev = process.env.NODE_ENV !== "production"

const passportImg = isDev
  ? "/assets/passport_roadmap.png"
  : "../images/passport_roadmap.png"

const idImg = isDev ? "/assets/id_roadmap.png" : "../images/id_roadmap.png"

const movingImg = isDev
  ? "/assets/moving_roadmap.png"
  : "../images/moving_roadmap.png"

const unknownImg = isDev ? "/assets/docroadmap.png" : "../images/docroadmap.png"

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
  const [cards, setCards] = useState<Card[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserProcesses = async () => {
      const getToken = (): Promise<string | null> => {
        return new Promise(resolve => {
          if (typeof chrome !== "undefined") {
            if (chrome.storage?.local) {
              chrome.storage.local.get("token", result => {
                resolve(result.token ?? null)
              })
            } else if (chrome.runtime?.sendMessage) {
              chrome.runtime.sendMessage({ type: "GET_TOKEN" }, response => {
                resolve(response?.token ?? null)
              })
            } else {
              resolve(localStorage.getItem("token"))
            }
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
    <div className="roadmap-panel-container">
      {/* Panel-specific CSS */}
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
          border-bottom: 1px solid #e0e0e0;
        }
        .roadmap-title {
          font-size: 1.1rem;
          font-weight: bold;
          color: #2d3748;
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
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          padding: 0.75rem 0.5rem;
          transition: box-shadow 0.2s;
          position: relative;
          box-sizing: border-box;
        }
        .card:hover {
          box-shadow: 0 4px 16px rgba(44,62,80,0.14);
        }
        .card-image {
          width: 48px;
          height: 48px;
          object-fit: contain;
          margin-right: 0.75rem;
          flex-shrink: 0;
        }
        .card-header {
          margin-bottom: 0.2rem;
        }
        .card-header h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #2b6cb0;
          margin: 0;
          text-align: left;
          word-break: break-word;
        }
        .card-body {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .process {
          font-size: 0.95rem;
          color: #4a5568;
          margin-bottom: 0.3rem;
          text-align: left;
          word-break: break-word;
        }
        .card-body p {
          margin: 0;
        }
        .continue-button {
          margin-top: 0.5rem;
          padding: 0.25rem 0.8rem;
          background: #3182ce;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.18s;
          align-self: flex-start;
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
            <div style={{ flex: 1, minWidth: 0 }}>
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
          </div>
        ))}
      </div>
    </div>
  )
}

export default RoadmapView
