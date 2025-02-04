
import { Den } from '@fewbox/den-web';
import FewBoxSvg from "@/assets/svgs/fewbox.svg";
import XSvg from '@/assets/svgs/x.svg';
import DiscordSvg from '@/assets/svgs/discord.svg';
import { useTranslations } from 'next-intl';

/*export interface IFooterProps {
}*/

export default function Footer(/*props: IFooterProps*/) {
    const t = useTranslations('MasterPage');
    return <Den.Components.VFooter>
        <Den.Components.XCenter padding='1em 0'>
            <Den.Components.Y cross={Den.Components.YCrossType.Center} gap='0.6em'>
                <Den.Components.X gap='0.6em'>
                    <Den.Components.VHyperlink category={Den.Components.HyperlinkCategory.NewWindow} to='https://x.com/fewbox'>
                        <Den.Components.VSvg size={Den.Components.SizeType.Small} frontColor={Den.Components.ColorType.Dark25}><XSvg /></Den.Components.VSvg>
                    </Den.Components.VHyperlink>
                    <Den.Components.VHyperlink category={Den.Components.HyperlinkCategory.NewWindow} to='https://discord.com/channels/966528814245097522/966528814698090568'>
                        <Den.Components.VSvg size={Den.Components.SizeType.Small} frontColor={Den.Components.ColorType.Dark25}><DiscordSvg /></Den.Components.VSvg>
                    </Den.Components.VHyperlink>
                </Den.Components.X>
                <Den.Components.X gap='0.2em'>
                    <Den.Components.VSvg size={Den.Components.SizeType.ExtraSmall} frontColor={Den.Components.ColorType.Dark25}><FewBoxSvg /></Den.Components.VSvg>
                    <Den.Components.VLabel size={Den.Components.SizeType.Small} frontColor={Den.Components.ColorType.Dark25} caption={t('copyright')} />
                </Den.Components.X>
            </Den.Components.Y>
        </Den.Components.XCenter>
    </Den.Components.VFooter>;
}