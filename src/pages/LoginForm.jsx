import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUserId, setUsername }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{1,255}\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isValid = password.length >= 8 && validateEmail(email);

  useEffect(() => {
    document.title = "AnimeTavern - Login"
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1) login → crée cookie côté backend
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ email, password }),
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text();
        alert("Login error : " + text);
        return;
      }

      // 2) récupère user réel via /me 
      const meRes = await fetch("http://localhost:8080/me", {
        method: "GET",
        credentials: "include",
      });

      if (!meRes.ok) {
        throw new Error("Cannot found the user");
      }

      const user = await meRes.json();

      // 3) mise à jour state global
      setUserId(user.id);
      setUsername(user.username);

      // 4) redirect home
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 m-2 bg-white rounded shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <label className="block mb-2 font-semibold">Email</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 rounded p-2 mb-4"
      />

      <label className="block mb-2 font-semibold">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-300 rounded p-2 mb-4"
      />

      <button
        type="submit"
        disabled={!isValid}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500"
      >
        Login
      </button>
    </form>
  );
}