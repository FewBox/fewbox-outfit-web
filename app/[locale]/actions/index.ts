import { Den } from '@fewbox/den-web-append';
import ActionTypes from './ActionTypes';
import { MirrorReflect, SigninCredential, Tryon, WebsocketStatus } from '../reducers/StateTypes';

export const initClient = (): Den.Action.IAction => ({
    type: ActionTypes.INIT_CLIENT
});
export const changeModelImage = (modelImageUrl: string): Den.Action.IPayloadAction<string> => ({
    type: ActionTypes.CHANGE_MODEL_IMAGE,
    payload: modelImageUrl
});
export const tryon = (tryon: Tryon): Den.Action.IPayloadAction<Tryon> => ({
    type: ActionTypes.TRY_ON,
    payload: tryon
});
export const startFitting = (): Den.Action.IAction => ({
    type: ActionTypes.START_FITTING
});
export const completeFitting = (): Den.Action.IAction => ({
    type: ActionTypes.COMPLETE_FITTING
});
export const showMirror = (mirrorReflect: MirrorReflect): Den.Action.IPayloadAction<MirrorReflect> => ({
    type: ActionTypes.SHOW_MIRROR,
    payload: mirrorReflect
});
export const hideMirror = (): Den.Action.IAction => ({
    type: ActionTypes.HIDE_MIRROR
});
export const showSignin = (): Den.Action.IAction => ({
    type: ActionTypes.SHOW_SIGNIN
});
export const hideSignin = (): Den.Action.IAction => ({
    type: ActionTypes.HIDE_SIGNIN
});
export const signin = (signinCredential: SigninCredential): Den.Action.IPayloadAction<SigninCredential> => ({
    type: ActionTypes.SIGNIN,
    payload: signinCredential
});
export const authentication = (isValid: boolean): Den.Action.IPayloadAction<boolean> => ({
    type: ActionTypes.AUTHENTICATION,
    payload: isValid
});
export const setWebsocketStatus = (websocketStatus: WebsocketStatus): Den.Action.IPayloadAction<WebsocketStatus> => ({
    type: ActionTypes.SET_WEBSOCKET_STATUS,
    payload: websocketStatus
});