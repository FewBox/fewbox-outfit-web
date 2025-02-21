import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import home from './home';

const appReducer = combineReducers({
    routing, home
});
export default (state: any, action: any): any => {
    if (action.type === 'RESETSESSION') {
        state = undefined;
    }
    return appReducer(state, action);
};