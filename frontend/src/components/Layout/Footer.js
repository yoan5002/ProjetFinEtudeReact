import React from "react";
import "../../styles/Layout.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Section À propos */}
        <div className="footer-section about">
          <h3>À propos de nous</h3>
          <p>
            Bijouterie Luxe est votre destination privilégiée pour des bijoux
            uniques et élégants. Nous nous engageons à offrir des créations de
            qualité pour sublimer vos moments spéciaux.
          </p>
        </div>

        {/* Section Liens rapides */}
        <div className="footer-section quick-links">
          <h3>Liens rapides</h3>
          <ul>
            <li>
              <a href="/terms">Conditions d'utilisation</a>
            </li>
            <li>
              <a href="/privacy">Politique de confidentialité</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Section Réseaux sociaux */}
        <div className="footer-section social-media">
          <h3>Suivez-nous</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Bijouterie Luxe. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
