import { Den } from '@fewbox/den-web';
import { WebsocketStatus } from '../../reducers/StateTypes';
import OfflineLeftSvg from '@/assets/svgs/offline-left.svg';
import OfflineRightSvg from '@/assets/svgs/offline-right.svg';
import ReconnectSvg from '@/assets/svgs/reconnect.svg';


export interface IWebsocketProps {
    status: WebsocketStatus;
    reconnectWebsocket: () => void;
}

const Websocket = (props: IWebsocketProps) => {
    return <Den.Components.Y padding='0.2em'>
        {!!(props.status == WebsocketStatus.Close) && <Den.Components.XCenter gap='1em'>
            <Den.Components.VSvg size={Den.Components.SizeType.ExtraSmall} frontColor={Den.Components.ColorType.Error}><OfflineLeftSvg /></Den.Components.VSvg>
            <Den.Components.VAnimation category={Den.Components.AnimationCategory.ShakeX} repeat={Den.Components.AnimationRepeat.Infinite} speed={Den.Components.AnimationSpeed.Slower}>
                <Den.Components.VSvg size={Den.Components.SizeType.ExtraSmall} frontColor={Den.Components.ColorType.Error}><OfflineRightSvg /></Den.Components.VSvg>
            </Den.Components.VAnimation>
        </Den.Components.XCenter>}
        {!!(props.status == WebsocketStatus.Stop) && <Den.Components.VSvg size={Den.Components.SizeType.Small} frontColor={Den.Components.ColorType.Error} onClick={props.reconnectWebsocket}><ReconnectSvg /></Den.Components.VSvg>}
    </Den.Components.Y>;
}

export default Websocket;