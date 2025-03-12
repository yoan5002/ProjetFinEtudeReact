import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import des composants
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ProductList from "./components/Products/ProductList";
import Cart from "./components/Cart/Cart"; 
import PaymentForm from "./components/Payment/PaymentForm";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

function App() {
  return (
    <Router>
      {/* Header toujours visible */}
      <Header />
      
      <main>
        <Routes>
          {/* Page d'accueil */}
          <Route path="/" element={<Home />} />

          {/* Authentification */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Produits pour les utilisateurs */}
          <Route path="/products" element={<ProductList />} />

          {/* Tableau de bord de l'administrateur */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Panier */}
          <Route path="/cart" element={<Cart />} />

          {/* Formulaire de paiement */}
          <Route path="/payment" element={<PaymentForm />} />
        </Routes>
      </main>
      
      {/* Footer toujours visible */}
      <Footer />
    </Router>
  );
}

export default App;
