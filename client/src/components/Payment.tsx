import { useAppContext } from "../context/AppContext";
import { sendPayment } from "../api/paymentApi";
import { useState } from "react";

export default function Payment() {
  const { cartItems, clearCart } = useAppContext();
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const result = await sendPayment(cartItems);
      console.log("Wynik z backendu:", result);
      setMessage(`Transakcja zaakceptowana. Do zapłaty: ${result.total} zł`);
      clearCart();
    } catch (err) {
      setMessage("Błąd podczas płatności.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Płatność</h1>
      {cartItems.length === 0 && <p>Koszyk jest pusty</p>}
      {cartItems.length > 0 && (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                Produkt ID: {item.productId} – Ilość: {item.quantity}
              </li>
            ))}
          </ul>
          <button onClick={handleSubmit}>Zapłać</button>
        </>
      )}
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}
