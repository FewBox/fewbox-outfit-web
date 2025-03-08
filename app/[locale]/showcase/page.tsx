import { Den } from "@fewbox/den-web";
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import CompareImage from "../components/CompareImage";

export async function generateMetadata({
    params
}: Readonly<{
    params: Promise<{ locale: string }>
}>) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ShowcasePage' });
    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords')
    };
}

export default function Showcase() {
    const t = useTranslations('ShowcasePage');
    return <Den.Components.VBoundary margin='3em 0 0 0'>
        <Den.Components.Y cross={Den.Components.YCrossType.Center} gap='1em'>
            <Den.Components.VLabel weight={Den.Components.FontWeightType.Light} size={Den.Components.SizeType.ExtraLarge} caption={t('showcase')} />
            <CompareImage index={1} />
        </Den.Components.Y>
        {/* PC */}
        <Den.Components.Display category={Den.Components.DisplayCategory.Hidden} type={Den.Components.DisplayType.Down} breakpoint={Den.Components.BreakpointType.Small}>
        </Den.Components.Display>
        {/* Mobile */}
        <Den.Components.Display category={Den.Components.DisplayCategory.Hidden} type={Den.Components.DisplayType.Up} breakpoint={Den.Components.BreakpointType.Small}>
        </Den.Components.Display>
    </Den.Components.VBoundary>;
}