
import { useOutletContext } from "react-router-dom"
import AnimeEntry from "../../components/AnimeEntry"
export default function UserProfile(){
    const { userData } = useOutletContext()
    return (
        <div>
        <h2>Animes:</h2>
        <ul>
          {userData.animes.map(a => (
            // <li key={a.id}>
            //   {a.title} ({a.episodes} épisodes)
            // </li>
            <AnimeEntry anime={a} isUser={userData.is_user} key={a.mal_id}></AnimeEntry>
          ))}
        </ul>

        
    </div>
    )

}