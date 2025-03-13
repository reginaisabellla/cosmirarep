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



