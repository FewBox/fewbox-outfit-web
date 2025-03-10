import StorageKeys from "./StorageKeys";

export const getStorage = (key: StorageKeys): string => {
    const item = window.localStorage.getItem(key);
    return item ? item : '';
};
export const setStorage = (key: StorageKeys, value: string): void => {
    window.localStorage.setItem(key, value);
};
export const removeStorage = (key: StorageKeys): void => {
    window.localStorage.removeItem(key);
}
export const isStorageExists = (key: StorageKeys): boolean => {
    return getStorage(key).length > 0;
}