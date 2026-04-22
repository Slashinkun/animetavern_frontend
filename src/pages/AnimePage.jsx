import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AnimePage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);

        const res = await fetch(`http://localhost:8080/anime/${id}`);
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

  return (
    <div>
      <h1>{anime.title_english || anime.title}</h1>

      <img
        src={anime.images.jpg.large_image_url}
        alt={anime.title}
      />

      <p>{anime.synopsis}</p>
      <p>Episodes : {anime.episodes || "?"}</p>
      <p>Score : {anime.score || "?"}</p>
      <p>Type : {anime.type}</p>
    </div>
  );
}