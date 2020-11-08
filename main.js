'use strict';
const input = document.querySelector('#add_task');
const list = document.querySelector('#item-list');
const btnSubmit = document.querySelector('.btn_submit');

let todos = [];

// GET INPUT
btnSubmit.addEventListener('click', onClick);

const holder = document.createElement('h1');
holder.id = 'holder';
holder.appendChild(document.createTextNode('Please Enter A Task'));
document.querySelector('.con_list').appendChild(holder);

// Save
function onClick(e) {
  const dateDetails = new Date();
  if (!input.value) {
    alert('Please enter a task');
    e.preventDefault();
  } else {
    // itemList(input.value);
    const todo = {
      completed: false,
      task: input.value,
      date: `${dateDetails.getDate()}/${dateDetails.getMonth()}/${dateDetails.getFullYear()} ${
        dateDetails.getHours() > 12
          ? dateDetails.getHours() - 12
          : dateDetails.getHours()
      }:${dateDetails.getMinutes()}:${dateDetails.getSeconds()} ${
        dateDetails.getHours() >= 12 ? 'PM' : 'AM'
      }`,
    };

    todos.push(todo);
    addToLocalStorage(todos);

    if (list.childElementCount > 0) {
      holder.style.display = 'none';
    }

    input.value = '';
    e.preventDefault();
  }
}
// Save

// Create Date
function itemDate(petsa) {
  const date = document.createElement('div');
  date.className = 'date';
  const icon = document.createElement('a');
  icon.className = 'icon';
  icon.setAttribute('href', '#');
  icon.addEventListener('click', onDelete);
  date.innerText = petsa.date;

  icon.innerHTML = '<i class="fas fa-trash-alt"></i>';
  date.appendChild(icon);
  return date;
}
// Create List

// Create List
function itemList(todos) {
  list.innerHTML = '';
  todos.forEach(function (task) {
    const item = document.createElement('li');
    task.completed == true ? (item.style.backgroundColor = '#3cea52') : null;
    task.completed == true
      ? (item.style.textDecoration = 'line-through')
      : null;
    item.className = 'list';
    item.innerHTML = `<p>${task.task}</p>`;
    item.addEventListener('dblclick', onCheck);
    item.addEventListener('click', onUndo);
    item.appendChild(itemDate(task));
    list.appendChild(item);
  });
}
// Create List

// DELETE
function onDelete(e) {
  e.target.parentNode.parentNode.parentNode.remove();
  todos = todos.filter(function (item) {
    return (
      item.task != e.target.parentNode.parentNode.previousSibling.innerText
    );
  });
  addToLocalStorage(todos);
  if (list.childElementCount === 0) {
    document.querySelector('.con_list').appendChild(holder);
    holder.style.display = 'block';
  }

  e.preventDefault();
}
// DELETE

// CHECK WHEN TASK IS FINISH
function onCheck(e) {
  const cross = e.target.firstElementChild;

  todos.forEach(function (item) {
    if (item.date === cross.nextSibling.innerText) item.completed = true;
  });

  addToLocalStorage(todos);
}
// CHECK WHEN TASK IS FINISH

// UNDO TASK
function onUndo(e) {
  const undo = e.target.firstElementChild;
  todos.forEach(function (item) {
    if (item.date === undo.nextSibling.innerText) item.completed = false;
  });
  undo.style.textDecoration = 'none';
  e.target.style.backgroundColor = '#16697a';

  addToLocalStorage(todos);
}
// UNDO TASK

// DIGITAL CLOCK
function oras() {
  let orasan = new Date();
  let hr = orasan.getHours();
  let m = orasan.getMinutes();

  hr = checkTime(hr);
  m = checkTime(m);

  document.querySelector('.time').innerHTML = `${hr > 12 ? hr - 12 : hr}:${m}`;

  const t = setTimeout(oras, 60000);
}

function checkTime(i) {
  if (i < 10) i += '0';
  return i;
}

const day = new Date().getDay();

switch (day) {
  case 0:
    document.querySelector('.day').innerText = 'Sunday';
    break;
  case 1:
    document.querySelector('.day').innerText = 'Monday';
    break;
  case 2:
    document.querySelector('.day').innerText = 'Tuesday';
    break;
  case 3:
    document.querySelector('.day').innerText = 'Wednesday';
    break;
  case 4:
    document.querySelector('.day').innerText = 'Thursday';
    break;
  case 5:
    document.querySelector('.day').innerText = 'Friday';
    break;
  case 6:
    document.querySelector('.day').innerText = 'Saturday';
    break;
}

// DIGITAL CLOCK

// ADD TO LOCAL STORAGE
function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
  itemList(todos);
}

const getFromLocalStorage = () => {
  const ref = localStorage.getItem('todos');
  if (ref) {
    todos = JSON.parse(ref);
    itemList(todos);

    if (todos == 0) document.querySelector('.con_list').appendChild(holder);
    else holder.style.display = 'none';
  }
};

getFromLocalStorage();
