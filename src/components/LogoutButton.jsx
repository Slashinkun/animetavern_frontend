import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/config";
export default function LogoutButton({ setUserId, setUsername }) {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_URL}/logout`, {
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