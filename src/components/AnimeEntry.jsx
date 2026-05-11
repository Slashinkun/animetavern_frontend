import { useState } from "react";
import { Link } from "react-router-dom";


export default function AnimeEntry({anime, isUser, onRemove}){

    
    
    const handleRemove = async () => {
        try {
            const res = await fetch(`http://localhost:8080/user/anime/${anime.mal_id}`, {
                method: "DELETE",
                credentials: "include"
                });

            if (!res.ok) {
            console.error(await res.text());
            return;

            }
            onRemove(anime.mal_id);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="flex justify-between items-center border px-2 hover:bg-gray-400 p-2">
            <div className="flex items-center gap-4">
                <img src={anime.image_url} alt="" className="w-20 h-25 object-cover rounded p-2" />
                <Link to={`/anime/${anime.mal_id}`}>
                <p className="wrap-break-word font-semibold" >{anime.title}</p>
                </Link>
                <span>{anime.viewed_episodes}/{anime.episodes}</span>
                <p>{anime.status}</p>
                {isUser && (
                    <div className="flex gap-2">
                    <button className="border w-10">+</button>
                    {anime.viewed_episodes > 0 && (
                        <button className="border w-10">-</button>
                    )}
                    
                </div>
                )}

                {isUser && (
                    <button 
                className="border p-2 rounded-xl bg-red-600 font-bold hover:bg-red-800 text-white"
                onClick={handleRemove}
                
                >
                    Remove
                </button>
                )}
                
            </div>
        </div>
    )
}