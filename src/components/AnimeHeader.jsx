export default function AnimeHeader({ anime }) {
  return (
    <div className="p-4 rounded">

      {/* TITRE */}
      <div className="mb-4 border bg-gray-500 rounded p-2">
        <h3 className="text-2xl text-gray-200">
          {anime.title_english}
        </h3>
        <h4 className="text-gray-300">
          {anime.title}
        </h4>
      </div>

      
      <div className="grid grid-cols-3 gap-4">

        {/* IMAGE */}
        <div className="col-span-1 flex justify-center">
            <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="col-span-1 text-gray-100 line-clamp-6"
        />
        </div>
        

        {/* SYNOPSIS */}
        <p className="col-span-2 whitespace-pre-line max-h-80 overflow-y-auto ">
          {anime.synopsis}
        </p>

      </div>

    </div>
  );
}