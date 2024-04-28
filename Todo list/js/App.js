const form = document.querySelector(".form")
const addBtn = document.querySelector(".addBtn")
const item = document.getElementById("item")
const list = document.querySelector(".list")
const clearBtn =document.querySelector(".clear-btn")
const clear = document.querySelector(".clear")
const edit = document.querySelectorAll(".edit")
const alertTxt = document.querySelector(".alert")

let editFlag;
let editId;
let editElement;

document.addEventListener("DOMContentLoaded", function() {
    showClear();
    let items = getLocalStorage();
    if (items.length>0) {
        items.forEach(function(item){
            createListItem(item.value, item.id)
        })
    }
});

form.addEventListener("submit", function(e){
    e.preventDefault()
    if (!editFlag){
        const value = item.value
        const id = new Date().getTime().toString();
        createListItem(value, id);
        addToLocalStorage(value, id)
        setDefault();
        alertTxt.innerHTML = "Item added"
        setTimeout(function(){
            alertTxt.innerHTML = ""}, 2000)
    } else {
        editElement.firstElementChild.innerHTML = item.value
        let items = getLocalStorage();
         items.forEach(function(i){
        if (i.id === editId){
            i.value = item.value
        } return i
        }) 
    localStorage.setItem("todolist",JSON.stringify(items))
    addBtn.textContent = "Add"
    setDefault();
    alertTxt.innerHTML = "Item edited"
    setTimeout(function(){
        alertTxt.innerHTML = ""}, 2000)
    setDefault();
}
})

function createListItem(value, id){
    const element = document.createElement("article")
    element.classList.add("list-item", "flex", "m-8")
    element.dataset.id = id;
    element.innerHTML = `<p class="inline-block flex-auto w-64">${value}</p>
    <button class="remove border-2 rounded p-1 flex-none">Remove</button>
    <button class="edit border-2 rounded p-1 flex-none">Edit</button>`
    list.appendChild(element)
    // add id and value to local stoarage
    showClear()
    const removeBtns = document.querySelectorAll(".remove")
    const editBtns = document.querySelectorAll(".edit")
    removeBtns.forEach(btn => {
        btn.addEventListener("click", removeItem)  
    });
    editBtns.forEach(btn => {
        btn.addEventListener("click", editItem)
    })
}

function addToLocalStorage(value, id){
    const activity = {value:value, id:id}
    let i = getLocalStorage();
    i.push(activity);
    localStorage.setItem("todolist", JSON.stringify(i));
}

function removeItem(e){
    const clicked =e.currentTarget.parentElement
    const id = clicked.dataset.id
    list.removeChild(clicked)
    //local storage
    let todolist = getLocalStorage()
    todolist = todolist.filter(function(i){
        if (i.id !== id){
            return i
        }
    });
    localStorage.setItem("todolist",JSON.stringify(todolist))
    showClear();
}

// edit. click edit, fetch its id and value from local storage, display the value on input, edit, replace the value with the one in local storage and display it as item

function editItem(e){
    editElement = e.currentTarget.parentElement;
    editId = editElement.dataset.id;
    editFlag = true;
    addBtn.textContent = "Edit"
    let items = getLocalStorage();
    items.forEach(function(i){
        if (i.id === editId){
            item.value = i.value
        }
        })
}

function getLocalStorage(){
    return localStorage.getItem("todolist")? JSON.parse(localStorage.getItem("todolist")): [];
}
function showClear(){
    if (list.children.length === 0){
        clear.classList.add("hidden")
    } else {clear.classList.remove("hidden")}
}

clearBtn.addEventListener("click", function(){
    list.textContent = ""
    localStorage.clear()
    showClear()
})


function setDefault(){
    item.value = ""
    editFlag = false
}



