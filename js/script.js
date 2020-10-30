let input;
let datePickerInput;
let alertInfo;
let btnAdd;
let list;
let popup;
let popupWrapper;
let popupInfo;
let popupInput;
let popupDatePicker;
let editedTaskDate;
let btnAccept;
let btnCancel;
let tasks;
let db;
let taskElement;
let dateTask;
let editedTodo;
let oldTask;

const main = () => {
    initFirebase();
    tasksList();
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
    popupWrapper = document.querySelector('.popup__wrapper');
    popupInfo = document.querySelector('.popup__info');
    popupInput = document.querySelector('.popup__input');
    popupDatePicker = document.querySelector('.popup__datePicker');
    btnAccept = document.querySelector('.btn__accept');
    btnCancel = document.querySelector('.btn__cancel');
};

const prepareDomEvents = () => {
    btnAdd.addEventListener('click', addNewTask);
    input.addEventListener('keyup', enterCheck);
    list.addEventListener('click', checkClick);
    btnCancel.addEventListener('click', closePopup);
    window.addEventListener('keyup', keyCodeCheckPopup);
    btnAccept.addEventListener('click', changeTask);
    popupInput.addEventListener('keyup', keyCodeCheckPopup);
};

const initFirebase = () => {
    const config = {
        apiKey: "AIzaSyDrEDF1gnliUuvr9BMq_VUTKLAcEqG30IM",
        authDomain: "project-todo-2a41e.firebaseapp.com",
        databaseURL: "https://project-todo-2a41e.firebaseio.com",
        projectId: "project-todo-2a41e",
    };

    firebase.initializeApp(config);
    db = firebase.database();
}

const tasksList = () => {
    db.ref('/tasks').on('value', (snapshot) => {
        list.innerHTML = "";
        tasks = Object.entries(snapshot.val() || {})

        if (tasks !== {}) {
            tasks.sort((a, b) => new Date(a[1].date) - new Date(b[1].date))
            tasks.forEach(task => {
                taskElement = document.createElement('li');
                taskElement.setAttribute('id', task[0])
                taskElement.classList.add('todo__element');
                taskElement.innerText = task[1].task;
                dateTask = document.createElement('span');
                dateTask.setAttribute('id', 'date')
                dateTask.classList.add('todo__span');
                dateTask.innerText = task[1].date;
                taskElement.appendChild(dateTask);
                createToolsArea();
                list.appendChild(taskElement);
            })
            overdueTasks();
        }
    });
}

const overdueTasks = () => {
    tasks.forEach(task => {

        if (new Date(task[1].date) <= new Date()) {
            const overdueTask = document.getElementById(task[0])
            overdueTask.style.color = "red"
        }
    })
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
    taskElement.appendChild(toolsPanel);
};

const addNewTask = () => {
    if (input.value !== '') {
        const taskObj = {
            task: input.value,
            date: datePickerInput.value,
        }

        db.ref('/tasks').push(taskObj);
        input.value = '';
        alertInfo.innerText = '';
        datePickerInput.value = "";
    } else {
        alertInfo.innerText = 'Wpisz treść zadania!';
    };
};

const datePicker = () => {
    flatpickr("#datePicker", {
        dateFormat: "Y-m-d",
        minDate: "today",
        locale: 'pl',
        disableMobile: "true",
    });
}

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
    oldTask = e.target.closest('li').id;
    editedTodo = document.getElementById(oldTask);
    editedTaskDate = editedTodo.querySelector('#date');
    popupInput.value = editedTodo.firstChild.textContent;
    popupDatePicker.value = editedTaskDate.textContent;
    popup.style.display = 'flex';

    if (window.innerWidth > 768) {
        popupInput.focus();
    }
};

const changeTask = () => {
    if (popupInput.value !== '') {
        const editedTaskObj = {
            task: popupInput.value,
            date: popupDatePicker.value,
        }
        let updates = {};
        updates['/tasks/' + oldTask] = editedTaskObj;
        firebase.database().ref().update(updates);

        popup.style.display = 'none';
        popupInfo.innerText = '';
    } else {
        popupInfo.innerText = 'Musisz podać treść zadania!';
    };
};

const deleteTask = e => {
    let updates = {};
    updates['/tasks/' + e.target.closest('li').id] = null;
    firebase.database().ref().update(updates);

    if (list.children.length === 0) {
        alertInfo.innerText = 'Brak zadań na liście.';
    } else {
        alertInfo.innerText = '';
    }
};

const closePopup = () => {
    popup.style.display = 'none';
};

const enterCheck = e => {
    if (e.keyCode === 13) {
        addNewTask();
    };
};

const keyCodeCheckPopup = e => {
    if (e.keyCode === 13) {
        changeTask();
    } else if (e.keyCode === 27) {
        closePopup();
    };
};

document.addEventListener('DOMContentLoaded', main);