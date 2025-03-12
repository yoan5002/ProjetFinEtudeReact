<?php
class ProductController {
    private $conn;

    // Constructeur pour injecter la connexion à la base de données
    public function __construct($db) {
        $this->conn = $db;
    }

    // Méthode pour récupérer tous les produits
    public function getAllProducts() {
        try {
            $query = "SELECT * FROM products";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($products ?: ["message" => "Aucun produit disponible"]);
        } catch (PDOException $e) {
            echo json_encode(["message" => "Erreur lors de la récupération des produits : " . $e->getMessage()]);
        }
    }

    // Méthode pour ajouter un produit
    public function addProduct() {
        $name = htmlspecialchars(strip_tags($_POST['name']));
        $description = htmlspecialchars(strip_tags($_POST['description']));
        $price = filter_var($_POST['price'], FILTER_VALIDATE_FLOAT);
        $image = $_FILES['image'] ?? null;

        // Validation des données
        if (!$name || !$description || !$price || !$image) {
            echo json_encode(["message" => "Données invalides. Veuillez remplir tous les champs et sélectionner une image."]);
            return;
        }

        // Validation du fichier image
        $allowed_extensions = ['jpg', 'jpeg', 'png', 'gif'];
        $file_extension = strtolower(pathinfo($image["name"], PATHINFO_EXTENSION));
        if (!in_array($file_extension, $allowed_extensions)) {
            echo json_encode(["message" => "Type de fichier invalide. Seuls JPG, JPEG, PNG et GIF sont acceptés."]);
            return;
        }

        try {
            // Gestion du dossier uploads
            $target_dir = "../uploads/";
            if (!is_dir($target_dir)) {
                mkdir($target_dir, 0777, true);
            }

            $target_file = $target_dir . uniqid() . "_" . basename($image["name"]);
            if (!move_uploaded_file($image["tmp_name"], $target_file)) {
                echo json_encode(["message" => "Erreur lors de l'upload de l'image."]);
                return;
            }
            $image_url = "/uploads/" . basename($target_file);

            $query = "INSERT INTO products (name, description, price, image_url) 
                      VALUES (:name, :description, :price, :image_url)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':price', $price);
            $stmt->bindParam(':image_url', $image_url);
            $stmt->execute();

            echo json_encode(["message" => "Produit ajouté avec succès"]);
        } catch (PDOException $e) {
            echo json_encode(["message" => "Erreur lors de l'ajout du produit : " . $e->getMessage()]);
        }
    }

    // Méthode pour modifier un produit
    public function updateProduct() {
        $id = filter_var($_POST['id'], FILTER_VALIDATE_INT);
        $name = htmlspecialchars(strip_tags($_POST['name']));
        $description = htmlspecialchars(strip_tags($_POST['description']));
        $price = filter_var($_POST['price'], FILTER_VALIDATE_FLOAT);
        $image = $_FILES['image'] ?? null;

        // Validation des données
        if (!$id || !$name || !$description || !$price) {
            echo json_encode(["message" => "Données invalides. Veuillez remplir tous les champs."]);
            return;
        }

        try {
            $image_url = null;

            // Gestion de l'upload de l'image (si une nouvelle image est fournie)
            if ($image) {
                $allowed_extensions = ['jpg', 'jpeg', 'png', 'gif'];
                $file_extension = strtolower(pathinfo($image["name"], PATHINFO_EXTENSION));
                if (!in_array($file_extension, $allowed_extensions)) {
                    echo json_encode(["message" => "Type de fichier invalide."]);
                    return;
                }

                $target_dir = "../uploads/";
                if (!is_dir($target_dir)) {
                    mkdir($target_dir, 0777, true);
                }

                $target_file = $target_dir . uniqid() . "_" . basename($image["name"]);
                if (!move_uploaded_file($image["tmp_name"], $target_file)) {
                    echo json_encode(["message" => "Erreur lors de l'upload de l'image."]);
                    return;
                }
                $image_url = "/uploads/" . basename($target_file);
            }

            $query = "UPDATE products 
                      SET name = :name, description = :description, price = :price" . 
                      ($image_url ? ", image_url = :image_url" : "") . 
                      " WHERE id = :id";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':price', $price);
            if ($image_url) {
                $stmt->bindParam(':image_url', $image_url);
            }
            $stmt->execute();

            echo json_encode(["message" => "Produit modifié avec succès"]);
        } catch (PDOException $e) {
            echo json_encode(["message" => "Erreur lors de la modification du produit : " . $e->getMessage()]);
        }
    }

    // Méthode pour supprimer un produit
    public function deleteProduct() {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['id']) || !is_numeric($data['id'])) {
            echo json_encode(["message" => "ID produit invalide."]);
            return;
        }

        $id = $data['id'];

        try {
            $query = "DELETE FROM products WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            echo json_encode(["message" => "Produit supprimé avec succès"]);
        } catch (PDOException $e) {
            echo json_encode(["message" => "Erreur lors de la suppression du produit : " . $e->getMessage()]);
        }
    }
}
?>
