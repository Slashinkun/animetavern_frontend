import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/config";
export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{1,255}\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  const isValid = password.length >= 8 && username.length >= 5 && validateEmail(email);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "AnimeTavern - Sign in"
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        email: email,
        username: username,
        password: password
      })
    })
      .then(res => res.text())
      .then(data => navigate("/"))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 m-2 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sign in</h2>

      <label className="block mb-2 font-semibold">Email</label>
      <input
        type="text"
        placeholder=""
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="block mb-2 font-semibold">Nickname</label>
      <input
        type="text"
        placeholder=""
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="block mb-2 font-semibold">Password</label>
      <input
        type="password"
        placeholder=""
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button type="submit" disabled={!isValid} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-600" >Sign in</button>
    </form>
  );
}