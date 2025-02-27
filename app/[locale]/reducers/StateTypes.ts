/** Root **/
export interface Store {
    home: Home;
}
/** Page **/
export interface Home {
    modelImageUrl: string;
    outcomeImageUrl?: string;
    isFitting: boolean;
    isEffectShow: boolean;
}
/** Action **/
export interface Tryon {
    clientId: string;
    scale: number;
    model: string;
    garment: string;
    modelGarment: string;
}
export interface Outcome {
}