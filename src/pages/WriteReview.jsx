import { use, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function WriteReview() {

    const { id } = useParams()
    const [content, setContent] = useState("")
    const [rating, setRating] = useState("")
    const navigate = useNavigate();

    const sendReview = async () => {

        try {
            const res = await fetch(`http://localhost:8080/anime/${id}/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ anime_id: Number(id), content, rating })
            })
            if (!res.ok) {
                const text = await res.text();
                alert("Error while adding review : " + text);
                return;
            }

            navigate(`/anime/${id}`);

        } catch (err) {
            console.error(err);
            alert("Server error");
        }


    }

    return (
        <div className="p-2">
            <textarea value={content} maxLength={2000} onChange={(e) => setContent(e.target.value)} className="w-2xl h-100 border" />
            ⭐
            <input
                type="number"
                min="1"
                max="10"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border"
            />/10
            <p>{content.length}/2000</p>
            <button onClick={sendReview} className="border">Send</button>
        </div>
    )
}