const newTask = document.querySelector('.input-task')
const addNewTaskBtn = document.querySelector('.btn-add-task')
const taskList = document.querySelector('.task-list')


addNewTaskBtn.addEventListener('click', addTask)
taskList.addEventListener('click', completeRemoveTask)
document.addEventListener('DOMContentLoaded',readLocalStorage)

function completeRemoveTask(e) {
    const tickElement = e.target
    if (tickElement.classList.contains('btn-complete-task')) {
        tickElement.parentElement.classList.toggle('complete-task')
    }
    if (tickElement.classList.contains('btn-remove-task')) {

        if(confirm('Are you sure')) {
            const deleteTask = tickElement.parentElement.children[0].innerText;
            removeLocalStorage(deleteTask)
            tickElement.parentElement.classList.toggle('hide')
            tickElement.parentElement.addEventListener('transitionend', () => {
                tickElement.parentElement.remove()
            })
        }

    }
}

function addTask(e) {
    e.preventDefault() //terminate default click event
    if(newTask.value.length > 0 )
    {
        setTaskItem(newTask.value)
        //Save data localstorage
        saveLocalStorage(newTask.value)
        //Clear input value 
        newTask.value = ""
    } else {
        alert('Please do not enter an empty value! ');
    }
    
}

function saveLocalStorage(task) {
let tasks = localStoragetoArray()
tasks.push(task)
localStorage.setItem('tasks',JSON.stringify(tasks))
}

function readLocalStorage() {
let tasks = localStoragetoArray()
tasks.forEach(task => {
    setTaskItem(task)
});
}

function setTaskItem (task) {
    //make new divider
    const taskDiv = document.createElement('div')
    taskDiv.classList.add('task-item')

    //make new list element 
    const taskLi = document.createElement('li')
    taskLi.classList.add('task-title')
    taskLi.innerText = task
    taskDiv.appendChild(taskLi)

    //add complete button 
    const completedBtn = document.createElement('button')
    completedBtn.classList.add('task-btn')
    completedBtn.classList.add('btn-complete-task')
    completedBtn.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>'
    taskDiv.appendChild(completedBtn)

    //add remove button
    const removeBtn = document.createElement('button')
    removeBtn.classList.add('task-btn')
    removeBtn.classList.add('btn-remove-task')
    removeBtn.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>'
    taskDiv.appendChild(removeBtn)

    //add list in div
    taskList.appendChild(taskDiv)

}

function removeLocalStorage(task) {
let tasks = localStoragetoArray()
//splice remove item
const deleteElementIndex = tasks.indexOf(task)
tasks.splice(deleteElementIndex,1);
localStorage.setItem('tasks',JSON.stringify(tasks))
}

function localStoragetoArray () {
    let tasks
    if(localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    return tasks
}