
import { Link } from "react-router-dom";

export default function SearchEntry({ anime }) {

    return (
        <div className="flex items-center gap-4 hover:bg-gray-400 border border-t-gray-500 border-b-gray-500 " >

            <img src={anime.images.jpg.image_url} alt="" className="w-20 h-25 object-cover rounded-md p-2" />

            <div className="flex flex-col">
                <Link to={`/anime/${anime.mal_id}`} className="mb-2 cursor-pointer">
                    <p className="font-semibold">{anime.title_english || anime.title}</p>
                </Link>
                <p>{anime.type}</p>
                <p>{anime.episodes || "?"} eps</p>
            </div>
        </div>
    )

}