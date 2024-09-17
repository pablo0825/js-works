

export const gridDownbox =document.querySelector('.grid_downbox');

export const projectDownbox = document.querySelector('.project_downbox');

export const enterText = document.getElementById('enter');

export const enterBtn = document.getElementById('btn-enter');

let openItem = null; // 變數可變

export function getOpenItem() {
    return openItem;
}

export function setOpenItem(item) {
    openItem = item;
}

export const projects = [];
