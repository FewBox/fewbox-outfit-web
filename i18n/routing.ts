import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export type Locale = 'en' | 'zh-cn';

const allLocales: Locale[] = ['en', 'zh-cn'];
const defaultLocale: Locale = 'en';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: allLocales,

    // Used when no locale matches
    defaultLocale: defaultLocale
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);