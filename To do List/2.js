document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask(event) {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const todoList = document.getElementById('todoList');
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(taskText));

    const deleteButton = document.createElement('button');
    deleteButton.appendChild(document.createTextNode('Delete'));
    deleteButton.className = 'delete';
    deleteButton.onclick = () => {
        todoList.removeChild(li);
        saveTasks();
    };

    const completeButton = document.createElement('button');
    completeButton.appendChild(document.createTextNode('Complete'));
    completeButton.className = 'complete';
    completeButton.onclick = () => {
        li.classList.toggle('completed');
        saveTasks();
    };

    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    todoList.appendChild(li);

    taskInput.value = '';
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#todoList li').forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const todoList = document.getElementById('todoList');
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }
        li.appendChild(document.createTextNode(task.text));

        const deleteButton = document.createElement('button');
        deleteButton.appendChild(document.createTextNode('Delete'));
        deleteButton.className = 'delete';
        deleteButton.onclick = () => {
            todoList.removeChild(li);
            saveTasks();
        };

        const completeButton = document.createElement('button');
        completeButton.appendChild(document.createTextNode('Complete'));
        completeButton.className = 'complete';
        completeButton.onclick = () => {
            li.classList.toggle('completed');
            saveTasks();
        };

        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}
