import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      <Link to="/">Home</Link>
      {token && <>
        <Link to="/products">Produkty</Link>
        <Link to="/cart">Koszyk</Link>
        <Link to="/payment">Płatność</Link>
        <button onClick={handleLogout}>Wyloguj</button>
      </>}
      {!token && <>
        <Link to="/login">Logowanie</Link>
        <Link to="/register">Rejestracja</Link>
      </>}
    </nav>
  );
}

const navStyle = {
  display: "flex",
  gap: "1rem",
  padding: "1rem",
  background: "#f0f0f0",
};
