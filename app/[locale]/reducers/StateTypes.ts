/** Root **/
export interface Store {
    home: Home;
}
/** Page **/
export interface Home {
    isSigninShow: boolean;
    isPasswordValid: boolean;
    modelImageUrl: string;
    isFitting: boolean;
    mirrorReflect?: MirrorReflect;
    websocketStatus: WebsocketStatus;
    helpStatus: HelpStatus;
    websocketReconnectTimes: number;
    fittingProgress: FittingProgress;
}
/** Action **/
export interface Tryon {
    clientId: string;
    scale: number;
    model: string;
    garment: string;
    modelGarment: string;
}
export interface FittingProgress {
    totalStep: number;
    currentStep: number;
}
export interface SigninCredential {
    username: string;
    password: string;
}
export interface Authentication {
    isValid: boolean;
    token: string;
}
export interface MirrorReflect {
    captionId: string;
    imageUrl?: string;
}
export enum WebsocketStatus {
    Open = 'open',
    Close = 'close',
    Stop = 'stop'
}
export enum HelpStatus {
    Hidden = 'hidden',
    Visible = 'visible'
}