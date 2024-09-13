
import { isValidInput } from './utils.js';
import { newProjectDom, newItemDom } from './project.js';
import { gridDownbox, enterText } from './variables.js';

//新專案增加
export function newProjectInput() {

    const enterValue = enterText.value.trim();

    if(!isValidInput(enterValue)) return;

    gridDownbox.appendChild(newProjectDom(enterValue));

    enterText.value = "";
}

//新項目增加
export function handleNewItemAdd(addItemBtn) {

    const project = addItemBtn.closest('.project');
    const downBox = project.querySelector('.project_downbox');

    downBox.appendChild(newItemDom());
    handleReorder(downBox);
}

//刪除項目
export function handleItemDelete(deleteItemBtn) {
    const project = deleteItemBtn.closest('.project');
    const downBox = project.querySelector('.project_downbox');
    const item = downBox.querySelector('.item');

    downBox.removeChild(item);
    handleReorder(downBox);
}

//重新排序
export function handleReorder(downBox) {
    const fragment = document.createDocumentFragment();
    const items = Array.from(downBox.children);
    
    const urgentItem = items.filter(item => item.querySelector('.btn.btn_checkbox.btn_checkbox-urgent'));
    const averageItem = items.filter(item => item.querySelector('.btn.btn_checkbox.btn_checkbox-average'));
    const taketourtimeItem = items.filter(item => item.querySelector('.btn.btn_checkbox.btn_checkbox-taketourtime'));

    console.log('Urgent Items:', urgentItem);
    console.log('Average Items:', averageItem);
    console.log('Take Your Time Items:', taketourtimeItem);

    urgentItem.forEach(item => fragment.appendChild(item));
    averageItem.forEach(item => fragment.appendChild(item));
    taketourtimeItem.forEach(item => fragment.appendChild(item));

    downBox.innerHTML = '';
    downBox.appendChild(fragment);
}

//下拉選單
export function handleDropdown(btnFunction) {

    const project = btnFunction.closest('.project');
    const dropdownMenu = project.querySelector('.dropdown-menu');
  
    if (dropdownMenu) {
        dropdownMenu.classList.toggle('show');
    } else {
        console.error("Dropdown menu not found");
    }
}