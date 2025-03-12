import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Bienvenue sur Bijouterie Luxe</h1>
        <p className="home-tagline">
          Sublimez chaque instant avec des bijoux d'exception.
        </p>

        <div className="home-features">
          <p>✨ Qualité inégalée pour des moments inoubliables.</p>
          <p>💎 Créations uniques pour sublimer votre style.</p>
          <p>🚚 Livraison rapide et sécurisée.</p>
          <p>📞 Un support client disponible 24/7.</p>
        </div>

        <button className="home-button" onClick={() => navigate("/login")}>
          Découvrir Maintenant
        </button>
      </div>
    </div>
  );
};

export default Home;
