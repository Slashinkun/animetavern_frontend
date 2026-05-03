import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutButton({ setUserId,setUsername }) {
  
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

    setUserId(null);
    setUsername("");
    navigate("/");
  } catch (err) {
    console.error(err);
  }
};

  return (
    <button onClick={handleLogout} 
    className="border p-2 rounded-xl bg-red-600 font-bold hover:bg-red-800">
      Logout
    </button>
  );
}