document.addEventListener("DOMContentLoaded", () => {
  // Function to update average rating display
  function updateAverageRating() {
    const reviews = document.querySelectorAll('.review');
    const averageStars = document.querySelectorAll('.average-stars .star');
    const averageRatingValue = document.querySelector('.average-rating-value');
    
    // Reset all stars first
    averageStars.forEach(star => {
      star.classList.remove('filled', 'half-filled');
    });

    if (reviews.length === 0) {
      // No reviews yet
      averageRatingValue.textContent = 'No reviews yet';
      return;
    }

    // Calculate average rating
    let totalRating = 0;
    reviews.forEach(review => {
      const ratingText = review.querySelector('.rating').textContent;
      const rating = parseFloat(ratingText.replace('★', '').trim());
      totalRating += rating;
    });
    
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

  // Call the function when the page loads
  updateAverageRating();
});