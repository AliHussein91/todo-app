const INPUT = document.querySelector('#item');
const SUBMTI = document.querySelector('.add-task');
const CLEAR = document.querySelector('.clear');
const TASKS = document.querySelector('.tasks');
const DELETE_TASK = document.querySelectorAll('.delete-task');
const FRAGMENT = document.createDocumentFragment();

// Getting the max stored key value
const KEYS = [];
const TASK_LIST = [];

for (let i = 0; i < localStorage.length; i++) {
  let index = localStorage.key(i);
  let value = localStorage.getItem(index);
  KEYS.push(index);
  TASK_LIST.push({ [index]: value });
}

let key = Math.max.apply(Math, KEYS) >= 0 ? Math.max.apply(Math, KEYS) : 0;

// Adding task to local storage using an incremented key value
const addTask = (task) => {
  key++;
  localStorage.setItem(key, task);
  TASK_LIST.push({ [key]: task });
};

const deleteTask = (id) => {
  localStorage.removeItem(Object.keys(TASK_LIST[id]).toString());
  delete TASK_LIST[id];
};

const deleteItem = (element) => {
  TASKS.removeChild(element);
  deleteTask(element.id);
};

const readTasks = () => {
  let taskObjKey;
  TASK_LIST.forEach((i, index) => {
    taskObjKey = Object.keys(i).toString();
    createTaskElement(index, i[taskObjKey]);
  });
  TASKS.append(FRAGMENT);
};

const createTaskElement = (key, task) => {
  const item = document.createElement('li');
  item.classList.add('task');
  item.id = key;
  const check = document.createElement('input');
  check.setAttribute('type', 'checkbox');
  item.append(check);
  const p = document.createElement('p');
  p.innerHTML = task;
  item.append(p);
  const trash = document.createElement('a');
  trash.classList.add('delete-task');
  trash.setAttribute('onclick', 'deleteItem(this.parentElement)');
  trash.innerHTML = '❌';
  item.append(trash);
  FRAGMENT.appendChild(item);
};

const appendTaskElement = (key, task) => {
  const item = document.createElement('li');
  item.classList.add('task');
  item.id = key;
  const check = document.createElement('input');
  check.setAttribute('type', 'checkbox');
  item.append(check);
  const p = document.createElement('p');
  p.innerHTML = task;
  item.append(p);
  const trash = document.createElement('a');
  trash.classList.add('delete-task');
  trash.setAttribute('onclick', 'deleteItem(this.parentElement)');
  trash.innerHTML = '❌';
  item.append(trash);
  TASKS.appendChild(item);
};

readTasks();

INPUT.addEventListener('keyup', () => {
  if (INPUT.value.length > 0) {
    SUBMTI.removeAttribute('disabled');
  } else {
    SUBMTI.setAttribute('disabled', true);
  }
});

SUBMTI.addEventListener('click', (e) => {
  e.preventDefault();
  addTask(INPUT.value);
  appendTaskElement(TASK_LIST.length, INPUT.value);
  INPUT.value = '';
  SUBMTI.setAttribute('disabled', true);
});

CLEAR.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.clear();
  KEYS.splice(0, KEYS.length);
  TASK_LIST.splice(0, TASK_LIST.length);
  TASKS.innerHTML = '';
});
