//<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

const enterText = document.querySelector('.list_enter-text');
const enterBtn = document.querySelector('.list_enter-btn');
const downbox = document.querySelector('.list_downbox');

const itemCheckbox = document.querySelector('.list_item-checkbox');

enterBtn.addEventListener('click', () => {
    const enteValue = enterText.value;

    if(typeof enteValue === "string"  & enteValue.trim() === ""){
        console.log(13);
    } else {
        listItem(enteValue);
        reorderItems();
    }

    enterText.value = "";
});

enterText.addEventListener('keyup', (e) => {

    const enteValue = enterText.value;

    if(e.keyCode === 13){

        listItem(enteValue);
        reorderItems();
        enterText.value = "";

    } 
});


function listItem(textValue){

    if(enterText.value === ""){
        return;
    }

    //創造一個dvi
    const newDvi = document.createElement('div');
    newDvi.classList.add('list_item');

    //創造一個複選框
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('list_item-checkbox');
    newDvi.appendChild(checkBox);

    //創造包字串和

    const itemDvi = document.createElement('div');
    itemDvi.classList.add('list_item-textbox');
    newDvi.appendChild(itemDvi);

    const textSpan = document.createElement('span');
    textSpan.textContent = textValue;
    //textSpan.style.color = 'blue';
    textSpan.classList.add('list_item-text');
    itemDvi.appendChild(textSpan);

    const deleteBtn = document.createElement('button');
    //deleteBtn.textContent ='❌';
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    deleteBtn.classList.add('list_item-deleteBtn');
    itemDvi.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', () => {
        downbox.removeChild(newDvi);
    });

    checkBox.addEventListener('change', () => {
        if(checkBox.checked){
            textSpan.classList.add('list_item-text-true');
            reorderItems(newDvi, 0);
        } else {
            textSpan.classList.remove('list_item-text-true');
            reorderItems(newDvi, downbox.children.length - 1);
        }
    });

    downbox.appendChild(newDvi);
}

/*
function reorderItems() {
    const items = Array.from(downbox.children);
    
    const checkedItems = items.filter(item => item.querySelector('.list_item-checkbox').checked);
    const uncheckedItems = items.filter(item => !item.querySelector('.list_item-checkbox').checked);

    // 清空 downbox，然后按顺序重新添加
    downbox.innerHTML = '';
    uncheckedItems.forEach(item => downbox.appendChild(item));
    checkedItems.forEach(item => downbox.appendChild(item));

}
*/

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
}