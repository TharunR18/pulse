// Initialize: Load todos from Local Storage when page loads
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    renderTodos(todos);
}

// CREATE: Add new task
function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    // Get existing todos from Local Storage
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Create new task object
    const newTask = {
        id: Date.now(),           // Unique ID
        text: taskText,
        completed: false,
        createdAt: new Date().toLocaleString()
    };

    // Add to array
    todos.push(newTask);

    // SAVE to Local Storage
    localStorage.setItem('todos', JSON.stringify(todos));

    // Clear input
    input.value = '';

    // Refresh display
    renderTodos(todos);
}

// READ: Display all tasks
function renderTodos(todos) {
    const todoList = document.getElementById('todoList');
    const emptyMessage = document.getElementById('emptyMessage');

    // Clear list
    todoList.innerHTML = '';

    if (todos.length === 0) {
        emptyMessage.style.display = 'block';
        return;
    }

    emptyMessage.style.display = 'none';

    // Loop through todos and create HTML
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <div class="todo-text">
                <strong>${todo.text}</strong>
                <br>
                <small style="color: #999;">${todo.createdAt}</small>
            </div>
            <div class="todo-actions">
                <button class="btn-complete" onclick="toggleComplete(${todo.id})">
                    ${todo.completed ? '↩️ Undo' : '✓ Done'}
                </button>
                <button class="btn-edit" onclick="editTask(${todo.id})">✏️ Edit</button>
                <button class="btn-delete" onclick="deleteTask(${todo.id})">🗑️ Delete</button>
            </div>
        `;

        todoList.appendChild(li);
    });
}

// UPDATE: Mark task as complete/incomplete
function toggleComplete(id) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Find task by ID
    const todo = todos.find(t => t.id === id);

    if (todo) {
        // Toggle completed status
        todo.completed = !todo.completed;

        // SAVE updated todos
        localStorage.setItem('todos', JSON.stringify(todos));

        // Refresh display
        renderTodos(todos);
    }
}

// UPDATE: Edit task text
function editTask(id) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todo = todos.find(t => t.id === id);

    if (todo) {
        const newText = prompt('Edit task:', todo.text);

        if (newText && newText.trim() !== '') {
            todo.text = newText.trim();

            // SAVE updated todos
            localStorage.setItem('todos', JSON.stringify(todos));

            // Refresh display
            renderTodos(todos);
        }
    }
}

// DELETE: Remove task
function deleteTask(id) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Filter out the deleted task
    todos = todos.filter(t => t.id !== id);

    // SAVE updated todos
    localStorage.setItem('todos', JSON.stringify(todos));

    // Refresh display
    renderTodos(todos);
}

// Run when page loads
window.addEventListener('DOMContentLoaded', loadTodos);