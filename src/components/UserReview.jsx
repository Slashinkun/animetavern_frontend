import { Link } from "react-router-dom";

export default function UserReview({ data, isUser }) {
  return (
    <div className="border rounded p-3 mb-2 flex gap-3">

      {/* image anime */}
      <img
        src={data.anime_image}
        alt={data.anime_title}
        className="w-16 h-20 object-cover rounded"
      />

      {/* contenu */}
      <div className="flex-1">

        <div className="flex justify-between">
          <Link to={`/anime/${data.anime_id}`}>
          <p className="font-semibold">
            {data.anime_title}
          </p>
          </Link>

          {data.rating !== null && (
            <span>⭐ {data.rating}/10</span>
          )}
        </div>

        <p className="text-gray-700 text-sm mt-1">
          {data.content}
        </p>

        {isUser && (
          <button>Delete</button>
        )}
        

      </div>
    </div>
  );
}