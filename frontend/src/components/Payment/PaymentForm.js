import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/PaymentForm.css";

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Paiement effectué avec succès !");
  };

  return (
    <div className="payment-container">
      <h1>Paiement sécurisé</h1>
      <p>Veuillez renseigner les informations de votre carte.</p>
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Numéro de carte</label>
          <input
            type="text"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nom du titulaire</label>
          <input
            type="text"
            name="cardHolder"
            placeholder="John Doe"
            value={formData.cardHolder}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Date d'expiration</label>
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/AA"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>CVV</label>
            <input
              type="text"
              name="cvv"
              placeholder="123"
              value={formData.cvv}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-button">
            Confirmer le paiement
          </button>
          <button
            type="button"
            className="return-button"
            onClick={() => navigate("/cart")}
          >
            Retour au panier
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
