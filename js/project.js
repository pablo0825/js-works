
import { createTagAndClass } from './domUtils.js';
import { generateUniqueId } from './utils.js';

export function newProjectDom(enterValue) {

    const newProject = createTagAndClass('div', null, null, 'project');
    
    const uniqueId = generateUniqueId('project');
    newProject.id = uniqueId;

    const topBox = createTagAndClass('div', null, null, 'project_topbox');
    
    const dropdown = createTagAndClass('button', null, '<i class="fa-solid fa-play"></i>', 'btn', 'btn_dropdown');
    
    const titlebox = createTagAndClass('div', null, null, 'project_titlebox');

    const H2 = createTagAndClass('H2', enterValue, null);
    
    const container = document.createElement('div');

    const functions = createTagAndClass('button', null, '<i class="fa-solid fa-ellipsis-vertical"></i>', 'btn', 'btn_function');

    const dropdownMenu = createTagAndClass('div', null, null, 'dropdown-menu');

    const ul = document.createElement('ul');
    
    ['封存', '刪除'].forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        ul.appendChild(li);
    });

    const downBox = createTagAndClass('div', null, null,  'project_downbox');

    const add = createTagAndClass('button', null, '<i class="fa-solid fa-plus"></i>', 'btn', 'btn_add');
    
    newProject.appendChild(topBox);
    newProject.appendChild(downBox);
    newProject.appendChild(add);

    downBox.appendChild(newItemDom());

    topBox.appendChild(dropdown);
    topBox.appendChild(titlebox);
    titlebox.appendChild(H2);
    titlebox.appendChild(container);

    container.appendChild(functions);
    container.appendChild(dropdownMenu);

    dropdownMenu.appendChild(ul);

    return newProject;
}


export function newItemDom() {

    const newItem = createTagAndClass('div', null, null, 'item');

    const uniqueId = generateUniqueId('item');
    newItem.id = uniqueId;

    const checkboxBtn = createTagAndClass('button', null, null, 'btn', 'btn_checkbox', 'btn_checkbox-average');
    checkboxBtn.setAttribute('aria-checked', 'false');

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