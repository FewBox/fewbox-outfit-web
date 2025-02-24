import { Den } from "@fewbox/den-web-append";
import { ofType } from "redux-observable";
import { catchError, map, mergeMap, of, retry } from "rxjs";
import ActionTypes from "../actions/ActionTypes";
import StorageTypes from "../storage/StorageTypes";
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
            if (!isStorageExists(StorageTypes.CLIENT_ID)) {
                setStorage(StorageTypes.CLIENT_ID, generateUUID());
            }
            return Den.Action.emptyAction();
        })
    );

const tryOnEpic = (action$: any) =>
    action$.pipe(
        ofType(ActionTypes.TRY_ON),
        mergeMap((action: Den.Action.IPayloadAction<Tryon>) => {
            const { file } = action.payload;
            let operationName = 'UploadImage';
            let query = `mutation UploadImage($input: UploadRequest!) {
                uploadImage(input: $input) {
                  isSuccessful
                  payload {
                    mimetype
                    filename
                    encoding
                  }
                }
              }`;
            let variables = {
                input: null
            };
            const formData = new FormData();
            formData.append('operations', JSON.stringify({ operationName, query, variables }));
            formData.append('map', JSON.stringify({ '0': ['variables.input'] }));
            formData.append('0', file, 'gogogo.png');
            return new Den.Network.GQLUpload<Den.Store.IPayloadResponse<Outcome>>(formData, 'uploadImage')
                .pipe(
                    map((ajaxResponse: any) => {
                        let data = Den.Network.parseGQLAjaxData(ajaxResponse, 'uploadImage');
                        console.log(data);
                        return of(loadOutcome(''));
                    }),
                    retry(3),
                    catchError((error) => {
                        console.error(Den.Network.getErrorMessage(error));
                        return of(Den.Action.emptyAction());
                    }),
                    //startWith(beginLoading()),
                    //endWith(endLoading())
                );
            /*const clientId = getStorage(StorageTypes.CLIENT_ID);
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
                    "clientId": clientId,
                    "workflow": "tryon",
                    "placeholders": {
                        "scale": 0.3,
                        "garment": "garment.png",
                        "model": "model.png",
                        "model_garment": "model_garment.png",
                        "outfit": `${clientId}.png`
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
                        return of(loadOutcome(''));
                    }),
                    retry(3),
                    catchError((error) => {
                        console.error(Den.Network.getErrorMessage(error));
                        return of(Den.Action.emptyAction());
                    }),
                    //startWith(beginLoading()),
                    //endWith(endLoading())
                );
                */
        })
    );

export default [initClientEpic, tryOnEpic];