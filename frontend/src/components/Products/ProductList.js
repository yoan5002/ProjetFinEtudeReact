import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/ProductList.css"; // Assure-toi que ce fichier existe

const ProductList = () => {
  const [products, setProducts] = useState([]); // Liste des produits
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState(null); // Gestion des erreurs
  const navigate = useNavigate();

  const BASE_URL =
    "http://localhost/Commerce Electronique 2/ProjetFinEtudeReact/backend/public/index.php";

  // Charger les produits depuis l'API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}?action=getAllProducts`);
        setProducts(response.data);
      } catch (err) {
        setError("Erreur lors du chargement des produits.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Synchroniser les produits dans le panier avec les données les plus récentes
  useEffect(() => {
    const syncCartWithUpdatedProducts = async () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const response = await axios.get(`${BASE_URL}?action=getAllProducts`);
        const updatedProducts = response.data;

        // Synchroniser les produits dans le panier
        const syncedCart = cart.map((cartItem) => {
          const updatedProduct = updatedProducts.find(
            (prod) => prod.id === cartItem.id
          );
          return updatedProduct
            ? { ...cartItem, ...updatedProduct }
            : cartItem; // Conserve les données initiales si le produit n'est pas trouvé
        });

        localStorage.setItem("cart", JSON.stringify(syncedCart));
      } catch (err) {
        console.error("Erreur lors de la synchronisation du panier :", err);
      }
    };

    syncCartWithUpdatedProducts();
  }, []);

  // Ajouter un produit au panier
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1; // Augmente la quantité si le produit existe déjà
    } else {
      cart.push({ ...product, quantity: 1 }); // Ajoute le produit avec une quantité initiale de 1
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} a été ajouté au panier.`);
  };

  // Gestion des états de chargement et des erreurs
  if (loading) return <p className="loading-message">Chargement des produits...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="product-list">
      <h1>Nos Produits</h1>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-item">
              <img
                src={`http://localhost/Commerce Electronique 2/ProjetFinEtudeReact/backend${product.image_url}`}
                alt={product.name}
                className="product-image"
              />
              <h2 className="product-title">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Prix : {product.price} €</p>
              <button
                className="add-to-cart-button"
                onClick={() => addToCart(product)}
              >
                Ajouter au panier
              </button>
            </div>
          ))
        ) : (
          <p>Aucun produit disponible.</p>
        )}
      </div>
      <div className="view-cart-container">
        <button className="view-cart-button" onClick={() => navigate("/cart")}>
          Voir le panier
        </button>
      </div>
    </div>
  );
};

export default ProductList;
