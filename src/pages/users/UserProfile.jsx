
import { useOutletContext } from "react-router-dom"
import AnimeEntry from "../../components/AnimeEntry"
export default function UserProfile(){
    const { userData, setUserData } = useOutletContext()
    return (
        <div>
        <h2>Animes:</h2>
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
            }} />



            
          ))}
        </ul>

        
    </div>
    )

}