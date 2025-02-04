import { Den } from "@fewbox/den-web";
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
    params
}: Readonly<{
    params: Promise<{ locale: string }>
}>) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'DemoPage' });
    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords')
    };
}

export default function Demo() {
    const t = useTranslations('DemoPage');
    return <Den.Components.VBoundary margin='3em 0 0 0'>
        {/* PC */}
        <Den.Components.Display category={Den.Components.DisplayCategory.Hidden} type={Den.Components.DisplayType.Down} breakpoint={Den.Components.BreakpointType.Small}>
            <Den.Components.Y cross={Den.Components.YCrossType.Center}>
                <Den.Components.VLabel weight={Den.Components.FontWeightType.Light} size={Den.Components.SizeType.ExtraLarge} caption={t('showcase')} />
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
        </Den.Components.Display>
    </Den.Components.VBoundary>;
}