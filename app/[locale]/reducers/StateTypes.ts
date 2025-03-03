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
}
/** Action **/
export interface Tryon {
    clientId: string;
    scale: number;
    model: string;
    garment: string;
    modelGarment: string;
}
export interface SigninCredential {
    username: string;
    password: string;
}
export interface Authentication {
    isValid: boolean;
    token: string;
}
export interface MirrorReflect  {
    captionId: string;
    imageUrl?: string;
}