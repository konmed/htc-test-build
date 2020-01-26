// ------------ Данные --------------
let hobbieList = {
    "музыка": 1,
    "компьютеры": 1,
    "радио": 1,
},
blocks = document.querySelectorAll('.edited_block'); // редактируемые блоки

// ------------ События --------------
addEventListener('DOMContentLoaded', initData);
add_hobby.addEventListener('click', addHobby);

for (var i = 0; i < blocks.length; i++) {
  blocks[i].onclick = createField;
}

// ------------ Функции --------------
function initData() {
    loadHobbies();
    loadData();
}

// работа с хобби
function loadHobbies() {
    let arr = Object.keys(hobbieList),
    str = '';
    
    for (let i = 0; i < arr.length; i++) {
        str += '<a href="#" onclick="deleteHobby(this);"><div class="group_btn_item">'+ arr[i] +'</div></a>';
    }
    hobbies.innerHTML = str;
}

function addHobby() {
    let hobby = new_hobby.value;
    
    if (hobbieList[hobby] || !hobby)  return false; // валидация
    
    hobbieList[hobby] = 1;

    let element = document.createElement('a');
    element.setAttribute('href', '#');
    element.setAttribute('onclick', 'deleteHobby(this);');
    element.innerHTML = '<div class= "group_btn_item">'+ hobby +'</div>';
    hobbies.prepend(element);
    new_hobby.value='';
}

function deleteHobby(objTag) {
    hobby = objTag.text;
    delete hobbieList[hobby];
    objTag.remove();
}


// создать инпут вокруг текста
function createField() {
    let element = event.target,
    text = element.innerHTML;
    element.innerHTML = '<input type="text" value="'+ text +'" onblur="applyData(this);" />';
}

function loadData() {
    let mainInfo = ['name', 'phone', 'email'], element;
    for (let i = 0; i < mainInfo.length; i++) {
        element = document.getElementById(mainInfo[i]);
        element.innerHTML = localStorage[mainInfo[i]] || element.innerHTML;
    }
}

function applyData(objTag) {
    let text = objTag.value,
    parent = objTag.parentNode;
    objTag.remove();
    parent.innerHTML = text;
    
    // localstorage
    localStorage[parent.getAttribute('id')] = text;
}