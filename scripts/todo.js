function openPopup() {
    document.getElementById("todo-popup").classList.add("open-popup");
}

function removePopup() {
    document.getElementById("todo-popup").classList.remove("open-popup");
}

function addTodo() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    fetch('http://localhost/todo_users/create_todo.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: 1,
            title: title,
            description: description,
            completed: 0
        })
    })
    .then(response => response.text())
    .then(message => {
        if (message === "Todo created successfully.") {
            location.reload();
        } else {
            alert(message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
