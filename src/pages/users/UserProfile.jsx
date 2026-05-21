
import { useOutletContext } from "react-router-dom"
import AnimeEntry from "../../components/AnimeEntry"
export default function UserProfile() {
  const { userData, setUserData } = useOutletContext()
  return (
    <div>

      <ul>
        {userData.animes.map(a => (

          <AnimeEntry anime={a}
            isUser={userData.is_user}
            key={a.mal_id}
            onRemove={(animeId) => {
              setUserData(prev => ({
                ...prev,
                animes: prev.animes.filter(
                  anime => anime.mal_id != animeId
                )
              }))

            }}

            onUpdateEpisodes={(animeId, data) => {
              setUserData(prev => ({
                ...prev,
                animes: prev.animes.map(anime =>
                  anime.mal_id === animeId
                    ? {
                      ...anime,
                      viewed_episodes: data.viewed_episodes,

                    }
                    : anime
                )
              }));
            }}

            onUpdateStatus={(animeId, data) => {
              setUserData(prev => ({
                ...prev,
                animes: prev.animes.map(anime =>
                  anime.mal_id === animeId
                    ? {
                      ...anime,
                      status: data.status
                    }
                    : anime
                )
              }));
            }}




          />




        ))}
      </ul>


    </div>
  )

}