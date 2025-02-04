import { Den } from "@fewbox/den-web";
import { useTranslations } from "next-intl";
import FourSvg from '@/assets/svgs/4.svg';
import ZeroSvg from '@/assets/svgs/0.svg';

export default function NotFound() {
    const t = useTranslations('NotFoundPage');
    return <Den.Components.Y padding='12em 0 0 0' gap='1em' cross={Den.Components.YCrossType.Center}>
        <Den.Components.XCenter size={Den.Components.SizeType.ExtraLarge} gap='0.2em'>
            <Den.Components.VSvg><FourSvg /></Den.Components.VSvg>
            <Den.Components.VSvg><ZeroSvg /></Den.Components.VSvg>
            <Den.Components.VSvg><FourSvg /></Den.Components.VSvg>
        </Den.Components.XCenter>
        <Den.Components.VLabel frontColor={Den.Components.ColorType.Dark} size={Den.Components.SizeType.Large} weight={Den.Components.FontWeightType.Thin} caption={t('description')} />
    </Den.Components.Y>;
}