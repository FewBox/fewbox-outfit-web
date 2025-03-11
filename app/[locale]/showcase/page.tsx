import { getTranslations } from 'next-intl/server';
import ClientShowcasePage from "../components/ClientShowcasePage";

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

const ShowcasePage = () => {
    return <ClientShowcasePage totalShowcase={3} />;
}

export default ShowcasePage;