
import { getElements } from './domUtils.js';
import {  getOpenItem, setOpenItem } from './variables.js';
import { handleReorder } from './eventHandlers.js';


export function toggleItemState(item, remark, btnBox, isOpen) {
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

    const openItem = getOpenItem();

    if (item === openItem) {
        toggleItemState(item, remark, btnBox, false);
        setOpenItem(null);

    } else {
        if (openItem) {
            const { remark: openRemark, btnBox: openBtnBox } = getElements(openItem);
            toggleItemState(openItem, openRemark, openBtnBox, false);
        }
        toggleItemState(item, remark, btnBox, true);
        setOpenItem(item);
    }
}

function toggleCheckbox(checkboxBtn, item, remark, btnBox) {
    const isChecked = checkboxBtn.getAttribute('aria-checked') === 'true';
    checkboxBtn.setAttribute('aria-checked', isChecked ? 'false' : 'true');

    if (!isChecked) {
        toggleItemState(item, remark, btnBox, false);  
        setOpenItem(null);
    }
}

export function handleBtnBox(e) {
    const actionButtons = ['urgent', 'average', 'taketourtime'];
    const button = actionButtons.find(action => e.target.closest(`.${action}`));

    if (button) {
        const downBox = e.target.closest('.project_downbox');
        const item = e.target.closest('.item');
        const { checkbox } = getElements(item);

        if (checkbox) {
            checkbox.classList.remove('btn_checkbox-urgent', 'btn_checkbox-average', 'btn_checkbox-taketourtime');
            checkbox.classList.add(`btn_checkbox-${button}`);

            handleReorder(downBox);
        }
        const openItem = getOpenItem();
        if (item && item === openItem) {
            const { remark, btnBox } = getElements(item);
            toggleItemState(item, remark, btnBox, false);
            setOpenItem(null);
        }

        e.stopPropagation();
    }
}


export function handleInteraction(e) {
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