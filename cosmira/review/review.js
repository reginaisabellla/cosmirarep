document.addEventListener("DOMContentLoaded", () => {
    const reviewsContainer = document.querySelector('.reviews-container');
    const createReviewBtn = document.querySelector('.create-review');
    const averageStars = document.querySelectorAll('.average-stars .star');
    const averageRatingValue = document.querySelector('.average-rating-value');

    // Add click handler for create review button
    if (createReviewBtn) {
        createReviewBtn.addEventListener('click', () => {
            window.location.href = 'writereview.html';
        });
    }

    // Function to create star rating HTML
    function createStarRating(rating) {
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                starsHtml += '<span class="star filled">★</span>';
            } else {
                starsHtml += '<span class="star">★</span>';
            }
        }
        return `<div class="rating">${starsHtml}</div>`;
    }

    // Function to format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }    // Function to create tags HTML
    function createTagsHtml(tags) {
        // Sort tags to ensure skin type tags come before product tags
        const sortedTags = [...tags].sort((a, b) => {
            // Skin tags come first (return -1), product tags come second
            if (a.type === 'skin' && b.type === 'product') return -1;
            if (a.type === 'product' && b.type === 'skin') return 1;
            return 0;
        });
        
        return sortedTags.map(tag => {
            // Determine tag color based on value
            let tagColor = tag.type === 'skin' ? '#8e6b9e' : '#6b819e'; // Default colors
            
            // Check for specific product tag values and assign colors
            if (tag.type === 'product') {
                // Texture/finish tags - Blue family
                if (tag.text === 'Lightweight') tagColor = '#5c7fba';
                else if (tag.text === 'Full Coverage') tagColor = '#4a6da1';
                else if (tag.text === 'Natural Finish') tagColor = '#6187c7';
                else if (tag.text === 'Matte') tagColor = '#3d6294';
                else if (tag.text === 'Dewy') tagColor = '#5575b0';
                
                // Performance tags - Green family
                else if (tag.text === 'Long-lasting') tagColor = '#4a9c7d';
                else if (tag.text === 'Hydrating') tagColor = '#5cb094';
                else if (tag.text === 'Buildable') tagColor = '#68bd9f';
                
                // Problem tags - Purple/Pink family
                else if (tag.text === 'Cakey') tagColor = '#a068bd';
                else if (tag.text === 'Wears Off') tagColor = '#bd6992';
                else if (tag.text === 'Heavy') tagColor = '#9568bd';
                
                // Problem tags - Red/Pink family
                else if (tag.text === 'Irritating') tagColor = '#c06666';
                else if (tag.text === 'Breakout-Prone') tagColor = '#bd6875';
                else if (tag.text === 'Contains Allergens') tagColor = '#bd6068';
                else if (tag.text === 'Not Sweat-Proof') tagColor = '#c77989';
                
                // Price tags - Teal family
                else if (tag.text === 'Expensive') tagColor = '#5e9db1';
                else if (tag.text === 'Affordable') tagColor = '#68acbe';
                else if (tag.text === 'Allergen-Free') tagColor = '#4ab0a0';
            }
            
            return `
                <span class="tag ${tag.type}-tag" 
                      data-type="${tag.type}" 
                      data-value="${tag.text}" 
                      style="background-color: ${tagColor};">
                    ${tag.text}
                </span>
            `;
        }).join('');
    }// Function to create a review element
    function createReviewElement(review) {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        reviewElement.setAttribute('data-review-id', review.date); // Using date as a unique identifier
        reviewElement.innerHTML = `
            <div class="review-header">
                <img src="${review.profilePic}" alt="Profile Pic" class="profile-pic">
                <div class="user-info">
                    <div class="username-rating">
                        <span class="username">${review.username}</span>
                        ${createStarRating(review.rating)}
                    </div>
                    <p class="date">${formatDate(review.date)}</p>
                </div>
            </div>
            <div class="review-content">
                <div class="tags">
                    ${createTagsHtml(review.tags)}
                </div>
                <p>${review.text || ''}</p>
                ${review.photo ? `<div class="review-photo"><img src="${review.photo}" alt="Review photo"></div>` : ''}
            </div>
            <div class="review-actions">
                <button class="edit-review">Edit</button>
                <button class="delete-review">Delete</button>
            </div>
        `;        // Add delete functionality
        const deleteBtn = reviewElement.querySelector('.delete-review');
        deleteBtn.addEventListener('click', () => {
            // Get current reviews from localStorage
            const reviews = JSON.parse(localStorage.getItem('productReviews') || '[]');
            // Find and remove the review
            const reviewIndex = reviews.findIndex(r => 
                r.date === review.date && 
                r.username === review.username &&
                r.rating === review.rating
            );
            if (reviewIndex > -1) {
                reviews.splice(reviewIndex, 1);
                localStorage.setItem('productReviews', JSON.stringify(reviews));
                reviewElement.remove();
                updateAverageRating();
            }
        });

        // Add edit functionality
        const editBtn = reviewElement.querySelector('.edit-review');
        editBtn.addEventListener('click', () => {
            // Store the review data in localStorage for editing
            localStorage.setItem('editingReview', JSON.stringify(review));
            // Redirect to the write review page with edit parameter
            window.location.href = 'writereview.html?edit=true';
        });

        return reviewElement;
    }    // Function to update average rating display
    function updateAverageRating() {
        const reviews = JSON.parse(localStorage.getItem('productReviews') || '[]');
        const averageStars = document.querySelectorAll('.average-stars .star');
        const averageRatingValue = document.querySelector('.average-rating-value');
        
        console.log("Updating average rating. Found reviews:", reviews.length);
        console.log("Found star elements:", averageStars.length);
        
        // Reset all stars first
        averageStars.forEach(star => {
            star.classList.remove('filled', 'half-filled');
        });

        if (reviews.length === 0) {
            averageRatingValue.textContent = 'No reviews yet';
            return;
        }

        // Calculate average rating
        const totalRating = reviews.reduce((sum, review) => sum + parseFloat(review.rating), 0);
        const averageRating = totalRating / reviews.length;
        const roundedRating = Math.round(averageRating * 10) / 10; // Round to 1 decimal place

        console.log("Average rating calculated:", averageRating, "Rounded:", roundedRating);

        // Update the star display
        averageStars.forEach((star, index) => {
            const starValue = index + 1;
            if (starValue <= averageRating) {
                star.classList.add('filled');
            } else if (starValue - 0.5 <= averageRating) {
                star.classList.add('half-filled');
            }
        });

        // Update the numeric rating display
        averageRatingValue.textContent = `${roundedRating.toFixed(1)} out of 5`;
    }

    // Display reviews
    function displayReviews() {
        const reviews = JSON.parse(localStorage.getItem('productReviews') || '[]');
        reviewsContainer.innerHTML = ''; // Clear existing reviews
        
        reviews.forEach(review => {
            const reviewElement = createReviewElement(review);
            reviewsContainer.appendChild(reviewElement);
        });

        updateAverageRating();
    }

    // Initial display
    displayReviews();
});