var button = document.getElementById("inputBtn");
var input = document.getElementById("userInput");
var ul = document.querySelector("ul")


function inputLength(){
    return input.value.length;
}

function checkSize(){
    var listSize = document.getElementsByTagName("li").length;   
    // return listSize;
    if (listSize > 0){
        document.getElementById("emptyMsg").style.display="none";
        console.log(listSize)
    }
    else {
        document.getElementById("emptyMsg").innerHTML = "Nothing to do";
        console.log("lista vazia");
       
    }
}

checkSize();

function createItemList(){
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(input.value));
    
    //Delete Button
    var span = document.createElement('span');
    var btnType = document.createTextNode("delete")
    span.classList.add('material-icons');
    span.setAttribute('id', 'delBtn');
    span.setAttribute('type','submit')
    span.appendChild(btnType);
    li.appendChild(span); 
    console.log(li)
    //End Delete Button

    ul.append(li);
    input.value ="";
}

/* var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false); */

function addItemClick(){
    if (inputLength() >0){
        createItemList();
        checkSize();
     }
}

function addItemEnter(event){
    if (inputLength() >0 && event.keyCode === 13){
        createItemList();
    }
}

button.addEventListener("click", addItemClick);
input.addEventListener("keypress", addItemEnter);

