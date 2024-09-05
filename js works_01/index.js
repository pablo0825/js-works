const enterText = document.querySelector('.list_enter-text');
const enterBtn = document.querySelector('.list_enter-btn');
const downbox = document.querySelector('.list_downbox');

let listContent = JSON.parse(localStorage.getItem('listContent')) || [];

// 頁面加載時從 localStorage 加載項目
window.addEventListener('load', () => {
    listContent.forEach(item => {
        downbox.appendChild(listItemDOM(item.Text, item.checked));
    });
    reorderItems();
});

// 防抖機制，減少不必要的儲存次數
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

const debouncedSave = debounce(saveToLocal, 300);

// 確認輸入是否有效
function isValidInput(input) {
    return input && input.trim() !== '';
}

// 處理新項目輸入
function newItemInput() {
    const enterValue = enterText.value.trim();
    if (!isValidInput(enterValue)) return;  // 空字串則不處理

    downbox.appendChild(listItemDOM(enterValue, false));
    listContent.push({ Text: enterValue, checked: false });

    reorderItems();
    saveToLocal();
    enterText.value = "";
}

enterBtn.addEventListener('click', newItemInput);
enterText.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        newItemInput();
    }
});

// 創建項目的 DOM 元素
function listItemDOM(textValue, cbValue) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('list_item');

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('list_item-checkbox');
    checkBox.checked = cbValue;

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('list_item-textbox');

    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.value = textValue;
    textInput.classList.add('list_item-text');
    textInput.setAttribute('data-old-value', textValue);

    // 根據 checkBox 狀態來設置樣式
    textInput.classList.toggle('list_item-text-true', cbValue);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    deleteBtn.classList.add('list_item-deleteBtn');

    newDiv.appendChild(checkBox);
    newDiv.appendChild(itemDiv);
    itemDiv.appendChild(textInput);
    itemDiv.appendChild(deleteBtn);

    return newDiv;
}

// 刪除項目
function deleteItem(item, textValue) {
    downbox.removeChild(item);
    listContent = listContent.filter(item => item.Text !== textValue);
    debouncedSave();
}

// 更新複選框的狀態並保存到 localStorage
function checkBoxChange(checkBox, textInput, textValue) {
    const index = listContent.findIndex(item => item.Text === textValue);
    if (index !== -1) {
        listContent[index].checked = checkBox.checked;
        textInput.classList.toggle('list_item-text-true', checkBox.checked);
        debouncedSave();
    }
    reorderItems();
}

// 更新文字輸入框內容並保存
function modifyTextInput(textInput, oldTextValue) {
    const newTextValue = textInput.value;
    const index = listContent.findIndex(item => item.Text === oldTextValue);
    if (index !== -1) {
        listContent[index].Text = newTextValue;
        textInput.setAttribute('data-old-value', newTextValue);
        debouncedSave();
    }
}

// 根據複選框的狀態重新排序項目
function reorderItems() {
    const fragment = document.createDocumentFragment();
    const items = Array.from(downbox.children);

    const uncheckedItems = items.filter(item => !item.querySelector('.list_item-checkbox').checked);
    const checkedItems = items.filter(item => item.querySelector('.list_item-checkbox').checked);

    uncheckedItems.forEach(item => fragment.appendChild(item));
    checkedItems.forEach(item => fragment.appendChild(item));

    downbox.innerHTML = '';
    downbox.appendChild(fragment);
}

// 保存數據到 localStorage
function saveToLocal() {
    localStorage.setItem('listContent', JSON.stringify(listContent));
}

// 處理刪除按鈕點擊事件
function handleDelete(e) {
    const deleteBtn = e.target.closest('.list_item-deleteBtn');
    if (deleteBtn) {
        const itemDiv = deleteBtn.closest('.list_item');
        const textValue = itemDiv.querySelector('.list_item-text').value;
        deleteItem(itemDiv, textValue);
    }
}

// 處理複選框變更事件
function handleCheckBox(e) {
    const checkBox = e.target;
    if (checkBox.classList.contains('list_item-checkbox')) {
        const itemDiv = checkBox.closest('.list_item');
        const textInput = itemDiv.querySelector('.list_item-text');
        const textValue = textInput.value;
        checkBoxChange(checkBox, textInput, textValue);
    }
}

// 處理文字輸入框變更事件
function handleModifTextInput(e) {
    const textInput = e.target;
    if (textInput.classList.contains('list_item-text')) {
        const oldTextValue = textInput.getAttribute('data-old-value');
        modifyTextInput(textInput, oldTextValue);
    }
}

downbox.addEventListener('click', handleDelete);
downbox.addEventListener('change', handleCheckBox);
downbox.addEventListener('input', handleModifTextInput);
