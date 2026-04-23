import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AnimeHeader from "../components/AnimeHeader";
import AnimeData from "../components/AnimeData";


export default function AnimePage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        console.log("CALLING API WITH COOKIE:", document.cookie)
        const res = await fetch(`http://localhost:8080/anime/${id}`, {
        credentials: "include"
        });
        const json = await res.json();

        setData(json);
      } catch (err) {
        console.error("Erreur fetch anime:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!data) return <p>Anime introuvable</p>;

  const anime = data.anime.data;

  const addAnimeToList = async () => {
  await fetch("http://localhost:8080/user/anime", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ anime_id: anime.mal_id })
  });
  };

  return (
    <div>
      <AnimeHeader anime={anime}></AnimeHeader>

      {!data.isInList && (<button onClick={addAnimeToList} className="border">Add to list</button>)}

      
      <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">

        <div className="col-span-1">
          <AnimeData anime={anime} />
        </div>

        {/* <div className="col-span-2">
          <AnimeReviews animeId={anime.mal_id} />
        </div> */}

</div>


      
      

     
      
    </div>
  );
}