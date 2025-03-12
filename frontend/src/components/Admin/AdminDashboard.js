import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    price: "",
    description: "",
    image: null, // Contiendra le fichier d'image sélectionné
  });

  const BASE_URL =
    "http://localhost/Commerce Electronique 2/ProjetFinEtudeReact/backend/public/index.php";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get(`${BASE_URL}?action=getUsers`);
        setUsers(usersResponse.data || []);

        const productsResponse = await axios.get(`${BASE_URL}?action=getAllProducts`);
        setProducts(productsResponse.data || []);

        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des données.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`${BASE_URL}?action=deleteProduct`, {
        data: { id: productId },
      });
      setProducts(products.filter((product) => product.id !== productId));
      alert("Produit supprimé avec succès !");
    } catch (err) {
      setError("Erreur lors de la suppression du produit.");
    }
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", formData.id || "");
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description);
      if (formData.image) {
        formDataToSend.append("image", formData.image); // Ajoute l'image au formulaire
      }

      if (formData.id) {
        await axios.post(`${BASE_URL}?action=updateProduct`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Produit modifié avec succès !");
      } else {
        await axios.post(`${BASE_URL}?action=addProduct`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Produit ajouté avec succès !");
      }

      const productsResponse = await axios.get(`${BASE_URL}?action=getAllProducts`);
      setProducts(productsResponse.data);
      setShowModal(false);
      setFormData({ id: null, name: "", price: "", description: "", image: null });
    } catch (err) {
      setError("Erreur lors de l'ajout ou de la modification du produit.");
    }
  };

  const openModal = (product = null) => {
    setShowModal(true);
    setFormData(
      product
        ? { id: product.id, name: product.name, price: product.price, description: product.description, image: null }
        : { id: null, name: "", price: "", description: "", image: null }
    );
  };

  if (loading) return <p>Chargement des données...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-dashboard">
      <h1>Tableau de bord Admin</h1>

      {/* Gestion des utilisateurs */}
      <section>
        <h2>Utilisateurs inscrits</h2>
        {users.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Rôle</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucun utilisateur trouvé.</p>
        )}
      </section>

      {/* Gestion des produits */}
      <section>
        <h2>Produits</h2>
        <button onClick={() => openModal()}>Ajouter un produit</button>
        {products.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prix</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price} €</td>
                  <td>
                    <button onClick={() => openModal(product)}>Modifier</button>
                    <button onClick={() => handleDeleteProduct(product.id)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucun produit trouvé.</p>
        )}
      </section>

      {/* Modal pour ajouter ou modifier un produit */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{formData.id ? "Modifier le produit" : "Ajouter un produit"}</h2>
            <form onSubmit={handleSubmitProduct}>
              <input
                type="text"
                placeholder="Nom"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Prix"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
              <input
                type="file"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                required={!formData.id} // Image obligatoire seulement pour l'ajout
              />
              <button type="submit">{formData.id ? "Modifier" : "Ajouter"}</button>
              <button type="button" onClick={() => setShowModal(false)}>
                Annuler
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
