import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AnimeHeader from "../components/AnimeHeader";
import AnimeData from "../components/AnimeData";


export default function AnimePage({ isLoggedIn }) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        
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

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Anime not found</p>;

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
    <div className="w-full p-4">

  
    <AnimeHeader anime={anime} />

  {/* ACTIONS */}
   <div className="flex gap-2 mt-3">
  
    {!data.isInList && (
      <button
        onClick={addAnimeToList}
        className="border px-2 py-1 rounded"
      >
        Add to list
      </button>
    )}

    {isLoggedIn && (
      <Link to={`/anime/write/${id}`}>
        <button className="border px-2 py-1 rounded hover:bg-gray-500">
          Write a review
        </button>
      </Link>
    )}

  </div>

  

  {/* BODY */}
  <div className="grid grid-cols-3 gap-6 mt-4">

    {/* LEFT */}
    <div className="col-span-1 flex flex-col gap-4">
      <AnimeData anime={anime} />
    </div>

    {/* RIGHT */}
    <div className="col-span-2">
      
     
    </div>

  </div>
</div>
  );
}