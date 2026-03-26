import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './views/Home';
import RegisterForm from './views/RegisterForm';
import LoginForm from './views/LoginForm';
import LogoutButton from './components/LogoutButton';
import AnimePage from './views/AnimePage';
import NotFound from './views/NotFound';

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
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/notfound' element={<NotFound />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/anime/:id' element={<AnimePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App