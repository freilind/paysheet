export const getKeyDate = (date) => {
    let key = date.getFullYear();
    key += ("0" + (date.getMonth() + 1)).slice(-2);
    key += ("0" + (date.getDate())).slice(-2);
    return key;
}
