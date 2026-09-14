const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');


const li = document.createElement('li');

const deleteButton = document.createElement('button');

li.textContent = input.value;
deleteButton.textContent = '❌';

li.append(deleteButton);

list.append(li);

const deleteButton = document.createElement('button');

deleteButton.textContent = '❌';

deleteButton.setAttribute('aria-label', `Remove ${input.value}`);

deleteButton.addEventListener('click', function () {
  list.removeChild(li);
  input.focus();
});