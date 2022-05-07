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

// ADD ITEM TO LOCAL STORAGE
function saveLocalStorage() {
    localStorage.setItem("COMPRAS", JSON.stringify(LIST))

}


// GET ITEM FROM LOCAL STORAGE
let data = localStorage.getItem("COMPRAS");


// CHECK IF DATA ISN´T EMPTY
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length

    loadList(LIST)
} else {
    LIST = []
    id = 0
}


//LOAD ITEM TO INTERFACE
function loadList() {
    LIST.forEach(function (item) {
        addItem(item.name, item.id, item.done, item.trash)
    });
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
date.innerText = today.toLocaleDateString("br", options);






//! FUNCTION ADD ITEM //////////////////////////////////////////
function addItem(item, id, done, trash) {

    if (trash) {
        return
    };

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const position = "afterbegin";
    const itemElement = `<li class="list-item">
                            <i class="far ${DONE} " job ="complete" id="${id}"></i>
                            <p class="text ${LINE}" contenteditable="true" job="" >${item}</p>
                            <i class="fas fa-trash-alt de" job ="delete" id=" ${id}"></i>
                        </li>
                        `;

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
            saveLocalStorage()

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

}




//! TARGET THE ITEMS ///////////////////////////////////////////////
document.addEventListener("click", function (event) {
    const element = event.target
    const elementJob = element.attributes.job.value

    if (elementJob == "complete") {
        completeItem(element)
    } else if (elementJob == "delete") {
       
        removeItem(element)

        LIST[element.id].trash = true
    }

    //add item to localstorage
    saveLocalStorage()
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