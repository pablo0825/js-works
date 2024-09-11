
const enterText = document.getElementById('enter');
const enterBtn = document.getElementById('btn-enter');

const gridDownbox =document.querySelector('.grid_downbox');

const projectDownbox = document.querySelector('.project_downbox');
let openItem = null;


function getElements(item) {
    return {
        remark: item.querySelector('.item_enter-remark'),
        btnBox: item.querySelector('.item_btnbox'),
        checkbox: item.querySelector('.btn_checkbox'),
        deleteBtn: item.querySelector('.btn_delete'),
        title: item.querySelector('.item_enter-title')
    };
}


function toggleItemState(item, remark, btnBox, isOpen) {
    if (isOpen) {
        item.classList.add('item-open');
        remark.classList.add('item_enter-remark-open');
        btnBox.classList.add('item_btnbox-open');
        remark.removeAttribute('inert');
        btnBox.removeAttribute('inert');
    } else {
        item.classList.remove('item-open');
        remark.classList.remove('item_enter-remark-open');
        btnBox.classList.remove('item_btnbox-open');
        remark.setAttribute('inert', '');
        btnBox.setAttribute('inert', '');
    }
}


function itemUnfold(item, remark, btnBox) {
    if (item === openItem) {
        toggleItemState(item, remark, btnBox, false);
        openItem = null;
    } else {
        if (openItem) {
            const { remark: openRemark, btnBox: openBtnBox } = getElements(openItem);
            toggleItemState(openItem, openRemark, openBtnBox, false);
        }
        toggleItemState(item, remark, btnBox, true);
        openItem = item;
    }
}


function toggleCheckbox(checkboxBtn, item, remark, btnBox) {
    const isChecked = checkboxBtn.getAttribute('aria-checked') === 'true';
    checkboxBtn.setAttribute('aria-checked', isChecked ? 'false' : 'true');

    if (!isChecked) {
        toggleItemState(item, remark, btnBox, false);  
        openItem = null;
    }
}


function handleBtnBox(e) {
    const actionButtons = ['urgent', 'average', 'taketourtime'];
    const button = actionButtons.find(action => e.target.closest(`.${action}`));

    if (button) {
        const item = e.target.closest('.item');
        const { checkbox } = getElements(item);

        if (checkbox) {
            checkbox.classList.remove('btn_checkbox-urgent', 'btn_checkbox-average', 'btn_checkbox-taketourtime');
            checkbox.classList.add(`btn_checkbox-${button}`);
        }

        if (item && item === openItem) {
            const { remark, btnBox } = getElements(item);
            toggleItemState(item, remark, btnBox, false);
            openItem = null;
        }

        e.stopPropagation();
    }
}


function handleInteraction(e) {
    const item = e.target.closest('.item');
    if (!item) return;

    const { remark, btnBox, checkbox, title } = getElements(item);

    if (title && title.contains(e.target)) {
        itemUnfold(item, remark, btnBox);
    }


    else if (checkbox && checkbox.contains(e.target)) {
        toggleCheckbox(checkbox, item, remark, btnBox);
    }
}


document.addEventListener('click', (e) => {
    if (!e.target.closest('.item') && openItem) {
        const { remark, btnBox } = getElements(openItem);
        toggleItemState(openItem, remark, btnBox, false);
        openItem = null;
    }
});


function isValidInput(input) {

    return input && input.trim() !== '';
}

function newProjectInput() {

    const enterValue = enterText.value.trim();

    if(!isValidInput(enterValue)) return;

    gridDownbox.appendChild(listProjectDom(enterValue));

    enterText.value = "";
}

function createTagAndClass(tagName, content = null, icon = null, ...classNames) {

    const tag = document.createElement(tagName);
    tag.classList.add(...classNames);

    if(content){
        tag.textContent = content;
    }

    if(icon) {
        tag.innerHTML = icon;
    }

    return tag;
}

function listProjectDom(enterValue) {

    const newProject = createTagAndClass('div', null, null, 'project');
    
    const uniqueId = 'project-' + Date.now();
    newProject.id = uniqueId;

    const topBox = createTagAndClass('div', null, null, 'project_topbox');
    
    const dropdown = createTagAndClass('button', null, '<i class="fa-solid fa-play"></i>', 'btn', 'btn_dropdown');
    
    const titlebox = createTagAndClass('div', null, null, 'project_titlebox');

    const H2 = createTagAndClass('H2', enterValue, null);
    
    const functions = createTagAndClass('button', null, '<i class="fa-solid fa-ellipsis-vertical"></i>', 'btn', 'btn_function');
    
    const downBox = createTagAndClass('div', null, null,  'project_downbox');

    const add = createTagAndClass('button', null, '<i class="fa-solid fa-plus"></i>', 'btn', 'btn_add');
    
    newProject.appendChild(topBox);
    newProject.appendChild(downBox);
    newProject.appendChild(add);

    downBox.appendChild(newItemAdd());

    topBox.appendChild(dropdown);
    topBox.appendChild(titlebox);
    titlebox.appendChild(H2);
    titlebox.appendChild(functions);

    return newProject;
}

//title, remark, checkbox, actionButtons

function newItemAdd() {

    const newItem = createTagAndClass('div', null, null, 'item');

    const uniqueId = 'item-' + Date.now();
    newItem.id = uniqueId;

    const checkboxBtn = createTagAndClass('button', null, null, 'btn', 'btn_checkbox');

    const enter = createTagAndClass('div', null, null, 'item_enter');

    const deleteBtn = createTagAndClass('button', null, '<i class="fa-solid fa-xmark"></i>', 'btn', 'btn_delete');

    const enterTitle = createTagAndClass('input', null, null, 'item_enter-title');
    enterTitle.type = 'text';
    enterTitle.placeholder = '標題';

    const enterRemark = createTagAndClass('input', null, null, 'item_enter-remark');
    enterRemark.type = 'text';
    enterRemark.placeholder = '備註';

    const btnbox = createTagAndClass('div', null, null, 'item_btnbox');

    const urgent = createTagAndClass('button', '急', null, 'btn', 'btn_priority', 'urgent');
    const average = createTagAndClass('button', '普通', null, 'btn', 'btn_priority', 'average');
    const taketourtime = createTagAndClass('button', '慢慢來', null, 'btn', 'btn_priority', 'taketourtime');

    newItem.appendChild(checkboxBtn);
    newItem.appendChild(enter);
    newItem.appendChild(deleteBtn);

    enter.appendChild(enterTitle);
    enter.appendChild(enterRemark);
    enter.appendChild(btnbox);

    btnbox.appendChild(urgent);
    btnbox.appendChild(average);
    btnbox.appendChild(taketourtime);

    return newItem;
}


enterBtn.addEventListener('click', newProjectInput);

enterText.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        newProjectInput();
    }
});

projectDownbox.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest('.item_enter-title') || target.closest('.btn_checkbox') || target.closest('.item_btnbox')) {
        handleInteraction(e);
        handleBtnBox(e);
    }
});

