import axios from "axios";
import { CartItem } from "../context/AppContext";

export const saveCart = async (items: CartItem[]) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    "http://localhost:8080/cart/save",
    items,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
