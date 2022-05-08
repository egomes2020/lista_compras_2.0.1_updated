//? SELECT HTML ELEMENTS
const clear = document.querySelector('#clear-btn')
const date = document.querySelector('#pdate')
const list = document.querySelector('#list')
const input = document.querySelector('#add-input')


//? CREATE CLASSES
const CHECK = "fa-check-circle"
const UNCHECK = "fa-circle"
const LINE_THROUGH = "lineThrough"


//? VARIABLES 

let LIST, id




//! LOCAL STORAGE ///////////////////////////////////////////////
// GET ITEM FROM LOCAL STORAGE
let data = localStorage.getItem("TODO")

// CHECK IF DATA IS NOT EMPTY
if(data){
    LIST = JSON.parse(data);
    id = LIST.length
    loadList(LIST)
}else{
    // if data is not empty
    LIST = []
    id = 0
}

// LOAD ITEMS TO USER INTERFACE
 function loadList(array){
     array.forEach(function(item){
         addToDo(item.name, item.id, item.done, item.trash)
     })
 }




// CLEAR LOCAL STORAGE
/* clear.addEventListener("click", function () {
    localStorage.clear()
    location.reload()
}) */



//! SHOW DATE ///////////////////////////////////////////////
const options = {
    year: "numeric",
    weekday: "long",
    month: "short",
    day: "numeric"
}

const today = new Date()
date.innerHTML = today.toLocaleDateString("br", options);






//! FUNCTION ADD ITEM //////////////////////////////////////////
function addItem(item, id, done, trash) {

    if (trash){return};

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";


    const itemElement = `<li class="list-item">
                            <i class="far ${DONE} " job ="complete" id="${id}"></i>
                            <p class="text ${LINE}" contenteditable="true">${item}</p>
                            <i class="fas fa-trash-alt de" job ="delete" id=" ${id}"></i>
                        </li>
                        `;

    const position = "afterbegin";

    list.insertAdjacentHTML(position, itemElement)

}



//! ADD ITEM WITH KEYCODE = '13' OR KEY = 'Enter' /////////////////////////////
document.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        const item = input.value
        //if the input isn´t empty
        if (item) {
            addItem(item, id, false, false)

            LIST.push({
                name: item,
                id: id,
                done: false,
                trash: false
            })


            //add item to localstorage
            localStorage.setItem("COMPRAS", JSON.stringify(LIST))

            id++
        }

        input.value = "";
    }
})



//! FUNCTION COMPLETE ITEM /////////////////////////////////////////
function completeItem(element) {
    element.classList.toggle(CHECK)
    element.classList.toggle(UNCHECK)
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH)

    LIST[element.id].done = LIST[element.id].done ? false : true
}





//! FUNCTION DELETE ITEM ////////////////////////////////////////////////
function removeItem(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}




//! TARGET THE ITEMS ///////////////////////////////////////////////
document.addEventListener("click", function (event) {
    const element = event.target
    const elementJob = element.attributes.job.value

    if (elementJob == "complete") {
        completeItem(element)
    } else if (elementJob == "delete") {

        removeItem(element)

    }

    //add item to localstorage
    localStorage.setItem("COMPRAS", JSON.stringify(LIST))
})




//! FUNCTION LOADER ///////////////////////////////////////////////////////
/* window.addEventListener("load", function (){
    const loader = document.querySelector(".loader")
    loader.className += " hidden"
}) */




//! FUNCTION SHARE ///////////////////////////////////////////////////////////
const share = document.querySelector("#shareIcon")
share.addEventListener("click", () => {
    navigator.share({
        title: "Lista de Compras 2.0.1",
        text: "by Edgar Gomes",
        url: ' https://lista-de-compras-2-0-1.web.app/'
    })
})