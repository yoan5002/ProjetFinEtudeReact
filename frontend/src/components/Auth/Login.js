import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Auth.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost/Commerce%20electronique%202/ProjetFinEtudeReact/backend/public/index.php?action=login",
        { email, password }
      );

      if (response.data && response.data.user) {
        const { id, role } = response.data.user;

        // Stocker l'ID utilisateur dans localStorage pour le suivi du panier
        localStorage.setItem("userID", id);

        // Redirection en fonction du rôle
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "user") {
          navigate("/products");
        } else {
          setError("Rôle non reconnu. Contactez l'administrateur.");
        }
      } else {
        setError(response.data.message || "Identifiants incorrects.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur de connexion. Veuillez réessayer."
      );
    }
  };

  return (
    <div className="auth-container">
      <h2>Connexion</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
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
        <button type="submit">Se connecter</button>
      </form>
      <p>
        Pas encore de compte ?{" "}
        <span onClick={() => navigate("/register")}>Inscrivez-vous ici</span>.
      </p>
    </div>
  );
};

export default Login;
