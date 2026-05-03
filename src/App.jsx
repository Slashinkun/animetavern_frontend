import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link,NavLink } from "react-router-dom";

import Home from "./pages/Home";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import LogoutButton from "./components/LogoutButton";
import AnimePage from "./pages/AnimePage";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import UserPage from "./pages/users/UserPage";
import WriteReview from "./pages/WriteReview";
import UserReviews from "./pages/users/UserReviews";
import UserProfile from "./pages/users/UserProfile";
import UserFavorites from "./pages/users/UserFavorites";

function App() {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  // check session
  useEffect(() => {
    fetch("http://localhost:8080/me", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("not logged");
        return res.json();
      })
      .then((data) => {
        setUserId(data.id);
        setUsername(data.username);
      })
      .catch(() => {
        setUserId(null);
        setUsername("");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const isLoggedIn = !!userId;

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
        
        <div className="flex gap-4">
          <Link to="/">AnimeTavern</Link>

          
          <Link to="/search">Search</Link>
          {isLoggedIn && (
            <Link to={`/user/${userId}`}>Profile</Link>
          )}
          
        </div>

        <div className="flex gap-4 items-center">
          {!isLoggedIn && (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          )}
          {isLoggedIn && userId && (
          <>
            
            <LogoutButton
              setUserId={setUserId}
              setUsername={setUsername}
            />
          </>
        )}
        </div>
        

      </nav>

      <div className="p-2">
        {isLoggedIn ? (
          <p>Logged in as {username}</p>
        ) : (
          <p>Guest</p>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/login"
          element={
            <LoginForm
              setUserId={setUserId}
              setUsername={setUsername}
            />
          }
        />
        <Route path="/anime/:id" element={<AnimePage isLoggedIn={isLoggedIn} />} />
        <Route path="/search" element={<Search />} />
        
        <Route path="/user/:id" element={<UserPage />}>
          <Route index element={<UserProfile />} />
          <Route path="favorites" element={<UserFavorites />} />
          <Route path="reviews" element={<UserReviews />} />
        </Route>
        
        <Route path="/anime/write/:id" element={<WriteReview/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;