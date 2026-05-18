import { useState } from "react";
import { Link } from "react-router-dom";


export default function AnimeEntry({ anime, isUser, onRemove, onUpdateEpisodes }) {

    const [isEditing, setEditing] = useState(false)
    const [status, setStatus] = useState(anime.status);

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


    const updateEpisodes = async (delta) => {
        try {
            const res = await fetch(`http://localhost:8080/user/anime/${anime.mal_id}/episodes`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ delta })
                }
            )

            if (!res.ok) {
                console.error(await res.text());
                return;
            }

            const data = await res.json();


            onUpdateEpisodes(anime.mal_id, data);


        } catch (err) {
            console.error(err)
        }
    }

    const updateStatus = async () => {
        try {
            const res = await fetch(
                `http://localhost:8080/user/anime/${anime.mal_id}/status`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status })
                })

            if (!res.ok) {
                console.error(await res.text());
                return;
            }

            onUpdateEpisodes(anime.mal_id, {
                ...anime,
                status
            });

            setEditing(false);

        } catch (err) {
            console.error(err);
        }
    }


    return (
        <div className="flex justify-between items-center border px-2 hover:bg-gray-400 p-2">
            <div className="flex items-center gap-4">
                <img src={anime.image_url}
                    alt={anime.title}
                    className="w-20 h-25 object-cover rounded-md shadow"
                />

                <div className="flex flex-col">
                    <Link to={`/anime/${anime.mal_id}`}>
                        <p className="wrap-break-word font-semibold" >{anime.title}</p>
                    </Link>

                    <span>{anime.viewed_episodes}/{anime.episodes}</span>

                    <span className="mt-1 text-xs text-white px-2 py-1 rounded bg-gray-700 w-fit">
                        {status}
                    </span>

                </div>


            </div>



            <div className="flex items-center gap-2">
                {isUser && (
                    <div className="flex items-center gap-1 mr-2">
                        <button
                            className="border w-10 disabled:bg-gray-700 hover:bg-gray-500"
                            onClick={() => updateEpisodes(1)}
                            disabled={anime.viewed_episodes >= (anime.episodes ?? 0)}
                        >
                            +
                        </button>

                        <button
                            className="border w-10 disabled:bg-gray-700  hover:bg-gray-500"
                            onClick={() => updateEpisodes(-1)}
                            disabled={anime.viewed_episodes <= 0}
                        >
                            -
                        </button>
                    </div>
                )}

                {isEditing ? (
                    <div>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}
                            className="border rounded px-2 py-1"
                        >
                            <option value="PLANNING">PLANNING</option>
                            <option value="WATCHING">WATCHING</option>
                            <option value="FINISHED">FINISHED</option>
                        </select>

                        <button onClick={updateStatus}
                            className="border rounded p-1 bg-green-500 hover:bg-green-600"
                        >
                            Confirm edit
                        </button>

                        <button onClick={() => setEditing(false)}
                            className="border rounded p-1 bg-red-500 hover:bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button onClick={() => setEditing(true)}
                        className="border rounded p-1 bg-green-500 hover:bg-green-600"
                    >
                        Edit
                    </button>
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