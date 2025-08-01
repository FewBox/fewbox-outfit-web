
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
            if (process.env.NODE_ENV === 'production') {
                /*return {
                    "endpoint": {
                        PROTOCOL: "https",
                        HOST: "ai-gateway.fewbox.com",
                        BASEPATH: null
                    },
                    "wsEndpoint": {
                        PROTOCOL: 'wss',
                        HOST: 'ai-gateway.fewbox.com',
                        BASEPATH: 'ws'
                    },
                    "assetEndpoint": {
                        PROTOCOL: "https",
                        HOST: "ai-gateway.fewbox.com",
                        BASEPATH: 'images'
                    }
                };*/
                return {
                    "endpoint": {
                        PROTOCOL: "https",
                        HOST: "gateway.yingoukj.cn",
                        BASEPATH: null
                    },
                    "wsEndpoint": {
                        PROTOCOL: 'wss',
                        HOST: 'gateway.yingoukj.cn',
                        BASEPATH: 'ws'
                    },
                    "assetEndpoint": {
                        PROTOCOL: "https",
                        HOST: "gateway.yingoukj.cn",
                        BASEPATH: 'images'
                    }
                };
            }
            else {
                return {
                    "endpoint": {
                        PROTOCOL: "http",
                        HOST: "localhost",
                        PORT: 4000,
                        BASEPATH: null
                    },
                    "wsEndpoint": {
                        PROTOCOL: 'ws',
                        HOST: 'localhost',
                        PORT: 4000,
                        BASEPATH: 'ws'
                    },
                    "assetEndpoint": {
                        PROTOCOL: "http",
                        HOST: "localhost",
                        PORT: 4000,
                        BASEPATH: 'images'
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