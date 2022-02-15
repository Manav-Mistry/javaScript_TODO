const form = document.querySelector('#task-form');
const tasklist = document.querySelector('#task-list');
const taskInp = document.getElementById('taskInp');
const clearTasks = document.querySelector('#clear-tasks');
const filter = document.querySelector('#filterInp');

loadEventListners();

function loadEventListners() {
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    tasklist.addEventListener('click', removeTask);
    filter.addEventListener('keyup', filterSearch);
    clearTasks.addEventListener('click', clearAllTasks);
}

function getTasks() {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));

        const link = document.createElement('a');
        link.className = 'delete-item';
        link.innerHTML = '<i class="fa fa-remove remove-task"></i>';

        li.appendChild(link);
        tasklist.appendChild(li);
    });
}

function addTask(e) {
   if(taskInp.value === '') {
       alert('Task input is empty');
   }
   else{
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInp.value));

        const link = document.createElement('a');
        link.className = 'delete-item';
        link.innerHTML = '<i class="fa fa-remove remove-task"></i>';

        li.appendChild(link);
        tasklist.appendChild(li);
   }

   // add task in local storage
   storeTaskInLocalStorage(taskInp.value);    

   taskInp.value = '';
   e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeFromTheLocalStorage(tasktobedel) { // task meaning is we are passing <li> from caller
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(task === tasktobedel.textContent) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();

        // remove from the local storage
        removeFromTheLocalStorage(e.target.parentElement.parentElement);
    }
}

function filterSearch(e)  {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent.toLowerCase();
        if(item.indexOf(text) != -1) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
    
}

function clearAllTasks(e) {
   while(tasklist.firstChild) {
       tasklist.removeChild(tasklist.firstChild);
   }
}