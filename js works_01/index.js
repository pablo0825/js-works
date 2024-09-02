
const enterText = document.querySelector('.list_enter-text');
const enterBtn = document.querySelector('.list_enter-btn');
const downbox = document.querySelector('.list_downbox');

const itemCheckbox = document.querySelector('.list_item-checkbox');
const itemText = document.querySelector('.list_item-text');

const listContent = JSON.parse(localStorage.getItem('listContent')) || [];

window.addEventListener('load', () => {
    listContent.forEach(item => {
        listItem(item.Text, item.checked);
    });

    reorderItems();

});

enterBtn.addEventListener('click', () => {

    const enteValue = enterText.value;

    if(typeof enteValue === "string" && enteValue.trim() === ""){

        console.log("null");

    } else {
        listItem(enteValue, false);
        reorderItems();
        saveToLocal();
    }
    enterText.value = "";
});

enterText.addEventListener('keyup', (e) => {

    const enteValue = enterText.value;

    if(enteValue.trim() !== "" && e.keyCode === 13){

        listItem(enteValue, false);
        reorderItems();
        saveToLocal();
        enterText.value = "";
    }
});

//創造item的方法
function listItem(textValue, cbValue){

    const newDvi = document.createElement('div');
    newDvi.classList.add('list_item');

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('list_item-checkbox');
    checkBox.checked = cbValue;

    const itemDvi = document.createElement('div');
    itemDvi.classList.add('list_item-textbox');

    const textSpan = document.createElement('span');
    textSpan.textContent = textValue;
    textSpan.classList.add('list_item-text');

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    deleteBtn.classList.add('list_item-deleteBtn');

    newDvi.appendChild(checkBox);
    newDvi.appendChild(itemDvi);
    itemDvi.appendChild(textSpan);
    itemDvi.appendChild(deleteBtn);
    downbox.appendChild(newDvi);

    listContent.push({
        Text: textValue, checked: cbValue
    });
    saveToLocal();

    console.log(listContent);

    deleteItem(deleteBtn, newDvi, textValue);
    checkBoxChange(checkBox, textSpan, textValue);
}

//刪除JS創造的item
function deleteItem(deleteBtn, item, textValue) {

    deleteBtn.addEventListener('click', () => {

        downbox.removeChild(item);

        const index = listContent.findIndex(item => item.Text == textValue);

        if(index !== -1) {
            listContent.splice(index, 1);
            saveToLocal();
            console.log(listContent);
        }
    });
}

//checkBox改變後執行方法內容
function checkBoxChange(checkBox, textSpan, textValue) {
    checkBox.addEventListener('change', () => {

        //從陣列找到指定目標的方法
        const index = listContent.findIndex(item => item.Text == textValue);
        
        if(index !== -1) {
            listContent[index].checked = checkBox.checked;
            saveToLocal();
            console.log(listContent);
        }

        if(checkBox.checked){

            textSpan.classList.add('list_item-text-true');

        } else {

            textSpan.classList.remove('list_item-text-true');
        }
        reorderItems();
    });
}

//勾選、未勾選後，重新排序的方法
function reorderItems() {
    const items = Array.from(downbox.children);

    const checkedItems = items.filter(item => item.querySelector('.list_item-checkbox').checked);
    const uncheckedItems = items.filter(item => !item.querySelector('.list_item-checkbox').checked);

    // 清空 downbox
    downbox.innerHTML = '';

    //兩組重新排序，順序：未勾選、勾選
    uncheckedItems.forEach(item => downbox.appendChild(item));
    checkedItems.forEach(item => downbox.appendChild(item));
}

//把資料存到本地端
function saveToLocal() {
    localStorage.setItem('listContent', JSON.stringify(listContent));
}


/*
function reorderItems(item, newIndex) {
    const initialRect = item.getBoundingClientRect();

    // 将元素移动到新位置
    if (newIndex >= downbox.children.length) {
        downbox.appendChild(item);
    } else {
        downbox.insertBefore(item, downbox.children[newIndex]);
    }

    const finalRect = item.getBoundingClientRect();

    const deltaY = initialRect.top - finalRect.top;

    // 应用 FLIP 动画
    item.style.transform = `translateY(${deltaY}px)`;
    item.style.transition = 'none';

    requestAnimationFrame(() => {
        item.style.transition = 'transform 0.5s ease';
        item.style.transform = '';
    });
}*/