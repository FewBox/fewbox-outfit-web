"use client";
import { Den } from "@fewbox/den-web";
import { useState } from "react";
import { useTranslations } from "next-intl";
import TryOnSvg from '@/assets/svgs/tryon.svg';
import CloseSvg from '@/assets/svgs/close.svg';
import HistorySvg from '@/assets/svgs/histroy.svg';
import LowQualitySvg from '@/assets/svgs/low-quality.svg';
import HighQualitySvg from '@/assets/svgs/high-quality.svg';
import ChromeSvg from '@/assets/svgs/chrome.svg';
import Garment1Svg from '@/assets/svgs/garment-1.svg';
import Garment2Svg from '@/assets/svgs/garment-2.svg';
import Garment3Svg from '@/assets/svgs/garment-3.svg';
import { Garment } from "@/assets/images/garment";
import ProgressBar from "../ProgressBar";
import { FittingProgress, WebsocketStatus } from "../../reducers/StateTypes";
import Websocket from "../Websocket";

export interface IGarmentImageChooserProps {
    close: () => void;
    showMirrorHistory: () => void;
    reconnectWebsocket: () => void;
    isFitting: boolean;
    fittingProgress: FittingProgress;
    websocketStatus: WebsocketStatus;
}
export interface IGarmentImageChooserStates {
    imageUrl: string;
    emptyMessage: string;
    quality: QualityType;
}

const truncateFilename = (filename, front, back) => {
    if (filename.length <= front + back) {
        return filename;
    }
    return `${filename.substring(0, front)}...${filename.substring(filename.length - back)}`;
}

export enum QualityType {
    High = 'high',
    Low = 'low'
}

const HighScale = 1;
const LowScale = 0.6;
const GarmentImageChooser = (props: IGarmentImageChooserProps): JSX.Element => {
    const t = useTranslations('HomePage');
    const [state, setState] = useState<IGarmentImageChooserStates>({ imageUrl: '', emptyMessage: '', quality: QualityType.Low });
    const getChormeExtension = (captionId: string) => {
        return <Den.Components.VHyperlink category={Den.Components.HyperlinkCategory.NewWindow} to={`mailto:xl@fewbox.com?subject=${t('subject')}`}>
            <Den.Components.Y borderRadius='0.6em' backgroundColor={Den.Components.ColorType.Primary} padding='1em' gap='0.6em' cross={Den.Components.YCrossType.Center}>
                <Den.Components.X gap='1em'>
                    <Den.Components.VSvg size={Den.Components.SizeType.ExtraLarge}><Garment1Svg /></Den.Components.VSvg>
                    <Den.Components.VSvg size={Den.Components.SizeType.ExtraLarge}><Garment2Svg /></Den.Components.VSvg>
                    <Den.Components.VSvg size={Den.Components.SizeType.ExtraLarge}><Garment3Svg /></Den.Components.VSvg>
                </Den.Components.X>
                <Den.Components.X gap='0.2em'>
                    <Den.Components.VSvg borderRadius='6em' backgroundColor={Den.Components.ColorType.White}><ChromeSvg /></Den.Components.VSvg>
                    <Den.Components.VText letterSpacing='0.6px' alignType={Den.Components.TextAlignType.Center} size={Den.Components.SizeType.Small} width='16em' frontColor={Den.Components.ColorType.White} content={t(captionId)} />
                </Den.Components.X>
            </Den.Components.Y>
        </Den.Components.VHyperlink>
    };
    return <Den.Components.Y gap='1em'>
        <Den.Components.VHidden name='scale' valueHook={(state.quality == QualityType.High ? HighScale : LowScale).toString()} />
        <Den.Components.XCenter gap='1em'>
            <Den.Components.X onClick={() => { setState({ ...state, quality: QualityType.Low }); }}>
                <Den.Components.VSvg frontColor={state.quality == QualityType.Low ? Den.Components.ColorType.Black : Den.Components.ColorType.Placeholder}><LowQualitySvg /></Den.Components.VSvg>
                <Den.Components.VLabel frontColor={state.quality == QualityType.Low ? Den.Components.ColorType.Black : Den.Components.ColorType.Placeholder} caption={t('low')} />
            </Den.Components.X>
            <Den.Components.X onClick={() => { setState({ ...state, quality: QualityType.High }); }}>
                <Den.Components.VSvg frontColor={state.quality == QualityType.High ? Den.Components.ColorType.Black : Den.Components.ColorType.Placeholder}><HighQualitySvg /></Den.Components.VSvg>
                <Den.Components.VLabel frontColor={state.quality == QualityType.High ? Den.Components.ColorType.Black : Den.Components.ColorType.Placeholder} caption={t('high')} />
            </Den.Components.X>
        </Den.Components.XCenter>
        <Den.Components.X gap='0.2em'>
            <Den.Components.Y gap='0.6em'>
                <Den.Components.VFile name='garment_file' width='16em' loadingSize={Den.Components.SizeType.Large} loadingColor={Den.Components.ColorType.Success} caption={<Den.Components.VLabel category={Den.Components.LabelCategory.Div} size={Den.Components.SizeType.Small}
                    alignType={Den.Components.LabelAlignType.Center} caption={t('upload-garment')} />}
                    autoUpload={(file: File, complete) => {
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                const base64String = e.target.result as string;
                                setState({ ...state, imageUrl: base64String, emptyMessage: truncateFilename(file.name, 6, 6) });
                                complete();
                            };
                            reader.readAsDataURL(file);
                        }
                    }}
                    padding='1em' category={Den.Components.FileCategory.Vertical} borderRadius='0.6em' borderColor={Den.Components.ColorType.Dark} borderStyle='dashed' borderWidth='1px'
                    fileIcon={<Den.Components.VImage width={256} height={256} src={state.imageUrl.startsWith('data:image') ? state.imageUrl : Garment}
                        style={{
                            width: '16em',
                            height: 'auto',
                        }} alt='garment' />} emptyMessage={state.emptyMessage} />
                <Den.Components.XAutoBoth gap='1em'>
                    <Den.Components.VLine category={Den.Components.LineCategory.Horizontal} backgroundColor={Den.Components.ColorType.Placeholder} height='1px' />
                    <Den.Components.VLabel frontColor={Den.Components.ColorType.Placeholder} caption={t('or')} />
                    <Den.Components.VLine category={Den.Components.LineCategory.Horizontal} backgroundColor={Den.Components.ColorType.Placeholder} height='1px' />
                </Den.Components.XAutoBoth>
                <Den.Components.VChromeExtensionValidator extensionId="ahkkbbilbdihiipinbehfoglkgmdlglp" version="0.3" uninstalledCaption={t('download')} outdatedCaption={'update'} downloadUrl={`mailto:xl@fewbox.com?subject=${t('subject')}`}
                    overWrite={(status) => {
                        if (status === Den.Components.ExtensionStatus.Ready) {
                            return <Den.Components.VBoundary id='fewbox-outfit-chrome-extension'></Den.Components.VBoundary>;
                        }
                        else if (status === Den.Components.ExtensionStatus.Uninstalled) {
                            return getChormeExtension('download');
                        }
                        else {
                            return getChormeExtension('upgrade');
                        }
                    }} />
            </Den.Components.Y>
            {/*<Den.Components.VTextBox name='garment_url' width='16em' onChange={(e) => { setState({ ...state, imageUrl: e.currentTarget.value }); }} />*/}
            <Den.Components.Y gap='2em'>
                <Den.Components.VSvg frontColor={Den.Components.ColorType.Primary} size={Den.Components.SizeType.Small} onClick={() => { props.showMirrorHistory(); }}><HistorySvg /></Den.Components.VSvg>
                {!!props.isFitting && <Den.Components.VBoundary cursor='not-allowed'><Den.Components.VSvg frontColor={Den.Components.ColorType.Dark25} size={Den.Components.SizeType.Small}><TryOnSvg /></Den.Components.VSvg></Den.Components.VBoundary>}
                {/*<Den.Components.VSubmit caption={<Den.Components.VSvg frontColor={Den.Components.ColorType.Primary} size={Den.Components.SizeType.Small}><TryOnSvg /></Den.Components.VSvg>} />*/}
                {!props.isFitting && ((props.websocketStatus == WebsocketStatus.Close || props.websocketStatus == WebsocketStatus.Stop) ? <Websocket status={props.websocketStatus} reconnectWebsocket={props.reconnectWebsocket} /> : <Den.Components.VSubmit caption={<Den.Components.VSvg frontColor={Den.Components.ColorType.Primary} size={Den.Components.SizeType.Small}><TryOnSvg /></Den.Components.VSvg>} />)}
                {/*!!props.isFitting && <Den.Components.VSvg size={Den.Components.SizeType.Small} frontColor={Den.Components.ColorType.Primary} onClick={() => { props.close(); }}><CancelSvg /></Den.Components.VSvg>*/}
                <Den.Components.VSvg size={Den.Components.SizeType.Small} frontColor={Den.Components.ColorType.Primary} onClick={() => { props.close(); }}><CloseSvg /></Den.Components.VSvg>
            </Den.Components.Y>
        </Den.Components.X>
        <ProgressBar totalStep={props.fittingProgress.totalStep} currentStep={props.fittingProgress.currentStep} />
    </Den.Components.Y>
};

export default GarmentImageChooser;