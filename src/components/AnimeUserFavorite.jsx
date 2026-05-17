import { Link } from "react-router-dom";

export default function AnimeUserFavorite({ anime }) {

    return (
        <div className="border rounded p-3 flex gap-4 items-center">

            <img
                src={anime.image_url}
                alt={anime.title}
                className="w-20 h-28 object-cover rounded"
            />

            <Link to={`/anime/${anime.mal_id}`}>
                <p className="font-semibold hover:underline">
                    {anime.title}
                </p>
            </Link>

        </div>
    )
}