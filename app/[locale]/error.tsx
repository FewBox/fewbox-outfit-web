'use client';
import { Den } from '@fewbox/den-web';
import { useTranslations } from 'next-intl';

export default function Error({ error, reset }) {
  const t = useTranslations('Error');
  console.error(error);
  return <Den.Components.Y cross={Den.Components.YCrossType.Center}>
    <Den.Components.VLabel category={Den.Components.LabelCategory.H1} caption={t('title')} />
    <Den.Components.VLabel cursor='pointer' onClick={reset} caption={t('retry')} backgroundColor={Den.Components.ColorType.Primary} frontColor={Den.Components.ColorType.White} padding='0.6em 1em' borderRadius='0.6em' />
  </Den.Components.Y>;
}