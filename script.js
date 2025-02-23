const passwordField = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-display");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateBtn = document.getElementById("generate-btn");
const copyBtn = document.getElementById("copy-btn");
const strengthIndicator = document.getElementById("strength-indicator");
const darkModeToggle = document.getElementById("dark-mode-toggle");

const toggleDarkMode = document.getElementById("darkModeToggle"); 
const body = document.body;

const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

lengthSlider.addEventListener("input", () => {
    lengthDisplay.textContent = lengthSlider.value;
});

generateBtn.addEventListener("click", generatePassword);

function generatePassword() {
    let allChars = "";
    let password = "";

    if (uppercaseCheckbox.checked) allChars += uppercaseChars;
    if (lowercaseCheckbox.checked) allChars += lowercaseChars;
    if (numbersCheckbox.checked) allChars += numberChars;
    if (symbolsCheckbox.checked) allChars += symbolChars;

    if (allChars.length === 0) {
        passwordField.value = "Select at least one option!";
        strengthIndicator.textContent = "Weak";
        strengthIndicator.style.color = "red";
        return;
    }

    for (let i = 0; i < lengthSlider.value; i++) {
        let randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    passwordField.value = password;
    checkStrength(password);
}

function checkStrength(password) {
    let strength = "Weak";
    let color = "red";

    if (password.length > 10 && /[A-Z]/.test(password) && /\d/.test(password) && /[\W]/.test(password)) {
        strength = "Strong";
        color = "green";
    } else if (password.length > 8 && (/[A-Z]/.test(password) || /\d/.test(password))) {
        strength = "Medium";
        color = "orange";
    }

    strengthIndicator.textContent = strength;
    strengthIndicator.style.color = color;
}

copyBtn.addEventListener("click", () => {
    if (passwordField.value.length > 0) {
        navigator.clipboard.writeText(passwordField.value);
        copyBtn.textContent = "Copied! ✅";
        
        // Reset the button text after 2 seconds
        setTimeout(() => {
            copyBtn.textContent = "📋 Copy";
        }, 2000);
    } else {
        alert("Generate a password first!");
    }
});


// Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        darkModeToggle.textContent = "☀️";
    } else {
        darkModeToggle.textContent = "🌙";
    }
});

toggleDarkMode.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Change password text color based on mode
    if (body.classList.contains("dark-mode")) {
        passwordField.style.color = "#ffffff";  // Light text in dark mode
    } else {
        passwordField.style.color = "#000000";  // Dark text in light mode
    }
});