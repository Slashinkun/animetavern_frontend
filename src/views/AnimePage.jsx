
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/animepage.css"
import { useNavigate } from "react-router-dom";

export default function Anime() {
   const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`http://localhost:8080/anime/${id}`,{
      credentials: "include"
    })
      .then(res => {
        if(!res.ok){
          navigate("/notfound")
        }
      })
      .then(data => setAnime(data))
      .catch(navigate("/notfound"));
  }, [id]);

  if (!anime) return <div>Chargement...</div>;

  return (
    <div className="container">
      <img src={anime.data.images.jpg.image_url}></img>
      <h1>{anime.data.title}</h1>
      <p>{anime.data.synopsis}</p>
      
    </div>
  );
}