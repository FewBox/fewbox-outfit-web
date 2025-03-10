
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
            console.log(process.env.NODE_ENV);
            debugger;
            if (process.env.NODE_ENV === 'production') {
                return {
                    "endpoint": {
                        "PROTOCOL": "http",
                        "HOST": "ai-gateway.fewbox.com",
                        "PORT": 4000,
                        "BASEPATH": null
                    },
                    "wsEndpoint": {
                        PROTOCOL: 'ws',
                        HOST: 'ai-gateway.fewbox.com',
                        PORT: 4000,
                        BASEPATH: 'ws'
                    },
                    "assetEndpoint": {
                        "PROTOCOL": "http",
                        "HOST": "ai-gateway.fewbox.com",
                        "PORT": 4000,
                        "BASEPATH": 'images'
                    }
                };
            }
            else {
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
                    },
                    "assetEndpoint": {
                        "PROTOCOL": "http",
                        "HOST": "localhost",
                        "PORT": 4000,
                        "BASEPATH": 'images'
                    }
                };
            }
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