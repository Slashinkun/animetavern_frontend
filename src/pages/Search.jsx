import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchEntry from "../components/SearchEntry";
import { Link } from "react-router-dom";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query) return;

    try {
      const res = await fetch(
        "http://localhost:8080/search?query=" + encodeURIComponent(query)
      );

      setHasSearched(true);
      const data = await res.json();

      // Supprime les doublons par mal_id
      const uniqueAnimes = Array.from(new Map(data.data.map(a => [a.mal_id, a])).values());

      // Filtre pour garder seulement les titres qui contiennent la query
      const filteredAnimes = uniqueAnimes.filter(anime => {
        const q = query.toLowerCase()

        return (
          anime.title?.toLowerCase().includes(q) ||
          anime.title_english?.toLowerCase().includes(q)
        )
      }

      );

      setResults(filteredAnimes);
    } catch (err) {
      console.error("Error fetch Jikan:", err);
      setResults([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search an anime..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className=" border border-gray rounded m-2"
      />
      <button onClick={handleSearch} className="border rounded-xs">Search</button>

      <div style={{ marginTop: "20px" }}>
        {hasSearched && results.length === 0 && <p>No results</p>}

        {results.map((anime, index) => (

          <SearchEntry anime={anime} key={anime.mal_id}></SearchEntry>
        ))}
      </div>
    </div>
  );
}