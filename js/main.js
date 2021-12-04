import {inputHigh, inputLow} from './view.js'

function addInputListeners () {
    function addListeners(input) {
        function addTask() {
            const taskContainer = input.parentElement.parentElement.querySelector('.task-container')
            const text = input.value.trim()

            if (!text) return

            input.value = ''

            let div = document.createElement('div')
            div.classList.add('form-element')
            div.innerHTML = `<label class="form-element_label">
            <input type="checkbox" class="checkbox">
            <span class="checkbox-text">${text}</span>
            </label>
            <button class="btn btn-remove"><img src="img/remove-icon.png" alt="remove icon" class="icon icon-remove"></button>`
            taskContainer.insertAdjacentElement('afterbegin', div)

            const btn = div.querySelector('.btn-remove')
            btn.addEventListener('click', function () {
                div.remove()
            })

            const label = div.querySelector('.form-element_label')
            label.querySelector('input').addEventListener('click', function (ev) {
                ev.stopPropagation()
            })
            label.addEventListener('click', function () {
                div.classList.toggle('form-element--checked')
                if (div.classList.contains('form-element--checked')) {
                    taskContainer.insertAdjacentElement('beforeend', div)
                } else {
                    taskContainer.insertAdjacentElement('afterbegin', div)
                }
            })

        }
        input.addEventListener('onsubmit', addTask)
        input.parentElement.querySelector('.btn-add').addEventListener('click', addTask)
    }

    addListeners(inputLow)
    addListeners(inputHigh)
}
addInputListeners()


