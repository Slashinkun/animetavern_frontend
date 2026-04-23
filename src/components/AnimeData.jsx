

export default function AnimeInfo({ anime }) {

  const parseNames = (items) => {
    if (!items) return "";
    return items.map(item => item.name).join(", ");
  };

  const isAiring = (status) => {
    return status ? "Currently Airing" : "Finished Airing";
  };

  return (
    <div className="flex flex-col col-span-1 mx-auto px-2 py-2">
      <div><strong>Type</strong> : {anime.type}</div>
      <div><strong>Episodes</strong> : {anime.episodes}</div>
      <div><strong>Status</strong> : {isAiring(anime.airing)}</div>
      <div><strong>Aired</strong> : {anime.aired?.string}</div>
      <div><strong>Score</strong> : {anime.score}</div>
      <div><strong>Popularity</strong> : {anime.popularity}</div>
      <div><strong>Rating</strong> : {anime.rating}</div>
      <div><strong>Studios</strong> : {parseNames(anime.studios)}</div>
      <div><strong>Producers</strong> : {parseNames(anime.producers)}</div>
      <div><strong>Genre</strong> : {parseNames(anime.genres)}</div>
      <div><strong>Source</strong> : {anime.source}</div>
    </div>
  );
}