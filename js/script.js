let input;
let alertInfo;
let btnAdd;
let list;
let newTask;

const main = () => {
    prepareDOMElements();
    prepareDomEvents();
};

const prepareDOMElements = () => {
    input = document.querySelector('.header__input');
    alertInfo = document.querySelector('.todo__alertInfo');
    btnAdd = document.querySelector('.btn__add');
    list = document.querySelector('.todo__list');
};

const prepareDomEvents = () => {
    btnAdd.addEventListener('click', addNewTask);
    list.addEventListener('click', checkClick);
}

const addNewTask = () => {
    if (input.value !== '') {
        newTask = document.createElement('li');
        newTask.classList.add('todo__element');
        newTask.innerText = input.value;
        list.appendChild(newTask);
        createToolsArea();

        input.value = '';
        alertInfo.innerText = '';
    } else {
        alertInfo.innerText = 'Wpisz treść zadania!';
    }
}

const createToolsArea = () => {
    let toolsPanel = document.createElement('div');
    let btnComplete = document.createElement('button');
    let btnEdit = document.createElement('button');
    let btnDelete = document.createElement('button');

    toolsPanel.classList.add('tools');
    btnComplete.classList.add('btn__complete');
    btnEdit.classList.add('btn__edit');
    btnDelete.classList.add('btn__delete');

    btnComplete.innerHTML = '<i class="fas fa-check"></i>';
    btnEdit.innerText = 'EDIT';
    btnDelete.innerHTML = '<i class="fas fa-times"></i>';

    toolsPanel.appendChild(btnComplete);
    toolsPanel.appendChild(btnEdit);
    toolsPanel.appendChild(btnDelete);
    newTask.appendChild(toolsPanel);
}

document.addEventListener('DOMContentLoaded', main);