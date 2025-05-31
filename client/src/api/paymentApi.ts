import axios from "axios";
import { CartItem } from "../context/AppContext";

export const sendPayment = async (cartItems: CartItem[]) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    "http://localhost:8080/payment",
    cartItems,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
