import { useOutletContext } from "react-router-dom"
import AnimeUserFavorite from "../../components/AnimeUserFavorite"
export default function UserFavorites() {
  const { userData } = useOutletContext()

  const favorites = userData.favoriteAnimes

  return (
    <div>
      <h2>Favorites:</h2>

      <ul className="flex flex-col gap-3">
        {favorites.map(a => (
          <AnimeUserFavorite key={a.mal_id} anime={a} />
        ))}
      </ul>
    </div>
  );
}