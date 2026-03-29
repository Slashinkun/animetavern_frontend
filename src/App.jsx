import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './views/Home';
import RegisterForm from './views/RegisterForm';
import LoginForm from './views/LoginForm';
import LogoutButton from './components/LogoutButton';
import AnimePage from './views/AnimePage';
import NotFound from './views/NotFound';
import Search from './views/Search';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  useEffect(() => {
    const tokenExists = document.cookie.includes("token");
    setIsLoggedIn(tokenExists);
  }, []);

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Accueil</Link>
        {!isLoggedIn && <Link to="/register">Register</Link>}
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {isLoggedIn && <LogoutButton setIsLoggedIn={setIsLoggedIn}></LogoutButton>}
        <Link to="/search">Search</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/anime/:id" element={<AnimePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App