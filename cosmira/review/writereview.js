document.addEventListener('DOMContentLoaded', () => {
    // Star rating functionality
    const reviewStars = document.querySelectorAll('.create-review-container .star-rating .star');
    const postButton = document.querySelector('.post-button');
    const errorMessage = document.querySelector('.error-message');
    const reviewTextarea = document.querySelector('.review-textarea');
    const reviewsPageBtn = document.querySelector('.create-review-page');
    let selectedRating = 0;

    // Add click handler for Reviews Page button
    reviewsPageBtn.addEventListener('click', () => {
        window.location.href = 'review.html';
    });

    // Handle star rating
    reviewStars.forEach((star, index) => {
        star.addEventListener('mousemove', (e) => {
            const rect = star.getBoundingClientRect();
            const isLeftHalf = e.clientX - rect.left < rect.width / 2;
            const currentRating = isLeftHalf ? index + 0.5 : index + 1;

            reviewStars.forEach((s, i) => {
                s.classList.remove('highlight', 'half-highlight');
                if (i < index) {
                    s.classList.add('highlight');
                } else if (i === index) {
                    s.classList.add(isLeftHalf ? 'half-highlight' : 'highlight');
                }
            });
        });

        star.addEventListener('mouseout', () => {
            reviewStars.forEach(s => s.classList.remove('highlight', 'half-highlight'));
            if (selectedRating > 0) {
                const fullStars = Math.floor(selectedRating);
                const hasHalf = selectedRating % 1 !== 0;

                reviewStars.forEach((s, i) => {
                    if (i < fullStars) {
                        s.classList.add('selected');
                    } else if (i === fullStars && hasHalf) {
                        s.classList.add('half-selected');
                    }
                });
            }
        });

        star.addEventListener('click', (e) => {
            const rect = star.getBoundingClientRect();
            const isLeftHalf = e.clientX - rect.left < rect.width / 2;
            selectedRating = isLeftHalf ? index + 0.5 : index + 1;

            reviewStars.forEach((s, i) => {
                s.classList.remove('highlight', 'half-highlight', 'selected', 'half-selected');
                if (i < index) {
                    s.classList.add('selected');
                } else if (i === index) {
                    s.classList.add(isLeftHalf ? 'half-selected' : 'selected');
                }
            });
            
            // Hide error message when star is selected
            errorMessage.style.display = 'none';
        });
    });

    // Tag system functionality
    const skinTypeBtn = document.getElementById('skinTypeBtn');
    const productTagsBtn = document.getElementById('productTagsBtn');
    const skinTypeOptions = document.querySelector('.skin-type-options');
    const productTagsOptions = document.querySelector('.product-tags-options');
    const selectedTagsContainer = document.querySelector('.selected-tags');

    // Function to close all dropdowns
    const closeDropdowns = () => {
        if (skinTypeOptions) skinTypeOptions.style.display = 'none';
        if (productTagsOptions) productTagsOptions.style.display = 'none';
    };

    // Handle clicking outside dropdowns
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.tag-section')) {
            closeDropdowns();
        }
    });

    // Toggle skin type dropdown
    if (skinTypeBtn) {
        skinTypeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (productTagsOptions) productTagsOptions.style.display = 'none';
            if (skinTypeOptions) {
                skinTypeOptions.style.display = skinTypeOptions.style.display === 'none' ? 'block' : 'none';
            }
        });
    }

    // Toggle product tags dropdown
    if (productTagsBtn) {
        productTagsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (skinTypeOptions) skinTypeOptions.style.display = 'none';
            if (productTagsOptions) {
                productTagsOptions.style.display = productTagsOptions.style.display === 'none' ? 'block' : 'none';
            }
        });
    }

    // Create and add a tag element
    const createTagElement = (text, type) => {
        const tagElement = document.createElement('div');
        tagElement.className = 'selected-tag';
        tagElement.setAttribute('data-type', type);
        tagElement.textContent = text;

        // Add click handler to remove tag
        tagElement.addEventListener('click', () => {
            tagElement.remove();
        });

        return tagElement;
    };

    // Handle tag selection
    document.querySelectorAll('.tag-option').forEach(option => {
        option.addEventListener('click', () => {
            const tagType = option.getAttribute('data-type');
            const tagText = option.textContent;

            // Remove existing skin type if selecting a new one
            if (tagType === 'skin') {
                const existingSkinTags = selectedTagsContainer.querySelectorAll('.selected-tag[data-type="skin"]');
                existingSkinTags.forEach(tag => tag.remove());
            }

            // Check if tag already exists
            const existingTags = selectedTagsContainer.querySelectorAll('.selected-tag');
            let tagExists = false;
            existingTags.forEach(tag => {
                if (tag.textContent === tagText) {
                    tagExists = true;
                }
            });

            // Add new tag if it doesn't exist
            if (!tagExists) {
                const tagElement = createTagElement(tagText, tagType);
                selectedTagsContainer.appendChild(tagElement);
            }

            closeDropdowns();
        });
    });

    // Handle post button click
    postButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (selectedRating === 0) {
            errorMessage.style.display = 'block';
            return;
        }

        // Get selected tags
        const selectedTags = Array.from(selectedTagsContainer.querySelectorAll('.selected-tag')).map(tag => ({
            type: tag.getAttribute('data-type'),
            text: tag.textContent
        }));

        // Get the review text
        const reviewText = reviewTextarea.value;

        // Create the review object
        const review = {
            rating: selectedRating,
            text: reviewText,
            tags: selectedTags,
            date: new Date().toISOString(),
            // In a real app, you would get these from the server
            username: 'Current User',
            profilePic: '../assests/img/profilepicture1.jpg'
        };

        // Store the review in localStorage (in a real app, this would be sent to a server)
        const reviews = JSON.parse(localStorage.getItem('productReviews') || '[]');
        reviews.unshift(review); // Add new review to the beginning
        localStorage.setItem('productReviews', JSON.stringify(reviews));

        // Redirect to reviews page
        window.location.href = 'review.html';
    });
});