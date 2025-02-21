/** Common **/
export interface MetaResponse {
    isSuccessful: boolean;
    errorCode: string;
    errorMessage: string;
}
export interface PayloadResponse<P> extends MetaResponse {
    payload: P;
}
export interface List<T> {
    continueToken: string;
    items: T[];
}
export type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};
/** Root **/
export interface Store {
    home: Home;
}
/** Page **/
export interface Home {
    modelImageUrl: string;
}