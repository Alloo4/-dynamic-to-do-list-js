document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    loadTasks();

    // Add task via button click
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        } else {
            alert('Please enter a task.');
        }
    });

    // Add task via Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText) {
                addTask(taskText);
                taskInput.value = '';
            } else {
                alert('Please enter a task.');
            }
        }
    });

    // Function to add a task to the list
    function addTask(taskText, save = true) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove task on click
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            removeFromLocalStorage(taskText);
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            saveToLocalStorage(taskText);
        }
    }

    // Save task to localStorage
    function saveToLocalStorage(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Remove task from localStorage
    function removeFromLocalStorage(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => addTask(task, false));
    }
});
