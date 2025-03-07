import { Den } from "@fewbox/den-web-append";
import { StateObservable, ofType } from "redux-observable";
import { catchError, map, mergeMap, of, retry } from "rxjs";
import ActionTypes from "../actions/ActionTypes";
import StorageKeys from "../storage/StorageKeys";
import { isStorageExists, setStorage, getStorage } from "../storage";
import { Authentication, FittingProgress, MirrorReflect, SigninCredential, Store, Tryon, WebsocketStatus } from "../reducers/StateTypes";
import { authentication, completeFitting, hideSignin, setWebsocketStatus, showFittingProcess, showMirror } from "../actions";
import store from "../store";

const generateUUID = () => {
    return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const initClientEpic = (action$: any, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.INIT_CLIENT),
        map(() => {
            if (!isStorageExists(StorageKeys.CLIENT_ID)) {
                setStorage(StorageKeys.CLIENT_ID, generateUUID());
            }
            const clientId = getStorage(StorageKeys.CLIENT_ID);
            const options: Den.Network.IWebsocketOptions = {
                query: `?clientId=${clientId}`,
                external: 'wsEndpoint'
            };
            const ws = new Den.Network.WS(options);
            ws.open(() => {
                console.log('Open Websocket.');
                store.dispatch(setWebsocketStatus(WebsocketStatus.Open));
            });
            ws.receive((e) => {
                const message = JSON.parse(e.data);
                console.log(message);
                if (message.type == 'execution_error') {
                    //console.error(message.data);
                    store.dispatch(completeFitting());
                    const mirrorReflect: MirrorReflect = {
                        captionId: 'exception'
                    };
                    store.dispatch(showMirror(mirrorReflect));
                }
                else if (message.type == 'execution_success') {
                    const fittingProcess: FittingProgress = {
                        totalStep: 30,
                        currentStep: 30
                    };
                    store.dispatch(showFittingProcess(fittingProcess));
                    store.dispatch(completeFitting());
                    const mirrorReflect: MirrorReflect = {
                        captionId: 'bingo',
                        imageUrl: `${Den.Network.buildExternalUrl('assetEndpoint')}?type=output&filename=${clientId}.png`
                    };
                    store.dispatch(showMirror(mirrorReflect));
                }
                else if (message.type == 'progress') {
                    const fittingProcess: FittingProgress = {
                        totalStep: message.data.max,
                        currentStep: message.data.value
                    };
                    store.dispatch(showFittingProcess(fittingProcess));
                }
            });
            ws.close(() => {
                console.log('Close Websocket.');
                store.dispatch(setWebsocketStatus(WebsocketStatus.Close));
            });
            ws.handleError((e) => {
                //console.error(e);
            });
            return Den.Action.emptyAction();
        })
    );

const signinEpic = (action$: any) =>
    action$.pipe(
        ofType(ActionTypes.SIGNIN),
        mergeMap((action: Den.Action.IPayloadAction<SigninCredential>) => {
            let operationName = 'Signin';
            let query = `mutation Signin($input: SigninRequest) {
                signin(input: $input) {
                  errorCode
                  errorMessage
                  isSuccessful
                  payload {
                    isValid
                    token
                  }
                }
              }`;
            let variables = {
                "input": {
                    "username": action.payload.username,
                    "password": action.payload.password
                }
            };
            let graphql = {
                operationName,
                query,
                variables
            };
            return new Den.Network.GQL<Den.Store.IPayloadResponse<Authentication>>(graphql, 'signin')
                .pipe(
                    map((ajaxResponse: any) => {
                        let data = Den.Network.parseGQLAjaxData(ajaxResponse, 'signin');
                        if (data.isSuccessful) {
                            if (data.payload.isValid) {
                                setStorage(StorageKeys.TOKEN, data.payload.token);
                                store.dispatch(hideSignin());
                                return authentication(true);
                            }
                            else {
                                return authentication(false);
                            }
                        }
                        else {
                            const mirrorReflect: MirrorReflect = {
                                captionId: 'exception'
                            };
                            return showMirror(mirrorReflect);
                        }
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

const tryOnEpic = (action$: any, store$: StateObservable<Store>) =>
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
            return new Den.Network.GQL<Den.Store.IPayloadResponse<MirrorReflect>>(graphql, 'runQueue')
                .pipe(
                    map((ajaxResponse: any) => {
                        let data = Den.Network.parseGQLAjaxData(ajaxResponse, 'runQueue');
                        console.log(data);
                        if (store$.value.home.websocketStatus == WebsocketStatus.Close) {
                            return completeFitting();
                        }
                        else {
                            return Den.Action.emptyAction();
                        }
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

const showMirrorHistoryEpic = (action$: any, store$: StateObservable<Store>) =>
    action$.pipe(
        ofType(ActionTypes.SHOW_MIRROR_HISTORY),
        map((action: Den.Action.IAction) => {
            const clientId = getStorage(StorageKeys.CLIENT_ID);
            const mirrorReflect: MirrorReflect = {
                captionId: 'bingo',
                imageUrl: `${Den.Network.buildExternalUrl('assetEndpoint')}?type=output&filename=${clientId}.png`
            };
            return showMirror(mirrorReflect);
        })
    );

export default [initClientEpic, signinEpic, tryOnEpic, showMirrorHistoryEpic];