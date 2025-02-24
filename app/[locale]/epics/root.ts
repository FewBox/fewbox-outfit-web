import { combineEpics } from 'redux-observable';
import home from './home';

export default combineEpics(...home);