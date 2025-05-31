import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Payment from "./components/Payment";
import Cart from "./components/Cart";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { AppProvider } from "./context/AppContext";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products" element={
            <PrivateRoute><Products /></PrivateRoute>
          } />
          <Route path="/cart" element={
            <PrivateRoute><Cart /></PrivateRoute>
          } />
          <Route path="/payment" element={
            <PrivateRoute><Payment /></PrivateRoute>
          } />
        </Routes>
      </Router>
    </AppProvider>
  );
}
