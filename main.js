// Sélection des éléments du DOM
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const btnAdd = document.getElementById("add-btn");
const filterAll = document.getElementById('filterAll');
const filterCompleted = document.getElementById('filterCompleted');
const filterActive = document.getElementById('filterActive');


// État global de l'application
let tasks = loadTasks();
let taskBeingEdited = null;
let currentFilter = "all";


// Charger les tâches depuis le localStorage
function loadTasks() {
  return JSON.parse(localStorage.getItem("mytodolist")) || [];
}


// Sauvegarder les tâches dans le localStorage
function saveTasks() {
  return localStorage.setItem("mytodolist", JSON.stringify(tasks));
}


// Ajouter ou modifier une tâche
function addTask() {
  const textTask = input.value.trim();

  if (!textTask) return;

  if (taskBeingEdited === null) {
    tasks.unshift({
      id: Date.now(),
      text: textTask,
      completed: false,
    });
  } else {
    const task = tasks.find(t => t.id === taskBeingEdited);
    
    if (task) {
      task.text = textTask;
    }

    taskBeingEdited = null;
    btnAdd.textContent = "Add";
  }

  input.value = "";
  saveTasks();
  render();
}


// Afficher les tâches selon le filtre actif
function render() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  }

  if (currentFilter === "active") {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  filteredTasks.forEach((task) => {

    const li = document.createElement("li");
    const span = document.createElement("span");
    const btnEdit = document.createElement('button');
    const btnDelete = document.createElement("button");
    const icon = document.createElement('i');
    
    icon.classList.add("fa-regular", "fa-pen-to-square", "edit-btn");
    btnDelete.classList.add('delete-btn');
    
    span.textContent = task.text;
    span.classList.toggle("completed", task.completed);
    btnDelete.textContent = "X";
    

    // Modifier une tâche
    btnEdit.addEventListener('click', () => {
      taskBeingEdited = task.id;
      input.value = task.text;
      input.focus();
      
      btnAdd.textContent = "Update";
    });
    

    // Supprimer une tâche par son id
    btnDelete.addEventListener("click", () => {
      deleteTask(task.id);
    });


    // Marquer une tâche comme terminée / non terminée
    span.addEventListener('click', () => {
      task.completed = !task.completed;
      
      saveTasks();
      render();
    });

    
    li.appendChild(span);
    li.appendChild(btnEdit);
    li.appendChild(btnDelete);
    btnEdit.appendChild(icon);
    taskList.appendChild(li);
  });
}


// Supprimer une tâche
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  saveTasks();
  render();
}


// Gestion du bouton Ajouter
btnAdd.addEventListener("click", (event) => {
  event.preventDefault();
  addTask();
});


// Ajouter une tâche avec la touche Enter
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addTask();
  }
});


// Gestion des filtres
filterAll.addEventListener('click', () => {
  currentFilter = "all";
  render();
});

filterCompleted.addEventListener('click', () => {
  currentFilter = "completed";
  render();
});

filterActive.addEventListener('click', () => {
  currentFilter = "active";
  render();
});


// Premier affichage au chargement
render();