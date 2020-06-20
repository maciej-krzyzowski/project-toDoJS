let input;
let datePickerInput;
let alertInfo;
let btnAdd;
let list;
let newTask;
let dateTask;
let popup;
let popupInfo;
let editedTodo;
let popupInput;
let popupDatePicker;
let oldTodo;
let editedDate;
let btnAccept;
let btnCancle;
let id = 0;

const main = () => {
    prepareDOMElements();
    prepareDomEvents();
    datePicker();
};

const prepareDOMElements = () => {
    input = document.querySelector('.header__input');
    datePickerInput = document.getElementById('datePicker');
    alertInfo = document.querySelector('.todo__alertInfo');
    btnAdd = document.querySelector('.btn__add');
    list = document.querySelector('.todo__list');
    popup = document.querySelector('.popup');
    popupInfo = document.querySelector('.popup__info');
    popupInput = document.querySelector('.popup__input');
    popupDatePicker = document.querySelector('.popup__datePicker');
    btnAccept = document.querySelector('.btn__accept');
    btnCancle = document.querySelector('.btn__cancel');
};

const prepareDomEvents = () => {
    btnAdd.addEventListener('click', addNewTask);
    input.addEventListener('keyup', enterCheck);
    list.addEventListener('click', checkClick);
    btnCancle.addEventListener('click', closePopup);
    window.addEventListener('keyup', escCheckTask);
    btnAccept.addEventListener('click', changeTask);
    popupInput.addEventListener('keyup', enterChangeTask);
};

const datePicker = () => {
    flatpickr("#datePicker", {
        dateFormat: "d/m/Y",
        minDate: "today",
        locale: 'pl',
        disableMobile: "true",
    });
}

const sort = () => {
    list.sort(a, b => (a - b));
    console.log(object);
}

const addNewTask = () => {
    if (input.value !== '') {
        id++;
        newTask = document.createElement('li');
        newTask.setAttribute('id', id)
        newTask.classList.add('todo__element');
        newTask.innerText = input.value;
        dateTask = document.createElement('span');
        dateTask.setAttribute('id', 'date')
        dateTask.classList.add('todo__span');
        dateTask.innerText = datePickerInput.value;
        newTask.appendChild(dateTask);
        list.appendChild(newTask);
        createToolsArea();

        input.value = '';
        alertInfo.innerText = '';
        const fp = document.querySelector("#datePicker")._flatpickr;
        fp.clear()
    } else {
        alertInfo.innerText = 'Wpisz treść zadania!';
    };
};

const enterCheck = e => {
    if (e.keyCode === 13) {
        addNewTask();
    };
};


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
};

const checkClick = e => {
    if (e.target.closest('button').classList.contains('btn__complete')) {
        doneTask(e);
    } else if (e.target.closest('button').classList.contains('btn__edit')) {
        editTask(e);
    } else if (e.target.closest('button').classList.contains('btn__delete')) {
        deleteTask(e);
    };
};

const doneTask = e => {
    e.target.closest('li').classList.toggle('completed');
    e.target.closest('button').classList.toggle('completed');
}

const editTask = e => {
    oldTodo = e.target.closest('li').id;
    editedTodo = document.getElementById(oldTodo);
    editedDate = editedTodo.querySelector('#date');

    popupInput.value = editedTodo.firstChild.textContent;
    popupDatePicker.value = editedDate.textContent;

    popup.style.display = 'flex';
    if (window.innerWidth > 768) {
        popupInput.focus();
    }
};

const deleteTask = e => {
    e.target.closest('li').remove();

    if (list.children.length === 0) {
        alertInfo.innerText = 'Brak zadań na liście.';
    } else {
        alertInfo.innerText = '';
    }
};

const changeTask = () => {
    if (popupInput.value !== '') {
        editedTodo.firstChild.textContent = popupInput.value;
        editedDate.textContent = popupDatePicker.value;
        popup.style.display = 'none';
        popupInfo.innerText = '';
    } else {
        popupInfo.innerText = 'Musisz podać treść zadania!';
    };
};

const enterChangeTask = e => {
    if (e.keyCode === 13) {
        changeTask();
    };
};

const closePopup = () => {
    popup.style.display = 'none';
};

const escCheckTask = e => {
    if (e.keyCode === 27) {
        closePopup();
    };
};

document.addEventListener('DOMContentLoaded', main);