"use client";
import { Den } from "@fewbox/den-web";
import { useState } from "react";
import { useTranslations } from "next-intl";
import MaskImage from "../MaskImage";
import ChalkSvg from '@/assets/svgs/chalk.svg';
import EraserSvg from '@/assets/svgs/eraser.svg';
import WomenSvg from '@/assets/svgs/women.svg';
import MenSvg from '@/assets/svgs/men.svg';
import KidsSvg from '@/assets/svgs/kids.svg';
import './index.scss';

const enum MeasurementType {
    Chalk = 'chalk',
    Eraser = 'eraser'
}

export enum ModelType {
    Women,
    Men,
    Kids
}

export interface IOutfitProps {
    modelImageUrl: string;
    changeModelImage: (modelImageUrl: string) => void;
}

export interface IOutfitStates {
    zoom: number;
    measurementType: MeasurementType;
    modelType: ModelType;
}

const Outfit = (props: IOutfitProps): JSX.Element => {
    const t = useTranslations('HomePage');
    const [state, setState] = useState<IOutfitStates>({ zoom: 1, measurementType: MeasurementType.Chalk, modelType: ModelType.Women });
    const toolWidth = '12em';
    const toolHeight = '18em';
    return <Den.Components.X gap='0.6em'>
        <Den.Components.YTop width={toolWidth} height={toolHeight} gap='1em' cross={Den.Components.YCrossType.Center}>
            <Den.Components.VLabel size={Den.Components.SizeType.Normal} weight={Den.Components.FontWeightType.Thin} frontColor={Den.Components.ColorType.Black} caption={t('model')} />
            <Den.Components.VSvg onClick={() => { setState({...state, modelType: ModelType.Women}); props.changeModelImage('https://img.ltwebstatic.com/images3_pi/2025/01/03/7c/1735896447c6ae06db2def0b14704e23fba94b84b4.webp'); }} frontColor={state.modelType == ModelType.Women ? Den.Components.ColorType.Primary : Den.Components.ColorType.Placeholder}><WomenSvg /></Den.Components.VSvg>
            <Den.Components.VSvg onClick={() => { setState({...state, modelType: ModelType.Men}); props.changeModelImage('https://img.ltwebstatic.com/images3_pi/2024/03/20/0b/171092569796387212e2fe7c56b3d94ca52aad570f.webp'); }} frontColor={state.modelType == ModelType.Men ? Den.Components.ColorType.Primary : Den.Components.ColorType.Placeholder}><MenSvg /></Den.Components.VSvg>
            <Den.Components.VSvg onClick={() => { setState({...state, modelType: ModelType.Kids}); props.changeModelImage('https://img.ltwebstatic.com/images3_pi/2024/08/14/78/17236281132c880b2d4c74b3c762b052553af8e8db.webp'); }} frontColor={state.modelType == ModelType.Kids ? Den.Components.ColorType.Primary : Den.Components.ColorType.Placeholder}><KidsSvg /></Den.Components.VSvg>
        </Den.Components.YTop>
        <MaskImage imageUrl={props.modelImageUrl} zoom={state.zoom} isRevert={state.measurementType == MeasurementType.Eraser} />
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