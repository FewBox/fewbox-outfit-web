'use client';
import { Den } from "@fewbox/den-web";
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Outfit from "./components/Outfit";
import { FittingProgress, MirrorReflect, Store, Tryon, WebsocketStatus } from "./reducers/StateTypes";
import { connect } from "react-redux";
import { changeModelImage, completeFitting, hideMirror, initClient, reconnectWebsocket, showFittingProcess, showMirror, showMirrorHistory, showSignin, startFitting, tryon } from "./actions";
import { useEffect } from "react";
import Mirror from "./components/Mirror";

/*export async function generateMetadata({
  params
}: Readonly<{
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords')
  };
}*/

export interface IHomePage {
  modelImageUrl: string;
  isFitting: boolean;
  mirrorReflect: MirrorReflect;
  fittingProgress: FittingProgress;
  websocketStatus: WebsocketStatus;
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
}

const HomePage = (props: IHomePage) => {
  const t = useTranslations('HomePage');
  const tm = useTranslations('MasterPage');
  useEffect(() => {
    props.initClient();
  }, []);
  return <Den.Components.VBoundary margin='2em 0 0 0'>
    {/* Mirror */}
    {!!props.mirrorReflect && <Den.Components.Position zIndex={props.mirrorReflect ? 99999999 : -1} category={Den.Components.PositionCategory.Window} type={Den.Components.PositionType.Center}>
      <Den.Components.VAnimation category={Den.Components.AnimationCategory.FadeInUp}>
        <Mirror mirrorReflect={props.mirrorReflect} hide={props.hideMirror} />
      </Den.Components.VAnimation>
    </Den.Components.Position>}
    {/* PC */}
    <Den.Components.Display category={Den.Components.DisplayCategory.Hidden} type={Den.Components.DisplayType.Down} breakpoint={Den.Components.BreakpointType.Small}>
      <Den.Components.Y cross={Den.Components.YCrossType.Center} gap='1em'>
        <Den.Components.VLabel weight={Den.Components.FontWeightType.Light} size={Den.Components.SizeType.ExtraLarge} caption={tm('slogan')} />
        <Den.Components.Y>
          <Outfit websocketStatus={props.websocketStatus} fittingProgress={props.fittingProgress} isFitting={props.isFitting} modelImageUrl={props.modelImageUrl} reconnectWebsocket={props.reconnectWebsocket} changeModelImage={props.changeModelImage} tryon={props.tryon} startFitting={props.startFitting} completeFitting={props.completeFitting} showSignin={props.showSignin} showMirror={props.showMirror} showMirrorHistory={props.showMirrorHistory} showFittingProcess={props.showFittingProcess} />
        </Den.Components.Y>
      </Den.Components.Y>
    </Den.Components.Display>
    {/* Mobile */}
    <Den.Components.Display category={Den.Components.DisplayCategory.Hidden} type={Den.Components.DisplayType.Up} breakpoint={Den.Components.BreakpointType.Small}>
      <Den.Components.Y gap='1.2em' cross={Den.Components.YCrossType.Center}>
      </Den.Components.Y>
    </Den.Components.Display>
  </Den.Components.VBoundary>;
}

const mapStateToProps = ({ home }: Store) => ({
  modelImageUrl: home.modelImageUrl,
  isFitting: home.isFitting,
  mirrorReflect: home.mirrorReflect,
  fittingProgress: home.fittingProgress,
  websocketStatus: home.websocketStatus
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
  showSignin
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);