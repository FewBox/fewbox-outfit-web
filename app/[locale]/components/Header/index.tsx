
import { Den } from '@fewbox/den-web';
import LogoSvg from '@/assets/svgs/logo.svg';
import { Link } from '@/i18n/routing';
import Language from '../Language';
//import Signin from '../Signin';
import Menu from '../Menu';
import { useTranslations } from 'next-intl';

export interface IHeaderProps {
    locale: string;
}

export default function Header(props: IHeaderProps) {
    const t = useTranslations('MasterPage');
    return <Den.Components.VHeader padding='2em'>
        {/* PC */}
        <Den.Components.Display category={Den.Components.DisplayCategory.Hidden} type={Den.Components.DisplayType.Down} breakpoint={Den.Components.BreakpointType.Small}>
            <Den.Components.XCenter>
                <Den.Components.XBetween width='80vw' maxWidth='800px'>
                    <Link href="/">
                        <Den.Components.X gap='0.6em'>
                            <Den.Components.VSvg size={Den.Components.SizeType.ExtraLarge} frontColor='logo'><LogoSvg /></Den.Components.VSvg>
                            <Den.Components.Display category={Den.Components.DisplayCategory.Hidden} type={Den.Components.DisplayType.Down} breakpoint={Den.Components.BreakpointType.Medium}>
                                <Den.Components.VLabel letterSpacing='1px' size={Den.Components.SizeType.Large} frontColor={Den.Components.ColorType.Dark} weight={Den.Components.FontWeightType.Light} caption={t('brand')} />
                            </Den.Components.Display>
                        </Den.Components.X>
                    </Link>
                    <Den.Components.X gap='1.6em'>
                        <Link href='/showcase'>
                            <Den.Components.VLabel weight={Den.Components.FontWeightType.Light} frontColor={Den.Components.ColorType.Black} caption={t('showcase')} />
                        </Link>
                        <Language locale={props.locale} pathname='/' />
                        {/*<Signin />*/}
                    </Den.Components.X>
                </Den.Components.XBetween>
            </Den.Components.XCenter>
        </Den.Components.Display>
        {/* Mobile */}
        <Den.Components.Display category={Den.Components.DisplayCategory.Hidden} type={Den.Components.DisplayType.Up} breakpoint={Den.Components.BreakpointType.Small}>
            <Den.Components.XBetween overflow='visible'>
                <Menu />
                <Language locale={props.locale} pathname='/' />
            </Den.Components.XBetween>
            <Den.Components.Y cross={Den.Components.YCrossType.Center} gap='0.6em'>
                <Link href='/'>
                    <Den.Components.VSvg category={Den.Components.SvgCategory.Circle} size={Den.Components.SizeType.Large} padding='0.4em' backgroundColor='logo' frontColor={Den.Components.ColorType.White}><LogoSvg /></Den.Components.VSvg>
                </Link>
                <Den.Components.VLabel caption={t('slogan')} />
            </Den.Components.Y>
        </Den.Components.Display>
    </Den.Components.VHeader>;
}