//const checkboxBtn = document.getElementById('checked');

const textTitle = document.getElementById('text-title');

const textRemark = document.getElementById('text-remark');

//const item = document.querySelector('.item');

const itemBtnbox = document.querySelector('.item_btnbox');

const projectDownbox =document.querySelector('.project_downbox');

let openItem = null;


function toggleCheckbox(checkboxBtn) {

    if(checkboxBtn.getAttribute('aria-checked') === 'false') {

        checkboxBtn.setAttribute('aria-checked', true);

    } else {

        checkboxBtn.setAttribute('aria-checked', false);
    }
}

function handleCheckbox(e) {

    const Checkbox = e.target;

    toggleCheckbox(Checkbox);
}


function itemUnfold(item) {

    if(item === openItem) {

        item.classList.remove('item-open');

        openItem =null;

    } else {

        if(openItem) {

            openItem.classList.remove('item-open');
        }

        item.classList.add('item-open');

        openItem = item;
    }
}

function handleItemUnfold(e) {
    const item = e.target.closest('.item');

    if(item) {
        itemUnfold(item);
        e.stopPropagation();
    }
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.item') && openItem) {
        openItem.classList.remove('item-open');
        openItem = null; 
    }
});


projectDownbox.addEventListener('click', (e) => {
    e.stopPropagation();
    handleCheckbox(e);
    handleItemUnfold(e);
});


/*
textTitle.addEventListener('click', () => {
    textRemark.classList.add('item_enter-remark-open');
    itemBtnbox.classList.add('item_btnbox-open');
    item.classList.add('item-open');

    textRemark.removeAttribute('inert');
    itemBtnbox.removeAttribute('inert');
});

document.addEventListener('click', (e) => {
    if(!item.contains(e.target)) {
        textRemark.classList.remove('item_enter-remark-open');
        itemBtnbox.classList.remove('item_btnbox-open');
        item.classList.remove('item-open');

        textRemark.setAttribute('inert', '');
        itemBtnbox.setAttribute('inert', '');
    }
});
*/