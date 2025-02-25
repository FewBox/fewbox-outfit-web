import { Den } from "@fewbox/den-web-append";
import { ofType } from "redux-observable";
import { catchError, map, mergeMap, of, retry } from "rxjs";
import ActionTypes from "../actions/ActionTypes";
import StorageKeys from "../storage/StorageKeys";
import { isStorageExists, setStorage, getStorage } from "../storage";
import { Outcome, Tryon } from "../reducers/StateTypes";
import { loadOutcome } from "../actions";

const generateUUID = () => {
    return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const initClientEpic = (action$: any) =>
    action$.pipe(
        ofType(ActionTypes.INIT_CLIENT),
        map(() => {
            if (!isStorageExists(StorageKeys.CLIENT_ID)) {
                setStorage(StorageKeys.CLIENT_ID, generateUUID());
            }
            return Den.Action.emptyAction();
        })
    );

const tryOnEpic = (action$: any) =>
    action$.pipe(
        ofType(ActionTypes.TRY_ON),
        mergeMap((action: Den.Action.IPayloadAction<Tryon>) => {
            let operationName = 'RunQueue';
            let query = `mutation RunQueue($input: QueueRequest!) {
                runQueue(input: $input) {
                  isSuccessful
                  errorCode
                  errorMessage
                  payload {
                    promptId
                    number
                  }
                }
            }`;
            let variables = {
                "input": {
                    "clientId": action.payload.clientId,
                    "workflow": "tryon",
                    "placeholders": {
                        "scale": action.payload.scale,
                        "garment": action.payload.garment,
                        "model": action.payload.model,
                        "model_garment": action.payload.modelGarment,
                        "outfit": `${action.payload.clientId}.png`
                    }
                }
            };
            let graphql = {
                operationName,
                query,
                variables
            };
            return new Den.Network.GQL<Den.Store.IPayloadResponse<Outcome>>(graphql, 'runQueue')
                .pipe(
                    map((ajaxResponse: any) => {
                        let data = Den.Network.parseGQLAjaxData(ajaxResponse, 'runQueue');
                        console.log(data);
                        return loadOutcome('');
                    }),
                    retry(3),
                    catchError((error) => {
                        console.error(error.message);
                        return of(Den.Action.emptyAction());
                    }),
                    //startWith(beginLoading()),
                    //endWith(endLoading())
                );
        })
    );

export default [initClientEpic, tryOnEpic];