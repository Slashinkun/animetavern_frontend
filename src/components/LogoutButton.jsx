import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutButton({ setIsLoggedIn }) {
  
  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    const res = await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include"
    });

    if (!res.ok) {
      console.error(await res.text());
      return;
    }

    setIsLoggedIn(false);
    navigate("/");
  } catch (err) {
    console.error(err);
  }
};

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}