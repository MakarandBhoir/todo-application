// This file contains the JavaScript code for the ToDo application.


let tasks = [];


function addTask(task) {
    if (task) {
        tasks.push(task);
        displayTasks();
    }
}


function removeTask(index) {
    if (index > -1 && index < tasks.length) {
        tasks.splice(index, 1);
        displayTasks();
    }
}


function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeTask(index);
        li.appendChild(removeButton);
        taskList.appendChild(li);
    });
}


document.getElementById('addTaskButton').onclick = function () {
    const taskInput = document.getElementById('taskInput');
    addTask(taskInput.value);
    taskInput.value = '';
};