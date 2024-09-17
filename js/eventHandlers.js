
import { isValidInput } from './utils.js';
import { newProjectDom, newItemDom } from './project.js';
import { gridDownbox, enterText, projects } from './variables.js';



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
    const checkbox = project.querySelector('.btn_checkbox');

    const newItem = newItemDom(); 
    newItem.classList.add('item-enter', 'item-transition'); // 新增時添加動畫

    downBox.appendChild(newItem);
    
    requestAnimationFrame(() => {
        newItem.classList.remove('item-enter');
    });

    reorderItems(downBox, checkbox);

    // 將新項目加入到專案的 items 陣列
    const projectId = project.id;
    const projectData = projects.find(p => p.id === projectId);

    if (projectData) {
        const itemData = {
            id: newItem.id,
            title: newItem.querySelector('.item_enter-title').value || 'Untitled Item'
        };
        projectData.items.push(itemData);
    }
}


//刪除項目
export function handleItemDelete(deleteItemBtn) {
    const project = deleteItemBtn.closest('.project');
    const downBox = project.querySelector('.project_downbox');
    const item = deleteItemBtn.closest('.item');

    const itemRect = item.getBoundingClientRect();
    item.style.height = `${itemRect.height}px`;
    item.style.width = `${itemRect.width}px`;

    // 添加離開動畫類並設置 position: absolute
    item.classList.add('item-leave', 'item-transition');
    item.style.position = 'absolute';  // 保持刪除項目在原位

    // 等待動畫結束後再刪除元素
    item.addEventListener('transitionend', (event) => {
        if (event.propertyName === 'opacity' || event.propertyName === 'transform') {
            downBox.removeChild(item);  // 刪除 DOM 元素
            reorderItems(downBox);  // 重新排列剩下的項目
        }
    });

    // 從專案的 items 陣列中移除該項目
    const projectId = project.id;
    const projectData = projects.find(p => p.id === projectId);

    if (projectData) {
        const itemIndex = projectData.items.findIndex(i => i.id === item.id);
        if (itemIndex > -1) {
            projectData.items.splice(itemIndex, 1);
        }
    }
}


export function reorderItems(downBox) {
    const fragment = document.createDocumentFragment();
    const items = Array.from(downBox.children);

    const [uncheckedItems, checkedItems] = items.reduce((acc, item) => {
        const checkbox = item.querySelector('.btn.btn_checkbox');
        checkbox.getAttribute('aria-checked') === 'true' ? acc[1].push(item) : acc[0].push(item);
        return acc;
    }, [[], []]);

    const urgentItem = uncheckedItems.filter(item => item.querySelector('.btn.btn_checkbox.btn_checkbox-urgent'));
    const averageItem = uncheckedItems.filter(item => item.querySelector('.btn.btn_checkbox.btn_checkbox-average'));
    const taketourtimeItem = uncheckedItems.filter(item => item.querySelector('.btn.btn_checkbox.btn_checkbox-taketourtime'));

    [...urgentItem, ...averageItem, ...taketourtimeItem, ...checkedItems].forEach(item => fragment.appendChild(item));

    downBox.innerHTML = ''; // 清空原始內容
    downBox.appendChild(fragment); // 將重新排序的元素添加回去
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