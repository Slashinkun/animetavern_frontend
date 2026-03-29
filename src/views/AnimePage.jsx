import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AnimePage() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:8080/anime/${id}`);
        const data = await res.json();
        setAnime(data.anime);
      } catch (err) {
        console.error("Erreur fetch anime:", err);
        setAnime(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!anime) return <p>Anime introuvable</p>;

  return (
    <div>
      <h1>{anime.data.title_english || anime.data.title}</h1>
      <img src={anime.data.images.jpg.large_image_url} alt={anime.data.title} />
      <p>{anime.data.synopsis}</p>
      <p>Episodes : {anime.data.episodes || "?"}</p>
      <p>Score : {anime.data.score || "?"}</p>
      <p>Type : {anime.data.type}</p>
    </div>
  );
}