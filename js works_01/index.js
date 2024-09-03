const enterText = document.querySelector('.list_enter-text');
const enterBtn = document.querySelector('.list_enter-btn');
const downbox = document.querySelector('.list_downbox');

const listContent = JSON.parse(localStorage.getItem('listContent')) || [];

window.addEventListener('load', () => {
    listContent.forEach(item => {
        listItem(item.Text, item.checked, false);
    });

    reorderItems();

});

//為null不執行，有字串在執行
function newItemInput(){
    const enteValue = enterText.value;

    if(enteValue.trim() === ""){

        console.log("null");

    } else {
        listItem(enteValue, false, true);
        reorderItems();
        saveToLocal();
    }
    enterText.value = "";
}

enterBtn.addEventListener('click', newItemInput);

enterText.addEventListener('keyup', (e) => {

    if(e.keyCode === 13){

        newItemInput()
    }
});

//創造item的方法
function listItem(textValue, cbValue, addToList = true){

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

    if(addToList){
        listContent.push({

            Text: textValue, checked: cbValue

        });

        saveToLocal();
    }

    console.log(listContent);
}

//刪除JS創造的item
function deleteItem(item, textValue) {

    downbox.removeChild(item);

    const index = listContent.findIndex(item => item.Text === textValue);

    if(index !== -1) {
        listContent.splice(index, 1);
        saveToLocal();
    }
}

//checkBox改變後執行方法內容
function checkBoxChange(checkBox, textSpan, textValue) {
    
    //從陣列找到指定目標的方法
    const index = listContent.findIndex(item => item.Text === textValue);
    
    if(index !== -1) {
        listContent[index].checked = checkBox.checked;
        saveToLocal();
    }

    textSpan.classList.toggle('list_item-text-true', checkBox.checked);

    reorderItems();
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

//處理刪除
function handleDelete(e) {
    const deleteBtn = e.target.closest('.list_item-deleteBtn');

    if(deleteBtn){
        const itemDvi = deleteBtn.closest('.list_item');
        const textValue = itemDvi.querySelector('.list_item-text').textContent;
        deleteItem(itemDvi, textValue);
    }
}

//處理複選框
function handleCheckBox(e) {
    const checkBox = e.target;

    if (checkBox.classList.contains('list_item-checkbox')) {
        const itemDiv = checkBox.closest('.list_item');
        const textSpan = itemDiv.querySelector('.list_item-text');
        const textValue = textSpan.textContent;
        checkBoxChange(checkBox, textSpan, textValue);
    }
}

downbox.addEventListener('click', handleDelete);
downbox.addEventListener('change', handleCheckBox);

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