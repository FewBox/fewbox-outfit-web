export const getStorage = (key: string): string => {
    let item = window.localStorage.getItem(key);
    return item ? item : '';
};
export const setStorage = (key: string, value: string): void => {
    window.localStorage.setItem(key, value);
};
export const removeStorage = (key: string): void => {
    window.localStorage.removeItem(key);
}
export const isStorageExists = (key: string): boolean => {
    return getStorage(key).length > 0;
}