function showSignUpForm() {
    let usernameField = document.getElementById("usernameField");
    let toggleText = document.getElementById("toggleText");
    let submitButton = document.getElementById("submitButton");
    let emailInput = document.getElementById("email");

    usernameField.style.display = "flex"; 
    toggleText.innerHTML = "Already have an account? <a id='toggleLink' href='#'>Login</a>";
    submitButton.innerHTML = "Sign up";
    emailInput.placeholder = "Email";
    let loginLink = toggleText.querySelector("#toggleLink");
    loginLink.addEventListener("click", function(event) {
        showLoginForm();
    });
}

function showLoginForm() {
    let usernameField = document.getElementById("usernameField");
    let toggleText = document.getElementById("toggleText");
    let submitButton = document.getElementById("submitButton");
    let emailInput = document.getElementById("email");

    usernameField.style.display = "none";
    toggleText.innerHTML = "Don't have an account? <a id='toggleLink' href='#'>Sign up</a>";
    submitButton.innerHTML = "Log in";
    emailInput.placeholder = "Email / Username"; 

    let signUpLink = toggleText.querySelector("#toggleLink");
    signUpLink.addEventListener("click", function(event) {
        showSignUpForm();
    });
}

showLoginForm();
