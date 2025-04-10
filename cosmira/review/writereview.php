<?php
require_once '../config/db_config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $username = $_POST['username'];
    $productId = $_POST['product_id'];
    $rating = $_POST['rating'];
    $review_text = isset($_POST['review_text']) ? $_POST['review_text'] : '';
    $skin_type = isset($_POST['skin_type']) ? $_POST['skin_type'] : null;
    $coverage_type = isset($_POST['coverage_type']) ? $_POST['coverage_type'] : null;
    $wear_type = isset($_POST['wear_type']) ? $_POST['wear_type'] : null;
    $tags = isset($_POST['tags']) ? $_POST['tags'] : [];

    // Only validate rating as required
    if (empty($rating)) {
        die("Please provide a star rating");
    }

    // Handle file upload if provided
    $photo_path = null;
    if (isset($_FILES['photo']) && $_FILES['photo']['error'] == 0) {
        $target_dir = "../assests/img/reviews/";
        if (!file_exists($target_dir)) {
            mkdir($target_dir, 0777, true);
        }
        
        $file_extension = strtolower(pathinfo($_FILES["photo"]["name"], PATHINFO_EXTENSION));
        $new_filename = uniqid() . '.' . $file_extension;
        $target_file = $target_dir . $new_filename;

        // Check file type
        $allowed_types = ['jpg', 'jpeg', 'png', 'gif'];
        if (!in_array($file_extension, $allowed_types)) {
            die("Sorry, only JPG, JPEG, PNG & GIF files are allowed.");
        }

        // Upload file
        if (move_uploaded_file($_FILES["photo"]["tmp_name"], $target_file)) {
            $photo_path = $target_file;
        } else {
            // If file upload fails, continue without photo
            error_log("File upload failed for review");
        }
    }

    // Insert review into database
    $sql = "INSERT INTO reviews (username, product_id, rating, review_text, photo_path, skin_type, coverage_type, wear_type, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sidsssss", $username, $productId, $rating, $review_text, $photo_path, $skin_type, $coverage_type, $wear_type);

    if ($stmt->execute()) {
        $review_id = $stmt->insert_id;

        // Insert tags if any
        if (!empty($tags)) {
            $tag_sql = "INSERT INTO review_tags (review_id, tag_name) VALUES (?, ?)";
            $tag_stmt = $conn->prepare($tag_sql);
            
            foreach ($tags as $tag) {
                $tag_stmt->bind_param("is", $review_id, $tag);
                $tag_stmt->execute();
            }
        }

        // Redirect back to product review page
        header("Location: review.html?product_id=" . $productId);
        exit();
    } else {
        die("Error creating review: " . $conn->error);
    }
}
?>