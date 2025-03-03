
'use client';
import { Den } from '@fewbox/den-web-append';
import { getStorage } from '../../storage';
import StorageKeys from '../../storage/StorageKeys';

const Boot = () => {
    const options: Den.FewBox.IFewBoxOptions = {
        getToken: () => {
            return getStorage(StorageKeys.TOKEN);
        },
        getAppSettings: () => {
            return {
                "endpoint": {
                    "PROTOCOL": "http",
                    "HOST": "localhost",
                    "PORT": 4000,
                    "BASEPATH": null
                },
                "wsEndpoint": {
                    PROTOCOL: 'ws',
                    HOST: 'localhost',
                    PORT: 4000,
                    BASEPATH: 'ws'
                }
            };
        },
        getLanguages: () => {
            return;
        },
        handleIsNotSuccessful: () => { },
        handleError: () => { },
        handleNetworkError: () => { },
        isDebug: false
    };
    return <Den.FewBox.Boot options={options} />;
}

export default Boot;