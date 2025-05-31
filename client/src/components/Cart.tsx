import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { saveCart } from "../api/saveCartApi";
import { useState } from "react";

export default function Cart() {
  const { cartItems, increaseQuantity, decreaseQuantity, clearCart } = useAppContext();
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    try {
      const result = await saveCart(cartItems);
      setMessage("Koszyk zapisany (ID: " + result.cart_id + ")");
    } catch {
      setMessage("Błąd zapisu koszyka");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Koszyk</h1>
      {cartItems.length === 0 && <p>Koszyk jest pusty</p>}
      {cartItems.map((item, index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <p>Produkt ID: {item.productId}</p>
          <p>Ilość: {item.quantity}</p>
          <button onClick={() => increaseQuantity(item.productId)}>+</button>
          <button onClick={() => decreaseQuantity(item.productId)}>-</button>
        </div>
      ))}
      {cartItems.length > 0 && (
        <Link to="/payment">
          <button>Przejdź do płatności</button>
        </Link>
      )}
      <div style={{ marginTop: "1rem" }}>
        <button onClick={clearCart}>Wyczyść koszyk</button>
        <button onClick={handleSave} style={{ marginLeft: "1rem" }}>
          Zapisz koszyk w bazie
        </button>
      </div>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}
