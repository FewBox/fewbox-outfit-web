"use client";
import { Den } from "@fewbox/den-web";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import DownloadSvg from '@/assets/svgs/download.svg';
import CloseSvg from '@/assets/svgs/close.svg';
import { MirrorReflect } from "../../reducers/StateTypes";

export interface IMirrorProps {
    mirrorReflect?: MirrorReflect;
    hide: () => void;
}
export interface IMirrorStates { }

const height = 800;
const width = 495;

const Mirror = (props: IMirrorProps): JSX.Element => {
    const downloadImage = () => {
        const link = document.createElement("a");
        link.download = "bingo.png";
        link.href = props.mirrorReflect.imageUrl;
        link.target = '_blank';
        link.click();
    };
    const t = useTranslations('HomePage');
    const [state, setState] = useState<IMirrorStates>({});
    useEffect(() => {
    }, []);
    return <Den.Components.Y gap='1em'>
        <Den.Components.VFrame borderRadius='4em' image='/images/mirror.png' backingBoard={{ degree: '30deg', startColor: '#c7fddb', endColor: '#ffcb49' }}>
            <Den.Components.YBetween cross={Den.Components.YCrossType.Center} borderRadius='4em' style={{ boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.2)' }} width={`${width}px`} height={`${height}px`}>
                <Den.Components.Y width='100%'>
                    <Den.Components.XRight padding='2em 2em 0 2em'>
                        <Den.Components.VSvg padding='0.3em' frontColor={Den.Components.ColorType.Dark25} size={Den.Components.SizeType.Small} onClick={props.hide}><CloseSvg /></Den.Components.VSvg>
                    </Den.Components.XRight>
                    <Den.Components.XCenter>
                        <Den.Components.VLabel letterSpacing='3px' size={Den.Components.SizeType.Large} weight={Den.Components.FontWeightType.Light} frontColor={Den.Components.ColorType.Error75} caption={t(props.mirrorReflect ? props.mirrorReflect.captionId : 'exception')} />
                    </Den.Components.XCenter>
                </Den.Components.Y>
                <Den.Components.VBoundary margin='1em'>
                    <Den.Components.VImage alt='effect' src={(props.mirrorReflect && props.mirrorReflect.imageUrl) ? `${props.mirrorReflect.imageUrl}&timestamp=${Date.now()}` : '/images/effect.png'}
                        sizes={'100vw'}
                        style={{
                            width: `${width - 40}px`,
                            height: '100%',
                        }} width={2048} height={2048} />
                </Den.Components.VBoundary>
                {!!(props.mirrorReflect && props.mirrorReflect.imageUrl) && <Den.Components.XCenter padding='0 2em 2em 2em'>
                    <Den.Components.VSvg padding='0.3em' category={Den.Components.SvgCategory.Circle} frontColor={Den.Components.ColorType.White} backgroundColor={Den.Components.ColorType.Black} onClick={downloadImage}><DownloadSvg /></Den.Components.VSvg>
                </Den.Components.XCenter>}
            </Den.Components.YBetween>
        </Den.Components.VFrame>
    </Den.Components.Y>;
};

export default Mirror;