var addBtn = document.getElementById("inputBtn");
var delItem = document.getElementById("delBtn");
var input = document.getElementById("userInput");
var ul = document.querySelector("ul")
const localStorageListKey = 'todoList'

function inputLength() {
    return input.value.length;
}

function checkSize() {
    var listSize = document.getElementsByTagName("li").length;
    // return listSize;
    if (listSize > 0) {
        document.getElementById("emptyMsg").style.display = "none";
        console.log(listSize)
    }
    else {
        document.getElementById("emptyMsg").innerHTML = "Nothing to do";
        document.getElementById("emptyMsg").style.display = "block";
        console.log("lista vazia");

    }
}

function deleteItem(itemValue) {
    const currentElement = document.getElementById(itemValue.item)
    console.log(currentElement)
    currentElement.remove()

    const savedList = JSON.parse(localStorage.getItem(localStorageListKey)) ?? []
    const filteredList = savedList.filter(item => item.item !== itemValue.item)

    console.log(savedList)
    console.log(filteredList)
    const stringifiedList = JSON.stringify(filteredList)
    localStorage.setItem(localStorageListKey, stringifiedList)

    checkSize();
}

/**
 * 
 * @param {object} itemValue 
 */
function addItemToDOM(itemValue) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(itemValue.item));
    li.setAttribute('id', itemValue.item)

    //Delete Button
    var span = document.createElement('span');
    var btnType = document.createTextNode("delete")
    span.classList.add('material-icons');
    span.setAttribute('id', 'delBtn');
    span.setAttribute('type', 'submit');
    span.addEventListener('click', () => deleteItem(itemValue))
    span.appendChild(btnType);
    li.appendChild(span);
    if (itemValue.status === 'done') {
        li.classList.add('checked');
    }
    //End Delete Button

    ul.append(li);
}

function loadLocalStorage() {
    const savedList = JSON.parse(localStorage.getItem(localStorageListKey)) ?? []

    if (savedList.length) {
        savedList.forEach(element => {
            addItemToDOM(element)
        })
    }

    checkSize();
}

checkSize();
loadLocalStorage()

/**
 * 
 * @param {string} newItem 
 */
function saveToLocalStorage(newItem) {
    const currentList = JSON.parse(localStorage.getItem(localStorageListKey)) ?? []
    const newList = [...currentList, newItem]
    const stringifiedList = JSON.stringify(newList)
    localStorage.setItem(localStorageListKey, stringifiedList)
}

function createItemList() {
    const newItemWithStatus = {
        item: input.value,
        status: 'toDo'
    }
    addItemToDOM(newItemWithStatus)
    saveToLocalStorage(newItemWithStatus)

    input.value = "";
}


function addItemClick() {
    if (inputLength() > 0) {
        createItemList();
        checkSize();
    }
}

function addItemEnter(event) {
    if (inputLength() > 0 && event.keyCode === 13) {
        createItemList();
        checkSize();
    }
}

function updateLocalStorageStatus(itemText) {
    const currentList = JSON.parse(localStorage.getItem(localStorageListKey)) ?? []
    const itemIndex = currentList.findIndex((item) => item?.item === itemText)
    if (itemIndex === -1) {
        return
    }
    const selectedItem = currentList[itemIndex]

    const newStatus = selectedItem.status === 'toDo' ? 'done' : 'toDo'
    const newItem = {
        ...selectedItem,
        status: newStatus
    }

    currentList[itemIndex] = newItem
    const stringifiedList = JSON.stringify(currentList)
    localStorage.setItem(localStorageListKey, stringifiedList)
}

//Check status event on Click
ul.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        const element = ev.target.innerHTML
        const targetElement = element.split('<span class="material-icons"')[0]
        updateLocalStorageStatus(targetElement)
        ev.target.classList.toggle('checked');
    }
}, false);

addBtn.addEventListener("click", addItemClick);
input.addEventListener("keypress", addItemEnter);

