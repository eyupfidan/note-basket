const newTask = document.querySelector('.input-task');
const addNewTaskBtn = document.querySelector('.btn-add-task');
const taskList = document.querySelector('.task-list');

addNewTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', completeRemoveTask);
document.addEventListener('DOMContentLoaded', readLocalStorage);

function completeRemoveTask(e) {
  const tickElement = e.target;
  if (tickElement.classList.contains('btn-complete-task')) {
    tickElement.parentElement.classList.toggle('complete-task');
  }
  if (tickElement.classList.contains('btn-remove-task')) {
    if (confirm('Are you sure')) {
      const deleteTask = tickElement.parentElement.children[0].innerText;
      removeLocalStorage(deleteTask);
      tickElement.parentElement.classList.toggle('hide');
      tickElement.parentElement.addEventListener('transitionend', () => {
        tickElement.parentElement.remove();
      });
    }
  }
}

function addTask(e) {
  e.preventDefault(); // terminate default click event
  if (newTask.value.length > 0) {
    setTaskItem(newTask.value);
    // save data localstorage
    saveLocalStorage(newTask.value);
    // clear input value
    newTask.value = '';
  } else {
    alert('Please do not enter an empty value!');
  }
}

function saveLocalStorage(task) {
  let tasks = localStoragetoArray();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function readLocalStorage() {
  let tasks = localStoragetoArray();
  tasks.forEach(task => {
    setTaskItem(task);
  });
}

function setTaskItem(task) {
  // make new divider
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('task-item');

  // make new list element
  const taskLi = document.createElement('li');
  taskLi.classList.add('task-title');
  taskLi.innerText = task;
  taskDiv.appendChild(taskLi);

  // add complete button
  const completedBtn = createButton('btn-complete-task', 'fa fa-check');
  taskDiv.appendChild(completedBtn);

  // add remove button
  const removeBtn = createButton('btn-remove-task', 'fa fa-times');
  taskDiv.appendChild(removeBtn);

  // add list in div
  taskList.appendChild(taskDiv);
}

function createButton(className, iconClass) {
  const button = document.createElement('button');
  button.classList.add('task-btn', className);
  button.innerHTML = `<i class="${iconClass}" aria-hidden="true"></i>`;
  return button;
}

function removeLocalStorage(task) {
  let tasks = localStoragetoArray();
  // splice remove item
  const deleteElementIndex = tasks.indexOf(task);
  tasks.splice(deleteElementIndex, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function localStoragetoArray() {
  let tasks = localStorage.getItem('tasks');
  if (tasks === null) {
    return [];
  }
  return JSON.parse(tasks);
}
