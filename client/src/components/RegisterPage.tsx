import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        alert("Zarejestrowano!");
        navigate("/login");
      } else {
        const data = await res.json();
        alert(data.error || "Błąd rejestracji");
      }
    } catch {
      alert("Błąd połączenia");
    }
  };

  return (
    <div style={container}>
      <h2>Rejestracja</h2>
      <form onSubmit={handleRegister} style={formStyle}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Hasło" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Zarejestruj</button>
      </form>
      <p>
        Masz już konto? <a href="/login">Zaloguj się</a>
      </p>
    </div>
  );
}

const container = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  gap: "1rem",
};

const formStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "0.5rem",
  width: "200px",
};
