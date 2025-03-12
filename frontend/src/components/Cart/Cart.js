import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Charger le panier depuis localStorage au montage du composant
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Mettre à jour le panier dans localStorage
  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Augmenter la quantité d'un produit
  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  // Diminuer la quantité d'un produit
  const decreaseQuantity = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0); // Supprimer si quantité atteint 0
    updateCart(updatedCart);
  };

  // Supprimer un produit
  const removeItem = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    updateCart(updatedCart);
  };

  // Calcul du total
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1>Votre Panier</h1>
      {cart.length > 0 ? (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price} €</td>
                  <td>
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="quantity-button"
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="quantity-button"
                    >
                      +
                    </button>
                  </td>
                  <td>{(item.price * item.quantity).toFixed(2)} €</td>
                  <td>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="remove-button"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 className="cart-total">Total : {totalPrice.toFixed(2)} €</h2>
          <div className="cart-actions">
            <button
              className="payment-button"
              onClick={() => navigate("/payment")}
            >
              Procéder au paiement
            </button>
            <button
              className="return-button"
              onClick={() => navigate("/products")}
            >
              Retour aux produits
            </button>
          </div>
        </>
      ) : (
        <p className="empty-cart-message">Votre panier est vide.</p>
      )}
    </div>
  );
};

export default Cart;
