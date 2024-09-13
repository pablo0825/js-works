

//產生唯一ID
export function generateUniqueId(prefix = 'item'){
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

//判斷有效輸入
export function isValidInput(input) {

    return input && input.trim() !== '';
}