document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded");
  inputFunctions();
});

function inputFunctions() {
  const form = document.getElementById("form-container");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (addInputValidation()) {
      const savedData = JSON.parse(localStorage.getItem("formData")) || {};
      const nameInput = document.getElementById("name").value;
      const emailInput = document.getElementById("email").value;
      const passInput = document.getElementById("password").value;

      if (
        savedData.name === nameInput &&
        savedData.email === emailInput &&
        savedData.password === passInput
      ) {
        window.location.href = "index.html";
      } else {
        saveFormData();
        alert("Sign-up details do not match. Please try again.");
      }
      resetForm();
    }
  });
}

// Validate form inputs
function addInputValidation() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passInput = document.getElementById("password");
  const termCheckbox = document.getElementById("terms");
  const newsCheckbox = document.getElementById("newsletter");

  let isValid = true;

  // Validate name input
  if (nameInput.value.trim() === "") {
    setErrorMessage("name-error", "Name is required");
    isValid = false;
  } else {
    clearErrorMessages("name-error");
  }

  // Validate email input
  if (emailInput.value.trim() === "") {
    setErrorMessage("email-error", "Email is required");
    isValid = false;
  } else {
    clearErrorMessages("email-error");
  }

  // Validate password input
  if (passInput.value.trim() === "") {
    setErrorMessage("password-error", "Password is required");
    isValid = false;
  } else {
    clearErrorMessages("password-error");
  }

  // Validate terms checkbox
  if (!termCheckbox.checked) {
    setErrorMessage("terms-error", "You must agree to the Terms & Conditions");
    isValid = false;
  } else {
    clearErrorMessages("terms-error");
  }

  // Validate newsletter checkbox
  if (!newsCheckbox.checked) {
    setErrorMessage(
      "newsletter-error",
      "You must agree to receive the Newsletter"
    );
    isValid = false;
  } else {
    clearErrorMessages("newsletter-error");
  }

  return isValid;
}

// Set error message for a specific element
function setErrorMessage(elementId, message) {
  document.getElementById(elementId).textContent = message;
}

// Clear error messages for a specific element
function clearErrorMessages(elementId) {
  document.getElementById(elementId).textContent = "";
}

// Reset the form and clear error messages
function resetForm() {
  const form = document.getElementById("form-container");
  const errorMessages = document.querySelectorAll(".error-message");

  errorMessages.forEach((message) => {
    message.textContent = "";
  });

  form.reset();
}

// Save form data to local storage
function saveFormData() {
  const nameInput = document.getElementById("name").value;
  const emailInput = document.getElementById("email").value;
  const passInput = document.getElementById("password").value;
  const termCheckbox = document.getElementById("terms").checked;
  const newsCheckbox = document.getElementById("newsletter").checked;

  const formData = {
    name: nameInput,
    email: emailInput,
    password: passInput,
    terms: termCheckbox,
    newsletter: newsCheckbox,
  };

  localStorage.setItem("formData", JSON.stringify(formData));
}
