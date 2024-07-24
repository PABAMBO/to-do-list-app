const button = document.getElementById("enter");
const input = document.getElementById("userinput");
const ul = document.getElementById("list");


window.onload = function() {
  let name = prompt('Please enter your name.');
  while (!name) {
    name = prompt('Please enter a valid name :)');
  }
    document.querySelector('#title').textContent = `${name}'s To-Do List`;
    loadListFromLocalStorage();
}

function updateDate() {
  const date = new Date();
  const dateNow = date.toLocaleString();
  document.querySelector('#currentDate').textContent = `The date today is: ${dateNow}`;
}

setInterval(updateDate, 1000);

function inputLength() {
	return input.value.length;
}


function createListElement(value, done = false) {
	const item = document.createElement("li");
	const deleteButton = document.createElement("button");
  const space = document.createElement("div");
	deleteButton.textContent = "Delete";
	item.appendChild(document.createTextNode(value + " "));
	ul.appendChild(item);
	item.appendChild(deleteButton);
  item.appendChild(space);

if (done) {
    item.classList.add("done");
  }

item.addEventListener('click', function() {
   this.classList.toggle("done");
      saveListToLocalStorage();
});
deleteButton.addEventListener('click', function() {
   ul.removeChild(item);
      saveListToLocalStorage();
});
	input.value = "";
}


function addListAfterClick() {
	if (inputLength() > 0) {
    createListElement(input.value);
    saveListToLocalStorage();
	}
}

function addListAfterKeydown(event) {
	if (inputLength() > 0 && event.key === "Enter") {
    createListElement(input.value);
    saveListToLocalStorage();
	}
}

button.addEventListener("click", addListAfterClick);

input.addEventListener("keydown", addListAfterKeydown);



function saveListToLocalStorage() {
  const items = [];
  ul.querySelectorAll('li').forEach(item => {
    items.push({
      text: item.childNodes[0].textContent,
      done: item.classList.contains("done")
    });
  });
  localStorage.setItem('todoList', JSON.stringify(items));
}

function loadListFromLocalStorage() {
  const items = JSON.parse(localStorage.getItem('todoList'));
  if (items) {
    items.forEach(item => {
      createListElement(item.text, item.done);
    });
  }
}