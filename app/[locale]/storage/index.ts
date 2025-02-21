export const getStorage = (key: string): string => {
    let item = window.localStorage.getItem(key);
    return item ? item : '';
};
export const setStorage = (key: string, value: string): void => {
    window.localStorage.setItem(key, value);
};