import {inputHigh, inputLow} from './view.js'

let id = 0;
let tasks = []
const PRIORITY_LOW = 'low'
const PRIORITY_HIGHT = 'hight'

const render = function () {
    inputHigh.parentElement.parentElement.querySelector('.task-container').innerHTML = ''
    inputLow.parentElement.parentElement.querySelector('.task-container').innerHTML = ''

    tasks.forEach(task => {
        let taskContainer
        if (task.priority === PRIORITY_HIGHT) {
            taskContainer = inputHigh.parentElement.parentElement.querySelector('.task-container')
        }
        if (task.priority === PRIORITY_LOW) {
            taskContainer = inputLow.parentElement.parentElement.querySelector('.task-container')
        }

        let div = document.createElement('div')
        div.classList.add('form-element')
        div.innerHTML = `<label class="form-element_label">
            <input type="checkbox" class="checkbox">
            <span class="checkbox-text">${task.text}</span>
            </label>
            <button class="btn btn-remove"><img src="img/remove-icon.png" alt="remove icon" class="icon icon-remove"></button>`
        taskContainer.insertAdjacentElement('afterbegin', div)

        const btn = div.querySelector('.btn-remove')
        btn.addEventListener('click', function () {
            tasks = tasks.filter((filteredTask) => {return filteredTask.id !== task.id})
            render()
        })

        const label = div.querySelector('.form-element_label')
        label.querySelector('input').addEventListener('click', function (ev) {
            ev.stopPropagation()
        })
        if (task.checked) {
            div.classList.toggle('form-element--checked')
            label.querySelector('.checkbox').checked = true
            taskContainer.insertAdjacentElement('beforeend', div)
        }
        label.addEventListener('click', function () {
            task.checked = !task.checked
            div.classList.toggle('form-element--checked')
            if (div.classList.contains('form-element--checked')) {
            taskContainer.insertAdjacentElement('beforeend', div)
            } else {
            taskContainer.insertAdjacentElement('afterbegin', div)
            }
            render()
        })
    })    
}

function addInputListeners () {
    function Task(text, priority) {
        this.text = text.trim();
        this.priority = priority;
        this.checked = false;
        this.id = ++id;
    }

    function addTask(input, priority) {
        return function() {
            const text = input.value.trim()
            if (!text) return

            tasks.push(new Task(text, priority))
            this.form.reset()
            render()
        }
    }
    function addListeners(input, priority) {
        input.addEventListener('onsubmit', addTask(input, priority))
        input.parentElement.querySelector('.btn-add').addEventListener('click', addTask(input, priority))
    }

    addListeners(inputLow, PRIORITY_LOW)
    addListeners(inputHigh, PRIORITY_HIGHT)

}
addInputListeners()


