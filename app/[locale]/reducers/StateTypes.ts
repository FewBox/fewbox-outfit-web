/** Root **/
export interface Store {
    home: Home;
}
/** Page **/
export interface Home {
    modelImageUrl: string;
    outcomeImageUrl?: string;
}
/** Action **/
export interface Tryon {
    file: Blob;
}
export interface Outcome {
}