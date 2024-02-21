import { deleteItemButton } from "./todoHelper.js";

const todoInput = document.getElementById("todo");
const todoList = document.querySelector(".todo");
const addButton = document.querySelector(".add-btn");

const getTodoList = () => {
  const todoData = JSON.parse(localStorage.getItem("todoList")) || "";
  todoData &&
    todoData.forEach((todo) => {
      if (todo.trim() !== "") {
        createTodoItem(todo.trim());
      }
    });
};

const createTodoItem = (todoText) => {
  const li = document.createElement("li");
  const text = document.createTextNode(todoText);
  li.appendChild(text);

  let deleteButton = li.querySelector("button");
  if (!deleteButton) {
    deleteButton = deleteItemButton();
    deleteButton.addEventListener("click", () => {
      deleteTodoItem(li);
    });
  }

  li.appendChild(deleteButton);
  todoList.appendChild(li);
};

const addTodoItem = () => {
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    createTodoItem(todoText);
    saveTodoList();
    todoInput.value = "";
  }
};

const saveTodoList = () => {
  const todoItems = Array.from(todoList.children)
    .map((li) => li.innerText.replace(/DELETE/, " ").trim())
    
  localStorage.setItem("todoList", JSON.stringify(todoItems));
};

const deleteTodoItem = (li) => {
  li.remove();
  saveTodoList();
};

addButton.addEventListener("click", addTodoItem);

todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodoItem();
  }
});

document.addEventListener("DOMContentLoaded", getTodoList);
