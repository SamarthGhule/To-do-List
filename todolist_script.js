document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach(function (task, index) {
            const li = document.createElement("li");
            li.innerHTML = `
            <span class='txt'>${task}</span>
            <div class="fix">
                <button class="editButton" data-index="${index}">Edit</button>
                <button class="deleteButton" data-index="${index}">Delete</button>
            <div>
                `;
            taskList.appendChild(li);
        });
    }

    renderTasks();

    // Add task
    addTaskButton.addEventListener("click", function () {
        const newTask = taskInput.value.trim();
        if (newTask !== "") {
            tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
            taskInput.value = "";
        }
    });

    // Edit task
    taskList.addEventListener("click", function (event) {
        if (event.target.classList.contains("editButton")) {
            const index = event.target.getAttribute("data-index");
            const editedTask = prompt("Edit task:", tasks[index]);
            if (editedTask !== null) {
                tasks[index] = editedTask;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                renderTasks();
            }
        }
    });

    // Delete task
    taskList.addEventListener("click", function (event) {
        if (event.target.classList.contains("deleteButton")) {
            const index = event.target.getAttribute("data-index");
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        }
    });
});
