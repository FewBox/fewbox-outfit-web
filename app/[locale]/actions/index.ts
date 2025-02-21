import { Den } from '@fewbox/den-web-append';
import ActionTypes from './ActionTypes';

export const loadGeneratedImage = (): Den.Interface.IAction => ({
    type: ActionTypes.LOAD_GENERATED_IMAGE
});
export const changeModelImage = (modelImageUrl: string): Den.Interface.IPayloadAction<string> => ({
    type: ActionTypes.CHANGE_MODEL_IMAGE,
    payload: modelImageUrl
});