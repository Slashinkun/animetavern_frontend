import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import AnimeEntry from "../components/AnimeEntry"

export default function UserPage() {
  const { id } = useParams()

  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/user/${id}`, {
          credentials: "include"
        })

        if (!res.ok) throw new Error("Erreur lors du fetch")

        const data = await res.json()
        setUserData(data)

      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [id])

  if (loading) return <div>Chargement...</div>
  if (error) return <div>Erreur: {error}</div>
  if (!userData) return <div>Aucune donnée</div>

  return (
    <div>
      <h1>
        {userData.is_user ? "Votre profil" : "Page de " + userData.username}
      </h1>

      <h2>Animes:</h2>
      <ul>
        {userData.animes.map(a => (
          // <li key={a.id}>
          //   {a.title} ({a.episodes} épisodes)
          // </li>
          <AnimeEntry anime={a} isUser={userData.is_user} key={a.mal_id}></AnimeEntry>
        ))}
      </ul>

      {userData.is_user && (
        <>
          <h2>Favoris:</h2>
          <ul>
            {/* {userData.favorites.map(a => (
              <li key={a.id}>{a.title}</li>
            ))} */}
          </ul>
        </>
      )}
    </div>
  )
}