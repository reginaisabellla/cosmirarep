const form = document.getElementById('quiz-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  
    let skinColor = document.forms["quiz-form"]["skin-colortest"].value;
    if (skinColor == "") {
        let errorSpan = document.getElementById("skin-color-error");
        errorSpan.textContent = "Please choose a skin color.";
        errorSpan.style.display = "block";
        errorSpan.style.textAlign = "center";
        errorSpan.style.color = "red";
        return false;
    }
    
    window.location.href = "../results/result.html";

    //og code just saved here for later reference
    /* document.addEventListener("DOMContentLoaded", function () {
    console.log("quiz.js is loaded!");

    document.getElementById("quiz-form").addEventListener("submit", async function (event) {
        event.preventDefault();
        console.log("Form submitted! Preventing page reload...");

        // Collect quiz answers
        const answers = {
            skinColor: document.querySelector('input[name="skin-color"]:checked')?.value || null,
            skinType: document.querySelector('input[name="skin-type"]:checked')?.value || null
        };

        console.log("Submitting quiz answers:", answers);

        try {
            const response = await fetch("https://cosmiratest.onrender.com/api/match-results", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(answers)
            });

            if (!response.ok) throw new Error("Failed to fetch match results.");

            const data = await response.json();
            console.log("Received match results:", data);

            // Redirect user to results.html with product data
            const redirectURL = `/cosmira/results/result.html?products=${encodeURIComponent(JSON.stringify(data.products))}`;
            console.log("Redirecting to:", redirectURL);

            window.location.href = redirectURL;
        } catch (error) {
            console.error("Error fetching match results:", error);
            alert("There was an error fetching match results. Please try again.");
        }
    });
});

    */


    //test out later
    /*function validateFields(fields) {
        let isValid = true;
        let errorMessage = "";
        for (let i = 0; i < fields.length; i++) {
          let field = fields[i];
          let fieldValue = field.value.trim();
          if (fieldValue === "") {
            errorMessage += ${field.name} is required.\n;
            isValid = false;
          } else if (field.type === "email" && !validateEmail(fieldValue)) {
            errorMessage += Invalid email address.\n;
            isValid = false;
          } else if (field.type === "phone" && !validatePhone(fieldValue)) {
            errorMessage += Invalid phone number.\n;
            isValid = false;
          }
        }
        if (!isValid) {
          alert(errorMessage);
          return false;
        }
        return true;
      }
      // Example usage:
      let fields = [
        document.getElementById("name"),
        document.getElementById("email"),
        document.getElementById("phone"),
        document.getElementById("skin-colortest")
      ];
      if (!validateFields(fields)) {
        return false;
      }*/

    




/*fetch('/submit-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  });.*/


});



