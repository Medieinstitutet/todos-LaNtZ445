import "./style.css";
document.addEventListener('DOMContentLoaded', function () {
    const todoList = [
        { task: 'Gör läxan', completed: false },
        { task: 'Träna', completed: false },
        { task: 'Handla mat', completed: false }
    ];

    const taskInput = document.getElementById('task-input');
    const todoListContainer = document.getElementById('todo-list');

    function renderTodoList() {
        todoListContainer.innerHTML = '';
        todoList.forEach((todo, index) => {
            const todoItem = document.createElement('li');
            todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            todoItem.innerHTML = `
                <span onclick="toggleDone(${index})">${todo.task}</span>
                <button onclick="removeTask(${index})">X</button>
            `;
            todoListContainer.appendChild(todoItem);
        });
    }

    window.addTask = function () {
        const newTask = taskInput.value.trim();
        if (newTask) {
            todoList.push({ task: newTask, completed: false });
            taskInput.value = '';
            renderTodoList();
        }
    };

    window.toggleDone = function (index) {
        todoList[index].completed = !todoList[index].completed;
        renderTodoList();
    };

    window.removeTask = function (index) {
        todoList.splice(index, 1);
        renderTodoList();
    };

    renderTodoList();
});