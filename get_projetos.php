<?php
header('Content-Type: application/json');
require_once __DIR__ . '/env.php';
loadEnv();

$host = $_ENV['DB_HOST'];
$db   = $_ENV['DB_NAME'];
$user = $_ENV['DB_USER'];
$pass = $_ENV['DB_PASS'];
$charset = $_ENV['DB_CHARSET'];

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    $stmt = $pdo->query('SELECT * FROM projetos WHERE exibirProjeto = 1 ORDER BY OrdemApresentacao ASC');
    $projetos = $stmt->fetchAll();

    // Transformar resultados e tecnologias em arrays
    foreach ($projetos as &$projeto) {
        $projeto['resultados'] = explode(';', $projeto['resultados']);
        $projeto['tecnologias'] = explode(';', $projeto['tecnologias']);
    }

    echo json_encode($projetos, JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['erro' => 'Erro ao conectar ao banco de dados: ' . $e->getMessage()]);
} 