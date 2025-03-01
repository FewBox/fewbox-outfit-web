'use client';
import { Den } from "@fewbox/den-web";
import { Den as DenAppend } from "@fewbox/den-web-append";
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Outfit from "./components/Outfit";
import { MirrorReflect, Store, Tryon } from "./reducers/StateTypes";
import { connect } from "react-redux";
import { changeModelImage, completeFitting, hideMirror, initClient, startFitting, tryon } from "./actions";
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
  initClient: () => void;
  changeModelImage: (modelImageUrl: string) => void;
  tryon: (tryon: Tryon) => void;
  startFitting: () => void;
  completeFitting: () => void;
  hideMirror: () => void;
}

const HomePage = (props: IHomePage) => {
  const t = useTranslations('HomePage');
  const tm = useTranslations('MasterPage');
  const options: DenAppend.FewBox.IFewBoxOptions = {
    getToken: () => {
      return null;
    },
    getAppSettings: () => {
      return {
        "endpoint": {
          "PROTOCOL": "http",
          "HOST": "localhost",
          "PORT": 4000,
          "BASEPATH": null
        },
        wsEndpoint: {
          PROTOCOL: 'ws',
          HOST: 'localhost',
          PORT: 4000,
          BASEPATH: 'ws'
        }
      };
    },
    getLanguages: () => {
      return;
    },
    handleIsNotSuccessful: () => { },
    handleError: () => { },
    handleNetworkError: () => { },
    isDebug: false
  };
  useEffect(() => {
    props.initClient();
  }, []);

  return <Den.Components.VBoundary margin='3em 0 0 0'>
    <DenAppend.FewBox.Boot options={options} />
    {/* Mirror */}
    {!!props.mirrorReflect && <Den.Components.Position zIndex={9999999999} category={Den.Components.PositionCategory.Window} type={Den.Components.PositionType.Center}>
      <Den.Components.VAnimation category={Den.Components.AnimationCategory.FadeInUp}>
        <Mirror mirrorReflect={props.mirrorReflect} hide={props.hideMirror} />
      </Den.Components.VAnimation>
    </Den.Components.Position>}
    {/* PC */}
    <Den.Components.Display category={Den.Components.DisplayCategory.Hidden} type={Den.Components.DisplayType.Down} breakpoint={Den.Components.BreakpointType.Small}>
      <Den.Components.Y cross={Den.Components.YCrossType.Center} gap='3em'>
        <Den.Components.VLabel weight={Den.Components.FontWeightType.Light} size={Den.Components.SizeType.ExtraLarge} caption={tm('slogan')} />
        <Den.Components.Y>
          <Outfit isFitting={props.isFitting} modelImageUrl={props.modelImageUrl} changeModelImage={props.changeModelImage} tryon={props.tryon} startFitting={props.startFitting} completeFitting={props.completeFitting} />
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
  mirrorReflect: home.mirrorReflect
});

const mapDispatchToProps = {
  initClient,
  changeModelImage,
  tryon,
  startFitting,
  completeFitting,
  hideMirror
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);