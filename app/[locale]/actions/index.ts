import { Den } from '@fewbox/den-web-append';
import ActionTypes from './ActionTypes';
import { Tryon } from '../reducers/StateTypes';

export const initClient = (): Den.Action.IAction => ({
    type: ActionTypes.INIT_CLIENT
});
export const changeModelImage = (modelImageUrl: string): Den.Action.IPayloadAction<string> => ({
    type: ActionTypes.CHANGE_MODEL_IMAGE,
    payload: modelImageUrl
});
export const tryon = (tryon: Tryon): Den.Action.IPayloadAction<Tryon> =>({
    type: ActionTypes.TRY_ON,
    payload: tryon
});
export const loadOutcome = (outcomeImageUrl: string): Den.Action.IPayloadAction<string> => ({
    type: ActionTypes.LOAD_OUTCOME,
    payload: outcomeImageUrl
});