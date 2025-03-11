'use client';
import { Den } from "@fewbox/den-web";
import { useTranslations } from 'next-intl';
import Outfit from "../Outfit";
import { FittingProgress, HelpStatus, MirrorReflect, Store, Tryon, WebsocketStatus } from "../../reducers/StateTypes";
import { connect } from "react-redux";
import { changeModelImage, completeFitting, hideHelp, hideMirror, initClient, reconnectWebsocket, showFittingProcess, showMirror, showMirrorHistory, showSignin, startFitting, tryon } from "../../actions";
import { useEffect } from "react";
import Mirror from "../Mirror";
import Help, { HelpCategory } from "../Help";
import WomenSvg from '@/assets/svgs/women.svg';
import MenSvg from '@/assets/svgs/men.svg';
import KidsSvg from '@/assets/svgs/kids.svg';
import SelfSvg from '@/assets/svgs/self.svg';
import ChalkSvg from '@/assets/svgs/chalk.svg';
import TryOnSvg from '@/assets/svgs/tryon.svg';

export interface IClientHomePage {
    modelImageUrl: string;
    isFitting: boolean;
    mirrorReflect: MirrorReflect;
    fittingProgress: FittingProgress;
    websocketStatus: WebsocketStatus;
    helpStatus: HelpStatus;
    initClient: () => void;
    reconnectWebsocket: () => void;
    changeModelImage: (modelImageUrl: string) => void;
    tryon: (tryon: Tryon) => void;
    startFitting: () => void;
    completeFitting: () => void;
    showFittingProcess: (fittingProcess: FittingProgress) => void;
    showMirror: (mirrorReflect: MirrorReflect) => void;
    showMirrorHistory: () => void;
    hideMirror: () => void;
    showSignin: () => void;
    hideHelp: () => void;
}

const ClientHomePage = (props: IClientHomePage) => {
    const t = useTranslations('HomePage');
    const tm = useTranslations('MasterPage');
    useEffect(() => {
        props.initClient();
    }, []);
    const steps = [
        {
            optionCaption: t('help-step1-option'),
            optionIcons: [<WomenSvg key='help-step1-option1' />, <MenSvg key='help-step1-option2' />, <KidsSvg key='help-step1-option3' />, <SelfSvg key='help-step1-option4' />],
            targetCaption: t('help-step1-target')
        },
        {
            optionCaption: t('help-step2-option'),
            optionIcons: [<ChalkSvg key='help-step2-option1' />],
            targetCaption: t('help-step2-target')
        },
        {
            optionCaption: t('help-step3-option'),
            optionIcons: [<TryOnSvg key='help-step3-option1' />],
            targetCaption: t('help-step3-target')
        }
    ];
    return <Den.Components.Y>
        {/* Mirror */}
        {!!props.mirrorReflect && <Den.Components.Position zIndex={props.mirrorReflect ? 99999999 : -1} category={Den.Components.PositionCategory.Window} type={Den.Components.PositionType.Center}>
            <Den.Components.VAnimation category={Den.Components.AnimationCategory.FadeInUp}>
                <Mirror mirrorReflect={props.mirrorReflect} hide={props.hideMirror} />
            </Den.Components.VAnimation>
        </Den.Components.Position>}
        {/* PC */}
        <Den.Components.Display category={Den.Components.DisplayCategory.Hidden} type={Den.Components.DisplayType.Down} breakpoint={Den.Components.BreakpointType.Small}>
            <Den.Components.Y cross={Den.Components.YCrossType.Center} gap='1em'>
                {/* Help */}
                {!!(props.helpStatus == HelpStatus.Visible) && <Help steps={steps} hide={props.hideHelp} />}
                <Den.Components.VLabel weight={Den.Components.FontWeightType.Light} size={Den.Components.SizeType.ExtraLarge} caption={tm('slogan')} />
                <Den.Components.Y>
                    <Outfit websocketStatus={props.websocketStatus} fittingProgress={props.fittingProgress} isFitting={props.isFitting} modelImageUrl={props.modelImageUrl} reconnectWebsocket={props.reconnectWebsocket} changeModelImage={props.changeModelImage} tryon={props.tryon} startFitting={props.startFitting} completeFitting={props.completeFitting} showSignin={props.showSignin} showMirror={props.showMirror} showMirrorHistory={props.showMirrorHistory} showFittingProcess={props.showFittingProcess} />
                </Den.Components.Y>
            </Den.Components.Y>
        </Den.Components.Display>
        {/* Mobile */}
        <Den.Components.Display category={Den.Components.DisplayCategory.Hidden} type={Den.Components.DisplayType.Up} breakpoint={Den.Components.BreakpointType.Small}>
            <Den.Components.Y gap='2em'>
                {!!(props.helpStatus == HelpStatus.Visible) && <Help category={HelpCategory.Vertical} steps={steps} hide={props.hideHelp} />}
                <Outfit scaleHeight={600} websocketStatus={props.websocketStatus} fittingProgress={props.fittingProgress} isFitting={props.isFitting} modelImageUrl={props.modelImageUrl} reconnectWebsocket={props.reconnectWebsocket} changeModelImage={props.changeModelImage} tryon={props.tryon} startFitting={props.startFitting} completeFitting={props.completeFitting} showSignin={props.showSignin} showMirror={props.showMirror} showMirrorHistory={props.showMirrorHistory} showFittingProcess={props.showFittingProcess} />
            </Den.Components.Y>
        </Den.Components.Display>
    </Den.Components.Y>;
}

const mapStateToProps = ({ home }: Store) => ({
    modelImageUrl: home.modelImageUrl,
    isFitting: home.isFitting,
    mirrorReflect: home.mirrorReflect,
    fittingProgress: home.fittingProgress,
    websocketStatus: home.websocketStatus,
    helpStatus: home.helpStatus
});

const mapDispatchToProps = {
    initClient,
    reconnectWebsocket,
    changeModelImage,
    tryon,
    startFitting,
    completeFitting,
    showFittingProcess,
    showMirror,
    showMirrorHistory,
    hideMirror,
    showSignin,
    hideHelp
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientHomePage);