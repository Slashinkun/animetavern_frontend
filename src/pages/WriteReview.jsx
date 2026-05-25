import { use, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/config";
export default function WriteReview({ showToast }) {

    const { id } = useParams()
    const [content, setContent] = useState("")
    const [rating, setRating] = useState("")
    const navigate = useNavigate();

    const sendReview = async () => {
        try {
            const res = await fetch(`${API_URL}/anime/${id}/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ content, rating })
            })
            if (!res.ok) {
                const text = await res.text();
                showToast(text, "error")
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
            <h2 className="text-xl font-bold">Write a review</h2>
            <textarea value={content} maxLength={2000} onChange={(e) => setContent(e.target.value)} className="w-2xl h-100 border p-2" />
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