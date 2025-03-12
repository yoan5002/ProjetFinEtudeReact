import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Appel API vers le backend
      const response = await axios.post(
        "http://localhost/Commerce%20Electronique%202/ProjetFinEtudeReact/backend/public/index.php?action=register",
        { email, password }
      );
      if (response.data && response.data.message) {
        alert(response.data.message); // Message de succès
        navigate("/login"); // Redirection vers la page de connexion
      }
    } catch (err) {
      // Gestion des erreurs
      if (err.response && err.response.data) {
        setError(err.response.data.message); // Message d'erreur backend
      } else {
        setError("Une erreur inattendue est survenue."); // Erreur générique
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Inscription</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">S'inscrire</button>
      </form>
      <p>
        Deja un compte ?{" "}
        <span onClick={() => navigate("/Login")}>Connectez--vous ici</span>.
      </p>
    </div>
  );
};

export default Register;
