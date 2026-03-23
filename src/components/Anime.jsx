
import { useState, useEffect } from "react";

export default function Anime({ id }) {
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/anime/${id}`)
      .then(res => res.json())
      .then(data => setAnime(data))
      .catch(console.error);
  }, [id]);

  if (!anime) return <div>Chargement...</div>;

  return (
    <div>
      <h1>{anime.data.title}</h1>
      <p>{anime.data.synopsis}</p>
    </div>
  );
}