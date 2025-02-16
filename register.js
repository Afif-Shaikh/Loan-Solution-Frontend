// Simulating a simple user database for demo purposes
let usersDatabase = [];

// Function to validate registration form
function validateRegistration(event) {
    event.preventDefault();  // Prevent form submission for validation

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errorMessage = document.getElementById("error-message");

    // Clear any previous error message
    errorMessage.textContent = "";

    // Basic validation: Check if all fields are filled
    if (!username || !password || !confirmPassword) {
        errorMessage.textContent = "All fields are required.";
        return;
    }

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match.";
        return;
    }

    // Check if the username already exists
    const userExists = usersDatabase.some(user => user.username === username);
    if (userExists) {
        errorMessage.textContent = "Username already exists. Please choose a different one.";
        return;
    }

    // Simulate storing the new user in the database
    usersDatabase.push({ username, password });

    // Success message
    alert("Registration successful! You can now log in.");

    // Redirect to the login page after successful registration
    //window.location.href = "login.html";
}

// Attach event listener to the registration form
document.getElementById("registerForm").addEventListener("submit", validateRegistration);
