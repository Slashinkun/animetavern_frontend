import { Link } from "react-router-dom";

export default function AnimeReview({ review }) {
  return (
    <div className="border rounded p-3">

      <div className="flex justify-between items-center">

        <Link
          to={`/user/${review.user_id}`}
          className="font-semibold hover:underline"
        >
          User #{review.user_id}
        </Link>

        <span>
          ⭐ {review.rating}/10
        </span>

      </div>

      <p className="mt-2 whitespace-pre-line">
        {review.content}
      </p>


    </div>
  );
}