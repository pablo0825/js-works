const enterText = document.querySelector('.list_enter-text');
const enterBtn = document.querySelector('.list_enter-btn');
const downbox = document.querySelector('.list_downbox');

const displayText = document.querySelector('.displayValue');


enterBtn.addEventListener('click', () => {
    const enteValue = enterText.value;

    //displayText.textContent = `你輸入的值是: ${enteValue}`;
    listItem(enteValue);
});

function listItem(textValue){

    //創造一個dvi
    const newDvi = document.createElement('div');
    newDvi.classList.add('list_item');

    //創造一個複選框
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    newDvi.appendChild(checkBox);

    //創造包字串和

    const textSpan = document.createElement('span');
    textSpan.textContent = textValue;
    textSpan.style.color = 'blue';
    textSpan.classList.add('list_item-text');
    newDvi.appendChild(textSpan);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent ='❌';
    deleteBtn.classList.add('list_item-deleteBtn');
    newDvi.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', () => {
        downbox.removeChild(newDvi);
    });

    downbox.appendChild(newDvi);
}