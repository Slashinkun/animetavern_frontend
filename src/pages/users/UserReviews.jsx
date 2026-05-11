import { useEffect,useState } from "react"
import { useParams,useOutletContext } from "react-router-dom"
import UserReview from "../../components/UserReview"


export default function UserReviews(){

    const {id} = useParams()
    const { userData } = useOutletContext()
    const [userReviews,setUserReviews] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserReviews = async () => {
            try {
                const res = await fetch(`http://localhost:8080/user/${id}/reviews`,{
                    credentials: "include"
                })
                if (!res.ok) throw new Error("Error during fetch")
                const reviews =  await res.json()
                setUserReviews(reviews)
            } catch (error) {
                setError(err.message)
            } finally {
                 setLoading(false)
            }
        }

        fetchUserReviews()
    },[id])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!userReviews) return <div>No data</div>

    return (
        <div>
            <ul>
                {userReviews.reviews.map (r => (
                    <UserReview data={r} isUser={userData.is_user} key={r.id}></UserReview>
                ))}
            </ul>
        </div>
    )
}