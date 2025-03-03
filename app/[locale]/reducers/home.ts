import { Den } from '@fewbox/den-web-append';
import { Home } from './StateTypes';
import ActionTypes from '../actions/ActionTypes';

const homeState = { isSigninShow: false, isPasswordValid: true, modelImageUrl: "https://img.ltwebstatic.com/images3_pi/2025/01/03/7c/1735896447c6ae06db2def0b14704e23fba94b84b4.webp", isFitting: false /*, effectUrl: '/images/effect.png'*/ };
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
        case ActionTypes.AUTHENTICATION: {
            return { ...state, isPasswordValid: action.payload }
        }
        default:
            return state;
    }
};