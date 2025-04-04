document.addEventListener('DOMContentLoaded', () => {
    // More specific selector to exclude average-stars
    const reviewStars = document.querySelectorAll('.create-review-container .star-rating .star');
    const postButton = document.querySelector('.post-button');
    let selectedRating = 0;

    reviewStars.forEach((star, index) => {
        star.addEventListener('mouseover', () => {
            // Remove all highlights first
            reviewStars.forEach(s => s.classList.remove('highlight'));
            // Add highlight to current star and all previous stars
            for (let i = 0; i <= index; i++) {
                reviewStars[i].classList.add('highlight');
            }
        });

        star.addEventListener('mouseout', () => {
            // Remove highlight class from all stars
            reviewStars.forEach(s => s.classList.remove('highlight'));
            // Re-add selected class to previously clicked stars
            if (selectedRating > 0) {
                for (let i = 0; i < selectedRating; i++) {
                    reviewStars[i].classList.add('selected');
                }
            }
        });

        star.addEventListener('click', () => {
            selectedRating = index + 1;
            // Remove all classes first
            reviewStars.forEach(s => {
                s.classList.remove('highlight', 'selected');
            });
            // Add selected class to clicked star and all previous stars
            for (let i = 0; i < selectedRating; i++) {
                reviewStars[i].classList.add('selected');
            }
        });
    });

    postButton.addEventListener('click', (e) => {
        if (selectedRating === 0) {
            e.preventDefault();
            alert('Please select a star rating before submitting your review.');
            return false;
        }
        // Continue with form submission if rating is selected
    });
});