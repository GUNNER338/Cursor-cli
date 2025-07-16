// Select elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Array to hold todos
let todos = [];

// Function to render todos
function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        // Create li element
        const li = document.createElement("li");
       
        // Create span for text
        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = todo.text;

        // Create actions div
        const actions = document.createElement("div");
        actions.className = "todo-actions";

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.className = "edit";
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editTodo(index);

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete";
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTodo(index);

        // Append buttons to actions
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        // Append text and actions to li
        li.appendChild(span);
        li.appendChild(actions);
        
        // Append li to list
        todoList.appendChild(li);
    });
}

// Function to add a todo
function addTodo(text) {
    todos.push({ text });
    renderTodos();
}

// Function to delete a todo
function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

// Function to edit a todo
function editTodo(index) {
    // Prompt user for new todo text
    const newText = prompt("Edit your todo:", todos[index].text);
    if (newText !== null && newText.trim() !== "") {
        todos[index].text = newText;
        renderTodos();
    }
}

// Handle form submission
// This handles CREATE operation
 todoForm.onsubmit = function(event) {
    event.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText !== "") {
        addTodo(todoText);
        todoInput.value = "";
    }
};

// Initial render
renderTodos();

