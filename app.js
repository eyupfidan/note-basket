const newTask = document.querySelector('.input-task')
const addNewTaskBtn = document.querySelector('.btn-add-task')
const taskList = document.querySelector('.task-list')


addNewTaskBtn.addEventListener('click', addTask)
taskList.addEventListener('click', completeRemoveTask)

function completeRemoveTask(e) {
    const tickElement = e.target

    if (tickElement.classList.contains('btn-complete-task')) {
        tickElement.parentElement.classList.toggle('complete-task')
    }
    if (tickElement.classList.contains('btn-remove-task')) {
        tickElement.parentElement.classList.toggle('hide')
        tickElement.parentElement.addEventListener('transitionend', () => {
            tickElement.parentElement.remove()
        })

    }
}

function addTask(e) {
    e.preventDefault() //terminate default click event
    //make new divider
    const taskDiv = document.createElement('div')
    taskDiv.classList.add('task-item')

    //make new list element 
    const taskLi = document.createElement('li')
    taskLi.classList.add('task-title')
    taskLi.innerText = newTask.value
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

    //Save data localstorage
    saveLocalStorage(newTask.value)

    //Clear input value 
    newTask.value = ""

    //add list in div
    taskList.appendChild(taskDiv)

}

function saveLocalStorage(task) {
let tasks

if(localStorage.getItem('tasks') === null) {
    tasks = []
} else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
}

tasks.push(task)
localStorage.setItem('tasks',JSON.stringify(tasks))
}
