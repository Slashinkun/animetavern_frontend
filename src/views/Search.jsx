import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query) return;

    try {
      const res = await fetch(
        "http://localhost:8080/search?query=" + encodeURIComponent(query)
      );
      const data = await res.json();

      // Supprime les doublons par mal_id
      const uniqueAnimes = Array.from(new Map(data.data.map(a => [a.mal_id, a])).values());

      // Filtre pour garder seulement les titres qui contiennent la query
      const filteredAnimes = uniqueAnimes.filter(anime =>
        anime.title.toLowerCase().includes(query.toLowerCase())
      );

      setResults(filteredAnimes);
    } catch (err) {
      console.error("Erreur fetch Jikan:", err);
      setResults([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher un anime..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Chercher</button>

      <div style={{ marginTop: "20px" }}>
        {results.length === 0 && <p>Aucun résultat</p>}

        {results.map((anime, index) => (
          <div
            key={`${anime.mal_id}-${index}`}
            style={{ marginBottom: "10px", cursor: "pointer" }}
            onClick={() => navigate(`/anime/${anime.mal_id}`)}
          >
            <img
              src={anime.images.jpg.small_image_url}
              alt={anime.title}
              width={50}
              style={{ marginRight: "10px" }}
            />
            <span>
              {anime.title_english || anime.title} ({anime.episodes || "?"} eps)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}