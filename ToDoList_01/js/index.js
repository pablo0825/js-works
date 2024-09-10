const projectDownbox = document.querySelector('.project_downbox');
let openItem = null;

// 簡化 toggleCheckbox，避免重複代碼
function toggleCheckbox(checkboxBtn) {
    const isChecked = checkboxBtn.getAttribute('aria-checked') === 'true';
    checkboxBtn.setAttribute('aria-checked', isChecked ? 'false' : 'true');
}

function handleCheckbox(e) {
    const checkbox = e.target;
    toggleCheckbox(checkbox);
}

function itemUnfold(item, remark, btnBox) {
    if (item === openItem) {
        // 關閉目前展開的項目
        remark.classList.remove('item_enter-remark-open');
        btnBox.classList.remove('item_btnbox-open');
        item.classList.remove('item-open');

        remark.setAttribute('inert', '');
        btnBox.setAttribute('inert', '');

        openItem = null;
    } else {
        // 關閉之前展開的項目
        if (openItem) {
            const openRemark = openItem.querySelector('.item_enter-remark');
            const openBtnbox = openItem.querySelector('.item_btnbox');
            if (openRemark) openRemark.classList.remove('item_enter-remark-open');
            if (openBtnbox) openBtnbox.classList.remove('item_btnbox-open');

            openRemark.setAttribute('inert', '');
            openBtnbox.setAttribute('inert', '');
    
            openItem.classList.remove('item-open');
        }
        // 展開當前項目
        remark.classList.add('item_enter-remark-open');
        btnBox.classList.add('item_btnbox-open');

        remark.removeAttribute('inert');
        btnBox.removeAttribute('inert');

        item.classList.add('item-open');
        openItem = item;
    }
}



// 簡化 handleItemUnfold
function handleItemUnfold(e) {
    const item = e.target.closest('.item');
    if (!item) return;

    const remark = item.querySelector('.item_enter-remark');
    const btnBox = item.querySelector('.item_btnbox');
    const checkbox = item.querySelector('.btn_checkbox');
    const deleteBtn = item.querySelector('.btn_delete');

    const title = item.querySelector('.item_enter-title');
    if (title && title.contains(e.target)) {
        if (item !== openItem) {
            itemUnfold(item, remark, btnBox);
        }
        e.stopPropagation();
        return;
    }

    // 對 checkbox 和 deleteBtn 的邏輯進行合併
    if ((checkbox && checkbox.contains(e.target)) || (deleteBtn && deleteBtn.contains(e.target))) {
        item.classList.remove('item_btnbox-open');
        e.stopPropagation();
        return;
    }

    if (remark && remark.contains(e.target)) {
        e.stopPropagation(); // 阻止事件冒泡，避免關閉 item
        return;
    }

    if (btnBox && btnBox.contains(e.target)) {
        e.stopPropagation(); // 阻止事件冒泡，避免關閉 item
        return;
    }

    // 項目展開/收起
    if (remark && btnBox) {
        itemUnfold(item, remark, btnBox);
        e.stopPropagation();
    }
}

// 簡化 handleBtnBox，減少重複代碼
function handleBtnBox(e) {
    const actionButtons = ['urgent', 'average', 'taketourtime'];
    let item = null;

    // 確定按下的是哪個按鈕
    const button = actionButtons.find(action => e.target.closest(`.${action}`));

    if (button) {
        item = e.target.closest('.item');
        const checkbox = item.querySelector('.btn_checkbox');

        if (checkbox) {
            checkbox.classList.remove('btn_checkbox-urgent', 'btn_checkbox-average', 'btn_checkbox-taketourtime');
            checkbox.classList.add(`btn_checkbox-${button}`);
        }
    }

    // 如果 item 是當前展開的項目，延遲 0.5 秒後關閉
    if (item && item === openItem) {
        setTimeout(() => {
            const remark = item.querySelector('.item_enter-remark');
            const btnBox = item.querySelector('.item_btnbox');
            if (remark && btnBox) {
                remark.classList.remove('item_enter-remark-open');
                btnBox.classList.remove('item_btnbox-open');
                item.classList.remove('item-open');
                openItem = null;
            }
        }, 100); // 延遲 0.5 秒
    }

    e.stopPropagation();
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.item') && openItem) {
        const openRemark = openItem.querySelector('.item_enter-remark');
        const openBtnbox = openItem.querySelector('.item_btnbox');
        if (openRemark) openRemark.classList.remove('item_enter-remark-open');
        if (openBtnbox) openBtnbox.classList.remove('item_btnbox-open');
        openItem.classList.remove('item-open');
        openItem = null;
    }
});

projectDownbox.addEventListener('click', (e) => {
    e.stopPropagation();
    handleCheckbox(e);
    handleItemUnfold(e);
    handleBtnBox(e);
});

