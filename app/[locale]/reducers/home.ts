import { Den } from '@fewbox/den-web-append';
import { Home, WebsocketStatus } from './StateTypes';
import ActionTypes from '../actions/ActionTypes';

const homeState = {
    isSigninShow: false, isPasswordValid: true, websocketStatus: WebsocketStatus.Close, modelImageUrl: "/images/women.png", isFitting: false,
    //mirrorReflect: { captionId: 'bingo', imageUrl: 'http://localhost:4000/images?type=output&filename=c9b2214a-95ff-5b3c-570f-0bd345eb97f3.png' }
};
export default (state: Home = homeState, action: Den.Action.IPayloadAction<any>): Home => {
    switch (action.type) {
        case ActionTypes.CHANGE_MODEL_IMAGE:
            return { ...state, modelImageUrl: action.payload };
        case ActionTypes.START_FITTING:
            return { ...state, isFitting: true };
        case ActionTypes.COMPLETE_FITTING:
            return { ...state, isFitting: false };
        case ActionTypes.SHOW_MIRROR:
            return { ...state, mirrorReflect: action.payload };
        case ActionTypes.HIDE_MIRROR:
            return { ...state, mirrorReflect: undefined };
        case ActionTypes.SHOW_SIGNIN:
            return { ...state, isSigninShow: true };
        case ActionTypes.HIDE_SIGNIN:
            return { ...state, isSigninShow: false };
        case ActionTypes.AUTHENTICATION:
            return { ...state, isPasswordValid: action.payload }
        case ActionTypes.SET_WEBSOCKET_STATUS:
            return { ...state, websocketStatus: action.payload }
        default:
            return state;
    }
};