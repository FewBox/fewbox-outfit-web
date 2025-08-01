import { Den } from '@fewbox/den-web-append';
import { FittingProgress, HelpStatus, Home, MirrorReflect, WebsocketStatus } from './StateTypes';
import ActionTypes from '../actions/ActionTypes';

const homeState = {
    isSigninShow: false, isPasswordValid: true, websocketStatus: WebsocketStatus.Close, modelImageUrl: "/images/women.png", isFitting: false,
    //mirrorReflect: { captionId: 'bingo', imageUrl: 'http://localhost:4000/images?type=output&filename=c9b2214a-95ff-5b3c-570f-0bd345eb97f3.png' }
    fittingProgress: { totalStep: 30, currentStep: 0 }, websocketReconnectTimes: 0, helpStatus: HelpStatus.Hidden
};

const HomeReducer = (state: Home = homeState, action: Den.Action.IPayloadAction<unknown>): Home => {
    switch (action.type) {
        case ActionTypes.RECONNECT_WEBSOCKET:
            return { ...state, websocketReconnectTimes: state.websocketReconnectTimes + 1 };
        case ActionTypes.CHANGE_MODEL_IMAGE:
            return { ...state, modelImageUrl: action.payload as string };
        case ActionTypes.START_FITTING:
            return { ...state, isFitting: true };
        case ActionTypes.COMPLETE_FITTING:
            return { ...state, isFitting: false };
        case ActionTypes.SHOW_MIRROR:
            return { ...state, mirrorReflect: action.payload as MirrorReflect };
        case ActionTypes.HIDE_MIRROR:
            return { ...state, mirrorReflect: undefined };
        case ActionTypes.SHOW_SIGNIN:
            return { ...state, isSigninShow: true };
        case ActionTypes.HIDE_SIGNIN:
            return { ...state, isSigninShow: false };
        case ActionTypes.AUTHENTICATION:
            return { ...state, isPasswordValid: action.payload as boolean };
        case ActionTypes.SET_WEBSOCKET_STATUS:
            if (action.payload == WebsocketStatus.Open) {
                return { ...state, websocketStatus: action.payload as WebsocketStatus, websocketReconnectTimes: 0 };
            }
            else {
                return { ...state, websocketStatus: action.payload as WebsocketStatus };
            }
        case ActionTypes.SHOW_FITTING_PROGRESS:
            return { ...state, fittingProgress: action.payload as FittingProgress };
        case ActionTypes.SET_HELP_STATUS:
            return {...state, helpStatus: action.payload as HelpStatus};
        default:
            return state;
    }
};

export default HomeReducer;