import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import home from './home';
import { Den } from '@fewbox/den-web-append';

const appReducer = combineReducers({
    routing, home
});
const RootReducer = (state: unknown, action: Den.Action.IAction | Den.Action.IPayloadAction<unknown>): unknown => {
    if (action.type === 'RESETSESSION') {
        state = undefined;
    }
    return appReducer(state, action);
};

export default RootReducer;