import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AnimeHeader from "../components/AnimeHeader";
import AnimeData from "../components/AnimeData";
import AnimeReview from "../components/AnimeReview";
import NotFound from "./NotFound";


export default function AnimePage({ isLoggedIn, showToast }) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);

        const res = await fetch(`http://localhost:8080/anime/${id}`, {
          credentials: "include"
        });

        if (res.status === 404) {
          setNotFound(true);
          return;
        }

        if (!res.ok) throw new Error("Fetch error");

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

  useEffect(() => {
    if (data) {
      document.title = `AnimeTavern - ${data.title}`;
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (notFound) return <NotFound />;
  if (!data) return <p>Anime not found</p>;

  const anime = data.anime.data;

  const addAnimeToList = async () => {
    const res = await fetch("http://localhost:8080/user/anime", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ anime_id: anime.mal_id })
    });

    if (!res.ok) {
      const text = await res.text();
      showToast(text, "error");
      return;
    }

    setData(prev => ({
      ...prev,
      isInList: true
    }));

    showToast("Anime added into list ✔", "success");

  };


  const updateFavorites = async (status) => {
    try {
      const res = await fetch(
        `http://localhost:8080/user/anime/${anime.mal_id}/favorite`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ favorite: status })
        }
      );

      if (!res.ok) {
        const text = await res.text();
        showToast(text, "error");
        return;
      }

      setData(prev => ({
        ...prev,
        isFavorite: status
      }));

      status
        ? showToast("Anime added into favorites ✔", "success")
        : showToast("Anime removed from favorites ✔", "success");

    } catch (err) {
      console.error(err);
      showToast("Server error", "error");
    }
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

        {
          isLoggedIn && !data.isFavorite && (
            <button className="border rounded px-2 py-1 bg-pink-400 hover:bg-pink-300"
              onClick={() => updateFavorites(true)}
            >
              Add to favorites
            </button>
          )
        }

        {isLoggedIn && data.isFavorite && (
          <button className="border rounded px-2 py-1 bg-pink-400 hover:bg-pink-300"
            onClick={() => updateFavorites(false)}
          >
            Remove from favorites
          </button>
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

          <h2 className="text-xl font-semibold mb-4">
            Reviews
          </h2>

          {data.reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {data.reviews.map(r => (
                <AnimeReview
                  key={r.id}
                  review={r}
                />
              ))}
            </ul>
          )}

        </div>

      </div>
    </div>
  );
}