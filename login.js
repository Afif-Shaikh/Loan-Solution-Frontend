// Simulating a user data for validation purposes
const validUsername = "user";
const validPassword = "pass";

// Function to validate login
function validateLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Clear any previous error message
    errorMessage.textContent = "";

    if (username === validUsername && password === validPassword) {
        alert("Login successful!");
        // Redirect to the LMS dashboard or home page
        window.location.href = "dashboard.html";  // Redirect to dashboard after login
        return false; // Prevent form submission for demonstration
    } else {
        alert("Invalid username or password. Please try again.");
        // errorMessage.textContent = "Invalid username or password. Please try again.";
        return false; // Prevent form submission to simulate login failure
    }
}
