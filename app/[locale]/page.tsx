import { getTranslations } from 'next-intl/server';
import ClientHomePage from "./components/ClientHomePage";

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

export interface IHomePage {
}

const HomePage = (props: IHomePage) => {
  return <ClientHomePage />;
}

export default HomePage;