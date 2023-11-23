document.addEventListener('DOMContentLoaded', function () {
    let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    const todoForm = document.getElementById('todo-form');
    const todoListContainer = document.getElementById('todo-list');

    const taskInput = createInputElement('text', 'Skapa en ny uppgift...', true);
    const submitButton = createButtonElement('submit', '+');

    todoForm.appendChild(taskInput);
    todoForm.appendChild(submitButton);

    renderTodoList();

    submitButton.addEventListener('click', function () {
        const inputValue = taskInput.value.trim();
        if (inputValue !== "") {
            const newId = Date.now();
            todoList.push({ id: newId, task: inputValue, completed: false });
            taskInput.value = '';
            renderTodoList();
            updateLocalStorage();
        }
    });

    todoForm.addEventListener('submit', function (event) {
        event.preventDefault(); 
    });

    function renderTodoList() {
        todoListContainer.innerHTML = '';
        todoList.forEach(todo => {
            const li = document.createElement('li');
            li.className = todo.completed ? 'completed' : 'task';
            li.setAttribute('data-id', todo.id);
            li.innerHTML = `
                <span onclick="toggleDone(${todo.id})">${todo.task}</span>
                <button class="remove-btn" onclick="removeTask(${todo.id})">X</button>
            `;
            todoListContainer.appendChild(li);
        });
    }

    function updateLocalStorage() {
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }

    function createInputElement(type, placeholder, required) {
        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        input.required = required;
        return input;
    }

    function createButtonElement(type, textContent) {
        const button = document.createElement('button');
        button.type = type;
        button.textContent = textContent;
        return button;
    }

    window.toggleDone = function (taskId) {
        const todo = todoList.find(todo => todo.id === taskId);
        if (todo) {
            todo.completed = !todo.completed;
            renderTodoList();
            updateLocalStorage();
        }
    };

    window.removeTask = function (taskId) {
        todoList = todoList.filter(todo => todo.id !== taskId);
        renderTodoList();
        updateLocalStorage();
    };
});
