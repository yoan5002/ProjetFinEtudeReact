<?php
require_once "../config/database.php";
require_once "../src/Controllers/UserController.php";
require_once "../src/Controllers/ProductController.php";

// Headers pour CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Gérer les requêtes OPTIONS (CORS preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Initialisation des variables
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

$database = new Database();
$conn = $database->getConnection();

$userController = new UserController($conn);
$productController = new ProductController($conn);

// Routage des actions
switch ($action) {
    case 'login':
        if ($method === 'POST') {
            $userController->login();
        } else {
            echo json_encode(["message" => "Méthode non supportée pour login"]);
        }
        break;

    case 'register':
        if ($method === 'POST') {
            $userController->register();
        } else {
            echo json_encode(["message" => "Méthode non supportée pour register"]);
        }
        break;

    case 'getUsers':
        if ($method === 'GET') {
            $userController->getUsers();
        } else {
            echo json_encode(["message" => "Méthode non supportée pour getUsers"]);
        }
        break;

    case 'getAllProducts':
        if ($method === 'GET') {
            $productController->getAllProducts();
        } else {
            echo json_encode(["message" => "Méthode non supportée pour getAllProducts"]);
        }
        break;

    case 'addProduct':
        if ($method === 'POST') {
            $productController->addProduct();
        } else {
            echo json_encode(["message" => "Méthode non supportée pour addProduct"]);
        }
        break;

    case 'updateProduct':
        if ($method === 'POST') {
            $productController->updateProduct();
        } else {
            echo json_encode(["message" => "Méthode non supportée pour updateProduct"]);
        }
        break;

    case 'deleteProduct':
        if ($method === 'DELETE') {
            $productController->deleteProduct();
        } else {
            echo json_encode(["message" => "Méthode non supportée pour deleteProduct"]);
        }
        break;

    default:
        echo json_encode(["message" => "Action non supportée"]);
        break;
}
?>
