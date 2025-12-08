
// ToDo App: Spec-compliant implementation
const LOCAL_STORAGE_KEY = 'todos';
let tasks = [];

// Load tasks from localStorage
const loadTasks = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    tasks = saved ? JSON.parse(saved) : [];
};

// Save tasks to localStorage
const saveTasks = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
};

// Render all tasks
const renderTodos = () => {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(({ id, text, completed }, idx) => {
        const li = document.createElement('li');
        li.className = completed ? 'todo-item completed' : 'todo-item';

        // Checkbox for completion
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        checkbox.className = 'todo-checkbox';
        checkbox.onchange = () => toggleComplete(id);
        li.appendChild(checkbox);

        // Task text
        const span = document.createElement('span');
        span.textContent = text;
        li.appendChild(span);

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'todo-delete';
        deleteBtn.onclick = () => deleteTask(id);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
};

// Add a new task
const addTask = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTask = {
        id: Date.now(),
        text: trimmed,
        completed: false
    };
    tasks.push(newTask);
    saveTasks();
    renderTodos();
};

// Delete a task by id
const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTodos();
};

// Toggle completion
const toggleComplete = (id) => {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTodos();
};

// Event listeners
document.getElementById('addTaskButton').onclick = () => {
    const input = document.getElementById('taskInput');
    addTask(input.value);
    input.value = '';
};

document.getElementById('taskInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask(e.target.value);
        e.target.value = '';
    }
});

// Initial load
loadTasks();
renderTodos();