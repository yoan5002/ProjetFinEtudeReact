-- Créer la base de données
CREATE DATABASE IF NOT EXISTS bijouterie_db;

-- Utiliser la base de données
USE bijouterie_db;

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,      -- Identifiant unique de l'utilisateur
    email VARCHAR(255) UNIQUE NOT NULL,     -- Email unique
    password VARCHAR(255) NOT NULL,         -- Mot de passe (haché)
    role ENUM('user', 'admin') DEFAULT 'user', -- Rôle de l'utilisateur (par défaut "user")
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Date de création
);

-- Table des produits
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,      -- Identifiant unique du produit
    name VARCHAR(255) NOT NULL,             -- Nom du produit
    description TEXT NOT NULL,              -- Description du produit
    price DECIMAL(10, 2) NOT NULL,          -- Prix du produit
    image_url VARCHAR(255),                 -- URL de l'image du produit
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Date de création
);

-- Table du panier (associée aux utilisateurs et aux produits)
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,      -- Identifiant unique de l'entrée dans le panier
    user_id INT NOT NULL,                   -- Identifiant de l'utilisateur
    product_id INT NOT NULL,                -- Identifiant du produit
    quantity INT NOT NULL DEFAULT 1,        -- Quantité ajoutée au panier
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date de création
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Table des commandes
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,      -- Identifiant unique de la commande
    user_id INT NOT NULL,                   -- Identifiant de l'utilisateur
    total DECIMAL(10, 2) NOT NULL,          -- Total de la commande
    payment_status ENUM('pending', 'paid') DEFAULT 'pending', -- Statut du paiement
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date de création
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table des détails des commandes
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,      -- Identifiant unique de l'entrée
    order_id INT NOT NULL,                  -- Identifiant de la commande
    product_id INT NOT NULL,                -- Identifiant du produit
    quantity INT NOT NULL,                  -- Quantité commandée
    price DECIMAL(10, 2) NOT NULL,          -- Prix unitaire au moment de la commande
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date de création
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);


INSERT INTO users (email, password, role) VALUES 
('admin@example.com', MD5('admin123'), 'admin');


-- Projet ecommerce aborescence
ProjetFinEtudeReact/
│
├── backend/
│   ├── public/
│   │   ├── index.php             # Point d'entrée principal du backend
│   │
│   ├── config/
│   │   ├── database.php          # Configuration de la base de données
│   │
│   ├── src/
│   │   ├── Controllers/
│   │   │   ├── UserController.php    # Gère les utilisateurs (login, register, etc.)
│   │   │   ├── ProductController.php # Gère les produits (CRUD)
│   │   │
│   │   ├── Models/
│   │       ├── User.php          # Modèle pour les utilisateurs
│   │       ├── Product.php       # Modèle pour les produits
│   │
│   ├── uploads/                  # Dossier pour stocker les images uploadées
│   │   └── ...                   # Images des produits
│   │
│   └── tests/                    # Dossier pour les tests backend
│       └── ...                   # Tests PHP (optionnel)
│
├── frontend/
│   ├── public/
│   │   ├── index.html            # Fichier HTML principal pour React
│   │   ├── favicon.ico           # Favicon du projet
│   │
│   ├── src/
│   │   ├── App.js                # Fichier principal contenant les routes
│   │   ├── index.js              # Point d'entrée pour React
│   │   ├── styles/
│   │   │   ├── Layout.css        # CSS global pour Header et Footer
│   │   │   ├── Auth.css          # CSS pour Login et Register
│   │   │   ├── ProductList.css   # CSS pour la liste des produits
│   │   │   ├── Cart.css          # CSS pour la page Panier
│   │   │   ├── Payment.css       # CSS pour la page de Paiement
│   │   │
│   │   ├── components/
│   │   │   ├── Home/
│   │   │   │   ├── Home.js       # Page d'accueil
│   │   │   │   ├── Home.css      # CSS spécifique à la page d'accueil
│   │   │   │
│   │   │   ├── Auth/
│   │   │   │   ├── Login.js      # Page de connexion
│   │   │   │   ├── Register.js   # Page d'inscription
│   │   │   │
│   │   │   ├── Products/
│   │   │   │   ├── ProductList.js # Liste des produits pour les utilisateurs
│   │   │   │
│   │   │   ├── Cart/
│   │   │   │   ├── Cart.js       # Page panier
│   │   │   │
│   │   │   ├── Payment/
│   │   │   │   ├── PaymentForm.js # Formulaire de paiement
│   │   │   │
│   │   │   ├── Admin/
│   │   │   │   ├── AdminDashboard.js # Tableau de bord admin
│   │   │   │
│   │   │   ├── Layout/
│   │   │       ├── Header.js     # Header pour toutes les pages
│   │   │       ├── Footer.js     # Footer pour toutes les pages
│   │   │
│   │   ├── utils/
│   │       ├── api.js            # Utilitaires pour les appels API
│   │
│   ├── package.json              # Fichier des dépendances pour React
│   ├── README.md                 # Documentation du frontend
│
├── README.md                     # Documentation principale du projet
└── .gitignore                    # Fichiers à ignorer par Git
