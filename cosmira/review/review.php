<?php
require_once '../config/db_config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $product_id = isset($_GET['product_id']) ? (int)$_GET['product_id'] : null;
    
    if (!$product_id) {
        echo json_encode(['error' => 'Product ID is required']);
        exit();
    }

    // Prepare the main query to get reviews
    $sql = "SELECT r.*, p.name as product_name, p.brand 
            FROM reviews r 
            JOIN products p ON r.product_id = p.id 
            WHERE r.product_id = ?
            ORDER BY r.created_at DESC";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $product_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $reviews = [];
    while ($row = $result->fetch_assoc()) {
        $reviews[] = [
            'id' => $row['id'],
            'username' => $row['username'],
            'rating' => $row['rating'],
            'review_text' => $row['review_text'],
            'photo_path' => $row['photo_path'],
            'skin_type' => $row['skin_type'],
            'coverage_type' => $row['coverage_type'],
            'wear_type' => $row['wear_type'],
            'created_at' => $row['created_at'],
            'product_name' => $row['product_name'],
            'brand' => $row['brand']
        ];
    }

    // Calculate average rating
    $avg_sql = "SELECT AVG(rating) as avg_rating, COUNT(*) as total_reviews 
                FROM reviews 
                WHERE product_id = ?";
    $avg_stmt = $conn->prepare($avg_sql);
    $avg_stmt->bind_param("i", $product_id);
    $avg_stmt->execute();
    $avg_result = $avg_stmt->get_result()->fetch_assoc();

    // Prepare the response
    $response = [
        'success' => true,
        'reviews' => $reviews,
        'summary' => [
            'average_rating' => round($avg_result['avg_rating'], 1),
            'total_reviews' => $avg_result['total_reviews']
        ]
    ];

    echo json_encode($response);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}

$conn->close();
?>