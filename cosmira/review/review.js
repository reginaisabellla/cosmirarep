document.addEventListener("DOMContentLoaded", () => {
    const reviewsContainer = document.querySelector('.reviews-container');
    const createReviewBtn = document.querySelector('.create-review');

    // Add click handler for create review button
    createReviewBtn.addEventListener('click', () => {
        window.location.href = 'writereview.html';
    });

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
    }

    // Function to create tags HTML
    function createTagsHtml(tags) {
        return tags.map(tag => `
            <span class="tag ${tag.type}-tag">${tag.text}</span>
        `).join('');
    }

    // Function to create a review element
    function createReviewElement(review) {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';
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
            </div>
            <button class="delete-review">Delete</button>
        `;

        // Add delete functionality
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

        return reviewElement;
    }

    // Function to update average rating display
    function updateAverageRating() {
        const reviews = JSON.parse(localStorage.getItem('productReviews') || '[]');
        const averageStars = document.querySelectorAll('.average-stars .star');
        const averageRatingValue = document.querySelector('.average-rating-value');
        
        // Reset all stars first
        averageStars.forEach(star => {
            star.classList.remove('filled', 'half-filled');
        });

        if (reviews.length === 0) {
            averageRatingValue.textContent = 'No reviews yet';
            return;
        }

        // Calculate average rating
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;
        const roundedRating = Math.round(averageRating * 10) / 10; // Round to 1 decimal place

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