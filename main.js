let todoText
let addTodoBtn
// let completeBtn = document.querySelector('.complete')
let editTodoBtn
// let deleteTodoBtn = document.querySelector('.delete')
let todoItemText
let todoItem
let allTasks
let todoList
let errorText
let editedTodo
let popup
let errorInfo
let todoEdit
let applyBtn
let cancelBtn
let idNumber = 0
let newTodoItem

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}
const prepareDOMElements = () => {
	todoText = document.querySelector('#create-todo')
	addTodoBtn = document.querySelector('.add-todo')
	editTodoBtn = document.querySelector('.edit')
	allTasks = document.getElementsByTagName('li')
	todoItemText = document.querySelector('.todo-text')
	todoItem = document.querySelector('.todo')
	todoList = document.querySelector('.todo-list')
	errorText = document.querySelector('.error-text')
	popup = document.querySelector('.popup')
	errorInfo = document.querySelector('.error-info')
	todoEdit = document.querySelector('#todo-edit')
	applyBtn = document.querySelector('.apply')
	cancelBtn = document.querySelector('.cancel')
}

const prepareDOMEvents = () => {
	addTodoBtn.addEventListener('click', newTodo)
	cancelBtn.addEventListener('click', () => {
		popup.style.display = 'none'
		todoEdit.value = ''
	})
	todoList.addEventListener('click', checkClick)
	applyBtn.addEventListener('click', changeTodo)
}

const newTodo = () => {
	if (todoText.value !== '') {
		idNumber++
		newTodoItem = document.createElement('li')
		newTodoItem.innerText = todoText.value
		newTodoItem.setAttribute('id', `todo-${idNumber}`)
		todoList.appendChild(newTodoItem)
		todoText.value = ''
		errorText.textContent = ''
		createToolsArea()
		checkClick()
	} else {
		errorText.textContent = 'Wpisz treść zadania!'
	}
}

const createToolsArea = () => {
	const toolsArea = document.createElement('div')
	toolsArea.classList.add('buttons')
	newTodoItem.appendChild(toolsArea)
	const completeBtn = document.createElement('button')
	completeBtn.classList.add('complete')
	completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
	const editBtn = document.createElement('button')
	editBtn.classList.add('edit')
	editBtn.innerHTML = 'EDIT'
	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add('delete')
	deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
	toolsArea.append(completeBtn, editBtn, deleteBtn)
}

const checkClick = e => {
	if (e.target.classList.value !== '') {
		if (e.target.closest('button').classList.contains('complete')) {
			e.target.closest('li').classList.toggle('completed')
			e.target.closest('button').classList.toggle('completedBtn')
		} else if (e.target.closest('button').classList.contains('edit')) {
			editTask(e)
		} else if (e.target.closest('button').classList.contains('delete')) {
			deleteTask(e)
		}
	}
}

const editTask = e => {
	const oldTodo = e.target.closest('li').id
	editedTodo = document.getElementById(oldTodo)
	popup.style.display = 'block'
	todoEdit.value = editedTodo.firstChild.textContent
}

const changeTodo = () => {
	if (todoEdit.value !== '') {
		editedTodo.firstChild.textContent = todoEdit.value
		popup.style.display = 'none'
		errorInfo.innerText = ''
	} else {
		errorInfo.innerText = 'Musisz podać jakąś treść'
	}
}

const deleteTask = e => {
	const deleteTodo = e.target.closest('li')
	deleteTodo.remove()
	if (allTasks.length === 0) {
		errorText.innerText = 'Brak zadań na liście'
	}
}

document.addEventListener('DOMContentLoaded', main)
