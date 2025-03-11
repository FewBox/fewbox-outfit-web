import { Den } from '@fewbox/den-web';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
    params
}: Readonly<{
    params: Promise<{ locale: string }>
}>) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'PurchasePage' });
    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords')
    };
}

const ShowcasePage = () => {
    const t = useTranslations('PurchasePage');
    return <Den.Components.Y margin='3em 0 0 0' gap='1em' cross={Den.Components.YCrossType.Center}>
        <Den.Components.VLabel weight={Den.Components.FontWeightType.Light} size={Den.Components.SizeType.ExtraLarge} caption={t('purchase')} />
        <Den.Components.VHyperlink category={Den.Components.HyperlinkCategory.NewWindow} to={`mailto:xl@fewbox.com?subject=${t('subject')}`}>

        </Den.Components.VHyperlink>
    </Den.Components.Y>;
}

export default ShowcasePage;