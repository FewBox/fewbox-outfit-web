'use client';
import { Den } from "@fewbox/den-web";
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Outfit from "./components/Outfit";
import { Store } from "./reducers/StateTypes";
import { connect } from "react-redux";
import { changeModelImage } from "./actions";

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
  changeModelImage: (modelImageUrl: string) => void;
}

const HomePage = (props: IHomePage) => {
  const t = useTranslations('HomePage');
  const tm = useTranslations('MasterPage');

  return <Den.Components.VBoundary margin='3em 0 0 0'>
    {/* PC */}
    <Den.Components.Display category={Den.Components.DisplayCategory.Hidden} type={Den.Components.DisplayType.Down} breakpoint={Den.Components.BreakpointType.Small}>
      <Den.Components.Y cross={Den.Components.YCrossType.Center} gap='3em'>
        <Den.Components.VLabel weight={Den.Components.FontWeightType.Light} size={Den.Components.SizeType.ExtraLarge} caption={tm('slogan')} />
        <Den.Components.Y>
          <Outfit modelImageUrl={props.modelImageUrl} changeModelImage={props.changeModelImage} />
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
  modelImageUrl: home.modelImageUrl
});

const mapDispatchToProps = {
  changeModelImage
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);