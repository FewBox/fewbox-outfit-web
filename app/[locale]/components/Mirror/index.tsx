"use client";
import { Den } from "@fewbox/den-web";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import DownloadSvg from '@/assets/svgs/download.svg';
import CancelSvg from '@/assets/svgs/cancel.svg';
import { MirrorReflect } from "../../reducers/StateTypes";

export interface IMirrorProps {
    mirrorReflect?: MirrorReflect;
    hide: () => void;
}
export interface IMirrorStates { }

const height = 800;
const width = 495;

const Mirror = (props: IMirrorProps): JSX.Element => {
    const t = useTranslations('HomePage');
    const [state, setState] = useState<IMirrorStates>({});
    useEffect(() => {
    }, []);
    return <Den.Components.VBoundary borderWidth='0.4em' borderRadius='4em' borderStyle='solid' borderColor={Den.Components.ColorType.White}>
        <Den.Components.VFrame borderRadius='4em' image='/images/mirror.png' backingBoard={{ degree: '30deg', startColor: '#c7fddb', endColor: '#ffcb49' }}>
            <Den.Components.YBetween cross={Den.Components.YCrossType.Center} borderRadius='4em' style={{ boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.2)' }} width={`${width}px`} height={`${height}px`}>
                <Den.Components.VBoundary width='100%'>
                    <Den.Components.XBetween padding='2em 2em 0 2em'>
                        <Den.Components.VSvg padding='0.3em' category={Den.Components.SvgCategory.Circle} frontColor={Den.Components.ColorType.White} backgroundColor={Den.Components.ColorType.Black} onClick={props.hide}><CancelSvg /></Den.Components.VSvg>
                        <Den.Components.VSvg padding='0.3em' category={Den.Components.SvgCategory.Circle} frontColor={Den.Components.ColorType.White} backgroundColor={Den.Components.ColorType.Black} onClick={() => { }}><DownloadSvg /></Den.Components.VSvg>
                    </Den.Components.XBetween>
                </Den.Components.VBoundary>
                <Den.Components.VBoundary>
                    <Den.Components.VLabel letterSpacing='3px' size={Den.Components.SizeType.Large} weight={Den.Components.FontWeightType.Light} frontColor={Den.Components.ColorType.Error75} caption={t(props.mirrorReflect ? props.mirrorReflect.captionId : 'exception')} />
                </Den.Components.VBoundary>
                <Den.Components.VBoundary>
                    <Den.Components.VImage alt='effect' src={(props.mirrorReflect && props.mirrorReflect.imageUrl) ? props.mirrorReflect.imageUrl : '/images/effect.png'}
                        sizes={'100vw'}
                        style={{
                            width: '100%',
                            height: '100%',
                        }} width={512} height={512} />
                </Den.Components.VBoundary>
            </Den.Components.YBetween>
        </Den.Components.VFrame>
    </Den.Components.VBoundary>;
};

export default Mirror;