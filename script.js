var addBtn = document.getElementById("inputBtn");
var delItem = document.getElementById("delBtn");
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
    span.setAttribute('type','submit');
    span.setAttribute('onclick', 'this.parentNode.style.display="none";')
    span.appendChild(btnType);
    li.appendChild(span); 
    //End Delete Button

    ul.append(li);
    input.value ="";
}


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

//Check status event on Click
ul.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

addBtn.addEventListener("click", addItemClick);
input.addEventListener("keypress", addItemEnter);