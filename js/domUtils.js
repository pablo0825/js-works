

export function createTagAndClass(tagName, content = null, icon = null, ...classNames) {

    const tag = document.createElement(tagName);
    tag.classList.add(...classNames);
    if (content) tag.textContent = content;
    if (icon) tag.innerHTML = icon;
    return tag;
}


export function getElements(item) {
    return {
        remark: item.querySelector('.item_enter-remark'),
        btnBox: item.querySelector('.item_btnbox'),
        checkbox: item.querySelector('.btn_checkbox'),
        deleteBtn: item.querySelector('.btn_delete'),
        title: item.querySelector('.item_enter-title')
    };
}