import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CartItem = {
  productId: number;
  quantity: number;
};

type AppContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("cartItems");
    console.log("🔁 ODCZYT localStorage:", saved);
    if (saved) {
      setCartItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    const existing = cartItems.find((i) => i.productId === item.productId);
    if (existing) {
      increaseQuantity(item.productId);
    } else {
      setCartItems((prev) => [...prev, item]);
    }
  };

  const increaseQuantity = (productId: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  return (
    <AppContext.Provider
      value={{ cartItems, addToCart, increaseQuantity, decreaseQuantity, clearCart }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext musi być używany w AppProvider");
  }
  return context;
};
