// filepath: c:\Users\linds\OneDrive\Documents\GitHub\cosmirarep\cosmira\review\writereview.js
document.addEventListener('DOMContentLoaded', () => {    
    // Star rating functionality
    const reviewStars = document.querySelectorAll('.create-review-container .star-rating .star');
    const postButton = document.querySelector('.post-button');
    const errorMessage = document.querySelector('.error-message');
    const reviewTextarea = document.querySelector('.review-textarea');
    const reviewsPageBtn = document.querySelector('.reviews-page');
    const photoInput = document.getElementById('photo-input');
    const photoLabel = document.querySelector('.photo-label');
    const imagePreviewContainer = document.querySelector('.image-preview-container');
    const imagePreview = document.getElementById('image-preview');
    let selectedRating = 0;
    let uploadedPhoto = null;
    let isEditMode = false;
    let editingReview = null;

    // Check if we're in edit mode by looking for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    isEditMode = urlParams.get('edit') === 'true';

    // Tag system functionality
    const skinTypeBtn = document.getElementById('skinTypeBtn');
    const productTagsBtn = document.getElementById('productTagsBtn');
    const skinTypeOptions = document.querySelector('.skin-type-options');
    const productTagsOptions = document.querySelector('.product-tags-options');
    const selectedTagsContainer = document.querySelector('.selected-tags');    // Load the editing review if in edit mode
    if (isEditMode) {
        editingReview = JSON.parse(localStorage.getItem('editingReview') || 'null');
        
        if (editingReview) {
            // Pre-fill the form with existing data
            prePopulateForm(editingReview);
            // Change button text
            if (postButton) {
                postButton.textContent = 'Update Review';
            }
            // Change heading text
            const reviewHeading = document.querySelector('.create-review-heading');
            if (reviewHeading) {
                reviewHeading.textContent = 'Edit Review';
            }
            // Show back button in edit mode
            const backButton = document.querySelector('.back-arrow-button');
            if (backButton) {
                backButton.style.display = 'flex';
            }
        } else {
            // If no edit data found, revert to normal mode
            isEditMode = false;
        }
    }

    // Function to pre-populate the form with existing review data
    function prePopulateForm(review) {
        // Set the rating
        if (review.rating) {
            selectedRating = parseFloat(review.rating);
            const fullStars = Math.floor(selectedRating);
            const hasHalf = selectedRating % 1 !== 0;

            reviewStars.forEach((s, i) => {
                s.classList.remove('selected', 'half-selected');
                if (i < fullStars) {
                    s.classList.add('selected');
                } else if (i === fullStars && hasHalf) {
                    s.classList.add('half-selected');
                }
            });
        }

        // Set the review text
        if (review.text) {
            reviewTextarea.value = review.text;
        }        // Set the tags - directly create and append tag elements
        if (review.tags && review.tags.length > 0 && selectedTagsContainer) {
            // Clear existing tags first
            selectedTagsContainer.innerHTML = '';
            
            // Sort tags to ensure skin types appear first
            const sortedTags = [...review.tags].sort((a, b) => {
                // Skin tags come first, product tags come second
                if (a.type === 'skin' && b.type === 'product') return -1;
                if (a.type === 'product' && b.type === 'skin') return 1;
                return 0;
            });
            
            // Add each tag
            sortedTags.forEach(tag => {
                const tagElement = document.createElement('div');
                tagElement.className = 'selected-tag';
                tagElement.setAttribute('data-type', tag.type);
                tagElement.setAttribute('data-value', tag.text); // Add data-value attribute for CSS targeting
                tagElement.textContent = tag.text;
                
                // Add click handler to remove tag
                tagElement.addEventListener('click', () => {
                    tagElement.remove();
                });
                
                selectedTagsContainer.appendChild(tagElement);
            });
        }

        // Set the photo if exists
        if (review.photo) {
            imagePreview.src = review.photo;
            imagePreviewContainer.style.display = 'block';
            // Store the photo data for update
            uploadedPhoto = review.photo;
        }
    }    // Add click handler for Reviews Page button
    reviewsPageBtn.addEventListener('click', () => {
        window.location.href = 'review.html';
    });

    // Add click handler for back button (shown in edit mode)
    const backButton = document.querySelector('.back-arrow-button');
    if (backButton) {
        backButton.addEventListener('click', () => {
            // Clear the editing state
            localStorage.removeItem('editingReview');
            // Go back to review page
            window.location.href = 'review.html';
        });
    }

    // Simple photo upload implementation
    // Connect the label to the input for easier file selection
    photoLabel.addEventListener('click', function(e) {
        // Prevent any default action
        e.preventDefault();
        // Trigger the file input click
        photoInput.click();
    });
    
    // We're adding a clean click handler directly to the input
    photoInput.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            uploadedPhoto = this.files[0];
            
            // Use FileReader to display the image
            const reader = new FileReader();
            reader.onload = function(e) {
                // Set the preview image source
                imagePreview.src = e.target.result;
                // Show the image container
                imagePreviewContainer.style.display = 'block';
            };
            reader.readAsDataURL(this.files[0]);
        }
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
    }    // Create and add a tag element
    const createTagElement = (text, type) => {
        const tagElement = document.createElement('div');
        tagElement.className = 'selected-tag';
        tagElement.setAttribute('data-type', type);
        tagElement.setAttribute('data-value', text); // Add a data-value attribute to help with CSS targeting
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

            // Check if tag already exists
            const existingTags = selectedTagsContainer.querySelectorAll('.selected-tag');
            let tagExists = false;
            existingTags.forEach(tag => {
                if (tag.textContent === tagText) {
                    tagExists = true;
                }
            });

            // Handle skin type tags
            if (tagType === 'skin') {
                // Special case for "add-on" skin types ("Sensitive" and "Mature Skin")
                const isAddOn = tagText === 'Sensitive' || tagText === 'Mature Skin';
                
                if (isAddOn) {
                    // Check if we already have this tag
                    if (tagExists) {
                        closeDropdowns();
                        return;
                    }
                    
                    // Check if we already have another add-on type
                    const skinTags = selectedTagsContainer.querySelectorAll('.selected-tag[data-type="skin"]');
                    let hasAnotherAddOn = false;
                    
                    skinTags.forEach(tag => {
                        const tagContent = tag.textContent;
                        if ((tagContent === 'Sensitive' || tagContent === 'Mature Skin') && tagContent !== tagText) {
                            // Remove the existing add-on before adding a new one
                            tag.remove();
                        }
                    });
                    
                    // Add as an additional tag (max 2 skin types if one is an add-on)
                    if (skinTags.length === 0 || skinTags.length === 1) {
                        const tagElement = createTagElement(tagText, tagType);
                        selectedTagsContainer.appendChild(tagElement);
                    }
                } else {
                    // For main skin types, remove all existing main skin types but keep add-ons
                    const existingSkinTags = selectedTagsContainer.querySelectorAll('.selected-tag[data-type="skin"]');
                    
                    existingSkinTags.forEach(tag => {
                        // Keep "Sensitive" and "Mature Skin" tags, remove other skin types
                        if (tag.textContent !== 'Sensitive' && tag.textContent !== 'Mature Skin') {
                            tag.remove();
                        }
                    });
                    
                    // Add the new skin type if it doesn't exist
                    if (!tagExists) {
                        const tagElement = createTagElement(tagText, tagType);
                        selectedTagsContainer.appendChild(tagElement);
                    }
                }
            } 
            // Handle product tags - limit to 5
            else if (tagType === 'product') {
                const productTags = selectedTagsContainer.querySelectorAll('.selected-tag[data-type="product"]');
                
                // Check if we've reached the limit of 5 product tags
                if (productTags.length >= 5 && !tagExists) {
                    // Optional: Show an alert or message that the limit is reached
                    alert('You can only select up to 5 product tags.');
                    closeDropdowns();
                    return;
                }
                
                // Add new product tag if it doesn't exist and we're under the limit
                if (!tagExists) {
                    const tagElement = createTagElement(tagText, tagType);
                    selectedTagsContainer.appendChild(tagElement);
                }
            }

            closeDropdowns();
        });
    });

    // Handle post button click
    postButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (selectedRating === 0) {
            errorMessage.style.display = 'block';
        } else {
            // Get selected tags
            const selectedTags = Array.from(selectedTagsContainer.querySelectorAll('.selected-tag')).map(tag => ({
                type: tag.getAttribute('data-type'),
                text: tag.textContent
            }));

            // Get the review text
            const reviewText = reviewTextarea.value;

            // Handle photo data differently based on whether it's a file or a data URL
            if (uploadedPhoto instanceof File) {
                // For new upload (File object)
                const reader = new FileReader();
                reader.readAsDataURL(uploadedPhoto);
                reader.onload = function() {
                    saveReview(selectedRating, reviewText, selectedTags, reader.result);
                };
            } else {
                // For existing photo or no photo
                saveReview(selectedRating, reviewText, selectedTags, uploadedPhoto);
            }
        }
    });

    // Function to save the review
    function saveReview(rating, text, tags, photoData) {
        // Create the review object
        const review = {
            rating: rating,
            text: text,
            tags: tags,
            photo: photoData,
            // In a real app, you would get these from the server
            username: 'Current User',
            profilePic: '../assests/img/profilepicture1.jpg'
        };

        // Get existing reviews from localStorage
        const reviews = JSON.parse(localStorage.getItem('productReviews') || '[]');

        if (isEditMode && editingReview) {
            // Find the review to update
            const reviewIndex = reviews.findIndex(r => r.date === editingReview.date);
            
            if (reviewIndex > -1) {
                // Keep the original date and add it to the updated review
                review.date = editingReview.date;
                // Replace the old review with the updated one
                reviews[reviewIndex] = review;
                // Clear the editing state
                localStorage.removeItem('editingReview');
            } else {
                // If the review to edit is not found, add as new with current date
                review.date = new Date().toISOString();
                reviews.unshift(review);
            }
        } else {
            // For new reviews, add the current date
            review.date = new Date().toISOString();
            // Add new review to the beginning of the array
            reviews.unshift(review);
        }

        // Save updated reviews
        localStorage.setItem('productReviews', JSON.stringify(reviews));

        // Redirect to reviews page
        window.location.href = 'review.html';
    }
});