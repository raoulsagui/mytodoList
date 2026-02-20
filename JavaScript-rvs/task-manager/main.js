const input = document.getElementById('task-input');
const btn = document.getElementById('add-btn');
const list = document.getElementById('task-list');

const tasks = [];

btn.addEventListener('click', (e) => {
    e.preventDefault(); // Empêche le rechargement de la page si c'est un <form>

    const newTask = input.value.trim();
    // console.log(newTask);

    if (newTask.length > 0) {
        tasks.push(newTask)
        console.log(tasks);

        const li = document.createElement('li'); // créer un <li> pour chaque tâche ajoutée.
        li.textContent = newTask;
        list.appendChild(li);

        // list.style.listStyle = 'none';
        // list.style.padding = '0'

    }

   input.value = "";
    
})

