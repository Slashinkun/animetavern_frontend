

export default function AnimeInfo({ anime }) {

  const parseNames = (items) => {
    if (!items) return "";
    return items.map(item => item.name).join(", ");
  };

  const isAiring = (status) => {
    return status ? "Currently Airing" : "Finished Airing";
  };

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
      <span className="font-semibold">Type</span> <span>{anime.type}</span>
      <span className="font-semibold">Episodes</span> <span>{anime.episodes}</span>
      <span className="font-semibold">Status</span> <span>{isAiring(anime.airing)}</span>
      <span className="font-semibold">Aired</span> <span>{anime.aired?.string}</span>
      <span className="font-semibold">Score</span> <span>{anime.score}</span>
      <span className="font-semibold">Popularity</span> <span>{anime.popularity}</span>
      <span className="font-semibold">Rating</span> <span>{anime.rating}</span>
      <span className="font-semibold">Studios</span> <span>{parseNames(anime.studios)}</span>
      <span className="font-semibold">Producers</span> <span>{parseNames(anime.producers)}</span>
      <span className="font-semibold">Genre</span> <span>{parseNames(anime.genres)}</span>
      <span className="font-semibold">Source</span> <span>{anime.source}</span>
    </div>
  );
}