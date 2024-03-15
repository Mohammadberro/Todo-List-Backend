function loadUsersFromLocalStorage() {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
}

function saveUsersToLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
    console.log('Users saved to local storage:', users);
}


let users = loadUsersFromLocalStorage();
console.log('Users loaded from local storage:', users);


function addUser(email, username, password) {
    const existingUser = users.find(user => user.email === email || user.username === username);

    if (existingUser) {
        alert("Email or username already exists. Please choose a different one.");
        return;
    }

    users.push({ email, username, password });
    saveUsersToLocalStorage(users);
}


function authenticate(emailOrUsername, password) {
    const user = users.find(u => u.email === emailOrUsername || u.username === emailOrUsername);

    if (user && user.password === password) {
        return user;
    } else {
        return null;
    }
}

function handleSignUp(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch('http://localhost/todo_users/signup.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            username: username,
            password: password
        })
    })
    .then(response => response.text())
    .then(message => {
        if (message === "User registered successfully!") {
            window.location.href = `/pages/todo.html?email=${email}&username=${username}`;
        } else {
            alert(message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function handleLogin(event) {
    event.preventDefault();

    const usernameOrEmail = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch('http://localhost/todo_users/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emailOrUsername: usernameOrEmail,
            password: password
        })
    })
    .then(response => response.text())
    .then(message => {
        if (message === "Login successful!") {
            const user = { email: usernameOrEmail, username: 'example_username' };
            window.location.href = `/pages/todo.html?email=${user.email}&username=${user.username}`;
        } else {
            alert(message);
        }
    })
}

function showSignUpForm() {
    let emailField = document.getElementById("emailField");
    let toggleText = document.getElementById("toggleText");
    let submitButton = document.getElementById("submitButton");
    let usernameInput = document.getElementById("username");
    let loginForm = document.getElementById("loginForm");

    emailField.style.display = "flex";
    toggleText.innerHTML = "Already have an account? <a id='toggleLink' href='#' onclick='showLoginForm()'>Login</a>";
    submitButton.innerHTML = "Sign up";
    usernameInput.placeholder = "Username";
    let emailInput = emailField.querySelector("input");
    emailInput.placeholder = "Email";
    emailInput.setAttribute("required", "true");
    loginForm.removeAttribute("action");
    loginForm.removeAttribute("onsubmit");
    document.getElementById("loginForm").setAttribute("onsubmit", "event.preventDefault(); handleSignUp(event);");
}

function showLoginForm() {
    let emailField = document.getElementById("emailField");
    let toggleText = document.getElementById("toggleText");
    let submitButton = document.getElementById("submitButton");
    let usernameInput = document.getElementById("username");
    let loginForm = document.getElementById("loginForm");

    emailField.style.display = "none";
    toggleText.innerHTML = "Don't have an account? <a id='toggleLink' href='#' onclick='showSignUpForm()'>Sign up</a>";
    submitButton.innerHTML = "Log in";
    usernameInput.placeholder = "Email / Username";
    let emailInput = emailField.querySelector("input");
    emailInput.removeAttribute("required");
    loginForm.removeAttribute("action");
    loginForm.removeAttribute("onsubmit");
    document.getElementById("loginForm").setAttribute("onsubmit", "event.preventDefault(); handleLogin(event);");
}

showLoginForm();