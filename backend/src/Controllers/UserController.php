<?php
class UserController {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Inscription d'un utilisateur
    public function register() {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['email'], $data['password'])) {
            echo json_encode(["message" => "Données invalides : email et mot de passe requis"]);
            return;
        }

        $email = filter_var($data['email'], FILTER_VALIDATE_EMAIL);
        $password = $data['password'];

        if (!$email || !$password) {
            echo json_encode(["message" => "Email ou mot de passe invalide"]);
            return;
        }

        try {
            // Vérifie si l'email existe déjà
            $queryCheck = "SELECT id FROM users WHERE email = :email";
            $stmtCheck = $this->conn->prepare($queryCheck);
            $stmtCheck->bindParam(':email', $email);
            $stmtCheck->execute();

            if ($stmtCheck->rowCount() > 0) {
                echo json_encode(["message" => "Cet email est déjà enregistré."]);
                return;
            }

            // Hachage sécurisé du mot de passe
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            // Insère l'utilisateur
            $query = "INSERT INTO users (email, password, role) VALUES (:email, :password, 'user')";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $hashedPassword);
            $stmt->execute();

            echo json_encode(["message" => "Utilisateur enregistré avec succès"]);
        } catch (PDOException $e) {
            echo json_encode(["message" => "Erreur lors de l'inscription : " . $e->getMessage()]);
        }
    }

    // Connexion d'un utilisateur (admin ou utilisateur)
    public function login() {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['email'], $data['password'])) {
            echo json_encode(["message" => "Données invalides : email et mot de passe requis"]);
            return;
        }

        $email = $data['email'];
        $password = $data['password'];

        try {
            // Récupération de l'utilisateur par email
            $query = "SELECT id, email, password, role FROM users WHERE email = :email";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':email', $email);
            $stmt->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            // Vérifie le mot de passe
            if ($user && password_verify($password, $user['password'])) {
                echo json_encode([
                    "message" => "Connexion réussie",
                    "user" => [
                        "id" => $user['id'],
                        "email" => $user['email'],
                        "role" => $user['role']
                    ]
                ]);
            } else {
                echo json_encode(["message" => "Identifiants incorrects"]);
            }
        } catch (PDOException $e) {
            echo json_encode(["message" => "Erreur lors de la connexion : " . $e->getMessage()]);
        }
    }

    // Récupérer tous les utilisateurs (pour l'admin)
    public function getUsers() {
        try {
            $query = "SELECT id, email, role FROM users";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($users);
        } catch (PDOException $e) {
            echo json_encode(["message" => "Erreur lors de la récupération des utilisateurs : " . $e->getMessage()]);
        }
    }

    // Supprimer un utilisateur (par l'admin)
    public function deleteUser() {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['id']) || !is_numeric($data['id'])) {
            echo json_encode(["message" => "ID utilisateur invalide"]);
            return;
        }

        $id = $data['id'];

        try {
            $query = "DELETE FROM users WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                echo json_encode(["message" => "Utilisateur supprimé avec succès"]);
            } else {
                echo json_encode(["message" => "Utilisateur non trouvé"]);
            }
        } catch (PDOException $e) {
            echo json_encode(["message" => "Erreur lors de la suppression : " . $e->getMessage()]);
        }
    }
}
?>
