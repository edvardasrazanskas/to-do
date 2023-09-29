const todoList = [];

const submitNewTodo = document.getElementById("submit-new-todo");
const showAllBtn = document.getElementById("showAllTodos");
const showCompletedBtn = document.getElementById("showCompletedTodos");
const showUncompletedBtn = document.getElementById("showUncompletedTodos");
let id = 0;

showAllBtn.addEventListener("click", function () {
    makeThisButtonActive(showAllBtn);
    showAllTodos();
});

showCompletedBtn.addEventListener("click", function () {
    makeThisButtonActive(showCompletedBtn);
    showCompletedTodos();
});

showUncompletedBtn.addEventListener("click", function () {
    makeThisButtonActive(showUncompletedBtn);
    showUncompletedTodos();
});

submitNewTodo.addEventListener("click", function () 
{
    console.log("submit");
    const name = document.getElementById("todo_name").value;
    const description = document.getElementById("todo_description").value;
    const dueDate = document.getElementById("todo_dueDate").value;
    const priority = document.querySelector('input[name="todo_priority"]:checked').value;

    addTodo(name, description, dueDate, priority, false);    
});

const TodoItem = (id, name, description, dueDate, priority, completed) => {
    return { id, name, description, dueDate, priority, completed };
};

function addTodo (name, description, dueDate, priority, completed) {
    alert("New task was created!");
    todoList.push(TodoItem(id, name, description, dueDate, priority, completed));
    id += 1;
    sortTodos();
    showAllTodos();
};


function makeThisButtonActive(curbutton) {
    const buttons = document.querySelectorAll(".showtodoBtn");
    buttons.forEach((button) => {
        button.classList.remove("active");
    });
    curbutton.classList.add("active");
};
function changeTodoState(id) {
    const todo = todoList.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    showUncompletedTodos();
};
function sortTodos() {
    todoList.sort((a, b) => {
        if (a.dueDate > b.dueDate) return 1;
        if (a.dueDate < b.dueDate) return -1;
        if(a.dueDate === b.dueDate){
            if (a.priority < b.priority) return 1;
            if (a.priority > b.priority) return -1;
        }
        return 0;
    });
};

function showAllTodos() {
    console.log(todoList);

    const ul = document.getElementById("todo-list");

    while (ul.firstChild) ul.removeChild(ul.firstChild);

    todoList.forEach((todo) => {
        printTodo (todo, ul);
    });
};

function showUncompletedTodos() {
    console.log(todoList);

    const ul = document.getElementById("todo-list");

    while (ul.firstChild) ul.removeChild(ul.firstChild);

    todoList.forEach((todo) => {
        if(!todo.completed) printTodo(todo, ul);
    });
};

function showCompletedTodos() {
    console.log(todoList);

    const ul = document.getElementById("todo-list");

    while (ul.firstChild) ul.removeChild(ul.firstChild);

    todoList.forEach((todo) => {
        if (todo.completed) printTodo(todo, ul);
    });
};

function printTodo (todo, ul) {
    const li = document.createElement("li");
    const container = document.createElement("div");
    if (todo.completed) container.className = "todo-item-completed";
    else container.className = "todo-item-uncompleted";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todoCheckbox";
    checkbox.addEventListener("change", function (e) {
        changeTodoState(todo.id);
    });

    const name = document.createElement("div");
    name.textContent = todo.name;
    name.className = "todoName";

    const description = document.createElement("div");
    description.textContent = todo.description;
    description.className = "description";

    const dueDate = document.createElement("div");
    dueDate.textContent = todo.dueDate;
    dueDate.className = "due-date";

    const priority = document.createElement("div");
    priority.textContent = todo.priority;
    priority.className = "priority";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "deleteBtn";
    deleteBtn.addEventListener("click", function (e) {
        const index = todoList.findIndex((todo) => todo.id === todo.id);
        todoList.splice(index, 1);
        showAllTodos();
        alert("You deleted task named: " + todo.name);
    });

    container.appendChild(checkbox);
    container.appendChild(name);
    container.appendChild(description);
    container.appendChild(dueDate);
    container.appendChild(priority);
    container.appendChild(deleteBtn);

    li.appendChild(container);

    ul.appendChild(li);
};


addTodo("ZERO", "There is a lot of description to do here", "2021-03-01", 0, false);