import { useOutletContext } from "react-router-dom"
export default function UserFavorites() {
  const { userData } = useOutletContext()



  return (
    <div>


      <h2>Favorites:</h2>

      Not implemented yet

      <ul>
        {/* {userData.favorites.map(a => (
                <li key={a.id}>{a.title}</li>
              ))} */}
      </ul>


    </div>
  )
}