//import { Roboto } from 'next/font/google';
import localFont from "next/font/local";
import "../../style/_root.scss";
import "@fewbox/den-web/index.css";
import './layout.scss';
import { GoogleAnalytics } from '@next/third-parties/google'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Main from './components/Main';
import Footer from './components/Footer';
import Header from './components/Header';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import StoreProvider from "./components/StoreProvider";
import Boot from "./components/Boot";

/*const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})*/

const outfit = localFont({
  src: [
    {
      path: "../../fonts/Outfit-Thin.woff",
      weight: "100",
    },
    {
      path: "../../fonts/Outfit-ExtraLight.woff",
      weight: "200",
    },
    {
      path: "../../fonts/Outfit-Light.woff",
      weight: "300",
    },
    {
      path: "../../fonts/Outfit-Regular.woff",
      weight: "400",
    },
    {
      path: "../../fonts/Outfit-Medium.woff",
      weight: "500",
    },
    {
      path: "../../fonts/Outfit-SemiBold.woff",
      weight: "600",
    },
    {
      path: "../../fonts/Outfit-Bold.woff",
      weight: "700",
    },
    {
      path: "../../fonts/Outfit-ExtraBold.woff",
      weight: "800",
    },
    {
      path: "../../fonts/Outfit-Black.woff",
      weight: "900",
    }
  ],
  variable: "--font-outfit-thin",
});

/*const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const zcool = localFont({
  src: "./fonts/ZCOOLXiaoWei.woff",
  variable: "--font-zcool-xiaowei",
})*/
/* `${roboto.className} ${geistSans.className} ${geistMono.className} ${zcool.className}` */

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>
}>) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    return notFound();
  }
  return (
    <html lang={locale}>
      <head>
        <title>FewBox</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </head>
      <body className={outfit.className}>
        <Boot />
        <NextIntlClientProvider messages={messages}>
          <GoogleAnalytics gaId="G-FF2PJ9650T" />
          <StoreProvider>
            <Header locale={locale} />
            <Main>
              {children}
            </Main>
            <Footer />
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
