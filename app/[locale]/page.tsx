import { Den } from "@fewbox/den-web";
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
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
}

export default function Home() {
  const t = useTranslations('HomePage');
  return <Den.Components.VBoundary margin='6em 0 0 0'>
    {/* PC */}
    <Den.Components.Display category={Den.Components.DisplayCategory.Hidden} type={Den.Components.DisplayType.Down} breakpoint={Den.Components.BreakpointType.Small}>
      <Den.Components.Y cross={Den.Components.YCrossType.Center}>
        <Den.Components.VLabel size={Den.Components.SizeType.ExtraLarge} caption={t('slogan')} />
        <Den.Components.Y maxWidth='800px'>
          <Den.Components.XRight>
            <Den.Components.Y>
              <Den.Components.VSvg></Den.Components.VSvg>
            </Den.Components.Y>
          </Den.Components.XRight>
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
