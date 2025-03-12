import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/Layout.css";

const Header = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"; // Vérifie si l'utilisateur est connecté
  const userRole = localStorage.getItem("role"); // Récupère le rôle de l'utilisateur ("user" ou "admin")
  const location = useLocation();

  // Détermine si on est sur une page publique (Accueil, Connexion, Inscription)
  const isPublicPage =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/" className="logo-link">
          Bijouterie Luxe
        </Link>
      </div>
      <nav className="header-nav">
        <ul>
          {/* Lien "Accueil" toujours visible */}
          <li>
            <Link to="/">Accueil</Link>
          </li>

          {/* Liens visibles sur les pages publiques */}
          {isPublicPage && !isAuthenticated && (
            <>
              <li>
                <Link to="/login">Connexion</Link>
              </li>
              
            </>
          )}

          {/* Liens pour les utilisateurs connectés */}
          {isAuthenticated && userRole === "user" && (
            <>
              <li>
                <Link to="/products">Produits</Link>
              </li>
              <li>
                <Link to="/cart">Panier</Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("isAuthenticated");
                    localStorage.removeItem("role");
                    window.location.href = "/";
                  }}
                  className="logout-button"
                >
                  Déconnexion
                </button>
              </li>
            </>
          )}

          {/* Liens pour les administrateurs connectés */}
          {isAuthenticated && userRole === "admin" && (
            <>
              <li>
                <Link to="/admin/dashboard">Produits</Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("isAuthenticated");
                    localStorage.removeItem("role");
                    window.location.href = "/";
                  }}
                  className="logout-button"
                >
                  Déconnexion
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
