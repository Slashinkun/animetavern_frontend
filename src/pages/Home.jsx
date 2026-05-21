import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";
export default function Home({ isLoggedIn }) {
    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTopAnime = async () => {
        try {
            const res = await fetch("https://api.jikan.moe/v4/top/anime");
            const data = await res.json();
            setAnimes(data.data.slice(0, 6));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = "AnimeTavern - Home"


        fetchTopAnime();
    }, []);

    return (
        <div className="min-h-screen bg-gray-950 text-white p-6">

            {/* HEADER */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-2">AnimeTavern</h1>
                <p className="text-gray-400">
                    Track, discover, and review your anime.
                </p>

                <div className="flex justify-center gap-4 mt-6">
                    <Link
                        to="/search"
                        className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Search
                    </Link>

                    {!isLoggedIn && (
                        <Link
                            to="/login"
                            className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600"
                        >
                            Login
                        </Link>
                    )
                    }
                </div>
            </div>

            {/* SECTION TOP ANIME */}
            <h2 className="text-2xl font-semibold mb-4">Top Animes</h2>

            {loading ? (
                <p className="text-gray-400">Loading...</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {animes.map((anime) => (
                        <Link
                            key={anime.mal_id}
                            to={`/anime/${anime.mal_id}`}
                            className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition"
                        >
                            <img
                                src={anime.images.jpg.image_url}
                                alt={anime.title_english}
                                className="w-full h-40 object-cover"
                            />

                            <div className="p-2">
                                <p className="text-sm font-medium truncate">
                                    {anime.title_english}
                                </p>

                                <p className="text-xs text-gray-400">
                                    ⭐ {anime.score ?? "N/A"}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}