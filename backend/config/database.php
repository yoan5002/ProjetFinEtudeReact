<?php
class Database {
    private $host = "localhost";
    private $db_name = "bijouterie_db"; // Nom de la base de données
    private $username = "root";         // Nom d'utilisateur MySQL
    private $password = "";             // Mot de passe MySQL
    public $conn;

    // Méthode pour établir une connexion
    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $exception) {
            echo "Erreur de connexion : " . $exception->getMessage();
        }

        return $this->conn;
    }
}
?>
