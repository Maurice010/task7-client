import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newToken = params.get("token");
    if (newToken) {
      localStorage.setItem("token", newToken);
      window.history.replaceState({}, "", "/");
    }
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Witaj!</h1>
      {token ? (
        <>
          <p>Jesteś zalogowany.</p>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Wyloguj
          </button>
        </>
      ) : (
        <p>Nie jesteś zalogowany.</p>
      )}
    </div>
  );
}
