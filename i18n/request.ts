import { getRequestConfig } from 'next-intl/server';
import { Locale, routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;
    // console.log('-=#locale#=-', locale, routing.defaultLocale);
    // Ensure that a valid locale is used
    if (!locale || !routing.locales.includes(locale as Locale)) {
        locale = routing.defaultLocale;
    }

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});