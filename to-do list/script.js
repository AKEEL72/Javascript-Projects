const formEl = document.querySelector('.form');
const inpEl = document.querySelector('.input');
const ulEl = document.querySelector('.list');

/* =========================
   LOAD TASKS ON PAGE LOAD
========================= */
loadTasks();

/* =========================
   FORM SUBMIT → ADD TASK
========================= */
formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask();
});

/* =========================
   LOAD TASKS FROM STORAGE
========================= */
function loadTasks() {
  let lists = JSON.parse(localStorage.getItem('list'));

  // Add default tasks ONLY if storage is empty
  if (!lists || lists.length === 0) {
    lists = [
      { name: 'Learn JavaScript', checked: false },
      { name: 'Build To-Do App', checked: false }
    ];
    localStorage.setItem('list', JSON.stringify(lists));
  }

  lists.forEach(task => {
    createTask(task.name, task.checked);
  });
}

/* =========================
   ADD NEW TASK
========================= */
function addTask() {
  const taskText = inpEl.value.trim();
  if (taskText === '') return;

  createTask(taskText, false);
  inpEl.value = '';
}

/* =========================
   CREATE TASK ELEMENT
========================= */
function createTask(text, checked) {
  const li = document.createElement('li');
  li.innerText = text;

  if (checked) {
    li.classList.add('checked');
  }

  const checkBtn = document.createElement('i');
  checkBtn.classList.add('fas', 'fa-check-square');
  li.appendChild(checkBtn);

  const trashBtn = document.createElement('i');
  trashBtn.classList.add('fa-solid', 'fa-trash');
  li.appendChild(trashBtn);

  ulEl.appendChild(li);

  checkBtn.addEventListener("click", () => {
    li.classList.toggle("checked");
    updateLocalStorage();
  });

  trashBtn.addEventListener("click", () => {
    li.remove();
    updateLocalStorage();
  });

  updateLocalStorage();
}

/* =========================
   EVENT DELEGATION
========================= */
/*ulEl.addEventListener('click', (event) => {

  if (event.target.classList.contains('fa-check-square')) {
    event.target.parentElement.classList.toggle('checked');
    updateLocalStorage();
  }

  if (event.target.classList.contains('fa-trash')) {
    event.target.parentElement.remove();
    updateLocalStorage();
  }

});*/

/* =========================
   UPDATE LOCAL STORAGE
========================= */
function updateLocalStorage() {
  const allTasks = document.querySelectorAll('.list li');
  let lists = [];

  allTasks.forEach(li => {
    lists.push({
      name: li.innerText.trim(),
      checked: li.classList.contains('checked')
    });
  });

  localStorage.setItem('list', JSON.stringify(lists));
}

