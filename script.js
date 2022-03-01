var button = document.getElementById("inputBtn");
var input = document.getElementById("userInput");
var ul = document.querySelector("ul")


function inputLength(){
    return input.value.length;
}

function createItemList(){
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    input.value ="";
}

function addItemClick(){
    if (inputLength() >0){
        createItemList();
    }
}

function addItemEnter(event){
    if (inputLength() >0 && event.keyCode === 13){
        createItemList();
    }
}

button.addEventListener("click", addItemClick);
input.addEventListener("keypress", addItemEnter);