import { Den } from '@fewbox/den-web-append';
import { Home } from './StateTypes';
import ActionTypes from '../actions/ActionTypes';

const homeState = { modelImageUrl: "https://img.ltwebstatic.com/images3_pi/2025/01/03/7c/1735896447c6ae06db2def0b14704e23fba94b84b4.webp" };
export default (state: Home = homeState, action: Den.Action.IPayloadAction<any>): Home => {
    switch (action.type) {
        case ActionTypes.CHANGE_MODEL_IMAGE:
            return { ...state, modelImageUrl: action.payload };
        case ActionTypes.LOAD_OUTCOME:
            return { ...state, outcomeImageUrl: action.payload };
        default:
            return state;
    }
};