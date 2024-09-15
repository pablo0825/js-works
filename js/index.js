
import { toggleItemState, handleInteraction, handleBtnBox, checkBoxChange } from './itemHandlers.js';
import { newProjectInput, handleNewItemAdd, handleDropdown, handleItemDelete } from './eventHandlers.js';
import { getElements } from './domUtils.js';
import { enterText, enterBtn, setOpenItem, getOpenItem } from './variables.js';

document.addEventListener('click', (e) => {
    if (!e.target.closest('.item') && getOpenItem()) {
        const { remark, btnBox } = getElements(getOpenItem());
        toggleItemState(getOpenItem(), remark, btnBox, false);
        setOpenItem(null);
    }

    if (!e.target.closest('.dropdown-menu') && !e.target.closest('.btn_function')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('show');
        });
    }
});

enterBtn.addEventListener('click', newProjectInput);

enterText.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        newProjectInput();
    }
});

document.querySelector('.grid_downbox').addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest('.item_enter-title') || target.closest('.btn_checkbox') || target.closest('.item_btnbox')) {
        handleInteraction(e);
        handleBtnBox(e);
    }

    if(target.closest('.btn_add')){
        handleNewItemAdd(target);
    }

    if(target.closest('.btn_delete')) {
        handleItemDelete(target);
        
    }

    if(target.closest('.btn_function')) {
        handleDropdown(target);
    }

    if(target.closest('.btn_checkbox')) {
        checkBoxChange(target);
    }
});


