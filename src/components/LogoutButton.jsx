import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutButton({ setIsLoggedIn }) {
  
  const navigate = useNavigate();

  const handleLogout = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include"
    });

    if (res.ok) {
      setIsLoggedIn(false);
      navigate("/"); // redirige vers home
    } else {
      const text = await res.text();
      console.error("Erreur logout :", text);
    }
  } catch (err) {
    console.error(err);
  }
};

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}