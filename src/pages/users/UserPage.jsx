import { useState, useEffect } from "react"
import { useParams, NavLink, Outlet } from "react-router-dom"
import { API_URL } from "../utils/config";
import AnimeEntry from "../../components/AnimeEntry"

export default function UserPage() {
  const { id } = useParams()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${API_URL}/user/${id}`, {
          credentials: "include"
        })

        if (!res.ok) throw new Error("Error during fetch")

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

  useEffect(() => {
    if (userData) {
      document.title = `AnimeTavern - ${userData.username} s'profile`
    }

  }, [userData])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!userData) return <div>No data</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-1">
        {userData.is_user ? "Your profile" : `${userData.username}'s profile`}
      </h1>

      <div className="flex gap-2 border-b mb-4 bg-gray-900 text-white ">
        <NavLink to=""
          end
          className={({ isActive }) =>
            `px-4 py-2 rounded-t transition-colors ${isActive
              ? "bg-gray-700 font-semibold"
              : "hover:bg-gray-800 text-gray-300"
            }`
          }
        >
          Animes
        </NavLink>
        <NavLink to="favorites"
          className={({ isActive }) =>
            `px-4 py-2 rounded-t transition-colors ${isActive
              ? "bg-gray-700 font-semibold"
              : "hover:bg-gray-800 text-gray-300"
            }`
          }
        >
          Favorites
        </NavLink>
        <NavLink to="reviews"
          className={({ isActive }) =>
            `px-4 py-2 rounded-t transition-colors ${isActive
              ? "bg-gray-700 font-semibold"
              : "hover:bg-gray-800 text-gray-300"
            }`
          }
        >
          Reviews
        </NavLink>
      </div>

      <Outlet context={{ userData, setUserData }} />

    </div>
  )
}