export default function AnimeHeader({anime}){
    return (
        <div>
            <div className="bg-gray-500">
                <h3 className="text-2xl text-gray-200">{anime.title_english}</h3>
                <h4>{anime.title}</h4>
            </div>
            <div className="grid grid-cols-3 py-2 gap-2">
                <img src={anime.images.jpg.image_url} 
                     alt={anime.title_english}
                     className="mx-auto w-50 h-auto object-cover col-span-1 rounded-sm" />
            
                <p className="col-span-2 whitespace-pre-line">{anime.synopsis}</p>
            </div>
                
        </div>

    )
}