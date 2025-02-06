"use client";
import { Den } from "@fewbox/den-web";
import { useState } from "react";
import { useTranslations } from "next-intl";
import MaskImage from "../MaskImage";
import ChalkSvg from '@/assets/svgs/chalk.svg';
import EraserSvg from '@/assets/svgs/eraser.svg';
import './index.scss';

const enum MeasurementType {
    Chalk = 'chalk',
    Eraser = 'eraser'
}

export interface IOutfitProps { }
export interface IOutfitStates {
    zoom: number;
    measurementType: MeasurementType;
}

const Outfit = (props: IOutfitProps): JSX.Element => {
    const t = useTranslations('HomePage');
    const [state, setState] = useState<IOutfitStates>({ zoom: 1, measurementType: MeasurementType.Chalk });
    const toolWidth = '12em';
    const toolHeight = '18em';
    console.log('XX', state.zoom);
    return <Den.Components.X gap='0.6em'>
        <Den.Components.YTop width={toolWidth} height={toolHeight} gap='1em' cross={Den.Components.YCrossType.Center}>
            <Den.Components.VLabel size={Den.Components.SizeType.Normal} weight={Den.Components.FontWeightType.Thin} frontColor={Den.Components.ColorType.Black} caption={t('garment')} />
            <Den.Components.VSvg></Den.Components.VSvg>
        </Den.Components.YTop>
        <MaskImage imageUrl="https://img.ltwebstatic.com/images3_pi/2025/01/03/7c/1735896447c6ae06db2def0b14704e23fba94b84b4.webp" zoom={state.zoom} isRevert={state.measurementType == MeasurementType.Eraser} />
        <Den.Components.YTop width={toolWidth} height={toolHeight} gap='1em' cross={Den.Components.YCrossType.Center}>
            <Den.Components.VLabel size={Den.Components.SizeType.Normal} weight={Den.Components.FontWeightType.Thin} frontColor={Den.Components.ColorType.Black} caption={t('measurement')} />
            <Den.Components.Y cross={Den.Components.YCrossType.Center}>
                <Den.Components.X gap='1em'>
                    <Den.Components.VSvg frontColor={state.measurementType == MeasurementType.Chalk ? Den.Components.ColorType.Primary : Den.Components.ColorType.Placeholder} onClick={() => { setState({ ...state, measurementType: MeasurementType.Chalk }); }}><ChalkSvg /></Den.Components.VSvg>
                    <Den.Components.VSvg frontColor={state.measurementType == MeasurementType.Eraser ? Den.Components.ColorType.Primary : Den.Components.ColorType.Placeholder} onClick={() => { setState({ ...state, measurementType: MeasurementType.Eraser }); }}><EraserSvg /></Den.Components.VSvg>
                </Den.Components.X>
                <Den.Components.VRange className='tape' isValueShow backgroundColor={Den.Components.ColorType.Transparent} min={1} max={4} onChange={(e) => { setState({ ...state, zoom: e.target.value }) }} value={1}
                    controlBackgroundColor={Den.Components.ColorType.Placeholder} controlBorderColor={Den.Components.ColorType.Black} valueSize={Den.Components.SizeType.Small} />
            </Den.Components.Y>
        </Den.Components.YTop>
    </Den.Components.X>;
};

export default Outfit;