import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/products", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setProducts(res.data);
      });
  }, []);

  return (
    <div>
      <h1>Produkty</h1>
      {products.map((p) => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <p>Cena: {p.price} zł</p>
          <button
            onClick={() => {
              console.log("Klik: dodano produkt do koszyka:", p.id);
              addToCart({ productId: p.id, quantity: 1 });
            }}
          >
            Dodaj do koszyka
          </button>
        </div>
      ))}
      <button onClick={() => navigate("/cart")}>Przejdź do koszyka</button>
    </div>
  );
}
