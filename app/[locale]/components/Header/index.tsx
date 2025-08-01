
'use client';
import { Den } from '@fewbox/den-web';
import LogoSvg from '@/assets/svgs/logo.svg';
import HelpSvg from '@/assets/svgs/help.svg';
import { Link } from '@/i18n/routing';
import Language from '../Language';
import Menu from '../Menu';
import { useTranslations } from 'next-intl';
import Signin from '../Signin';
import { SigninCredential, Store } from '../../reducers/StateTypes';
import { connect } from 'react-redux';
import { hideSignin, showHelp, showSignin, signin } from '../../actions';

export interface IHeaderProps {
    locale: string;
    isUnauthorized: boolean;
    isPasswordValid: boolean;
    showSignin: () => void;
    hideSignin: () => void;
    signin: (signinCredential: SigninCredential) => void;
    showHelp: () => void;
}

const Header = (props: IHeaderProps) => {
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
                    <Den.Components.X gap='1em'>
                        <Link href='/showcase'>
                            <Den.Components.VLabel weight={Den.Components.FontWeightType.Light} frontColor={Den.Components.ColorType.Black} caption={t('showcase')} />
                        </Link>
                        <Link href='/purchase'>
                            <Den.Components.VLabel weight={Den.Components.FontWeightType.Light} frontColor={Den.Components.ColorType.Black} caption={t('purchase')} />
                        </Link>
                        <Language locale={props.locale} pathname='/' />
                        <Den.Components.VSvg onClick={props.showHelp}><HelpSvg /></Den.Components.VSvg>
                        <Signin isUnauthorized={props.isUnauthorized} isPasswordValid={props.isPasswordValid} show={props.showSignin} hide={props.hideSignin} signin={props.signin} />
                    </Den.Components.X>
                </Den.Components.XBetween>
            </Den.Components.XCenter>
        </Den.Components.Display>
        {/* Mobile */}
        <Den.Components.Display category={Den.Components.DisplayCategory.Hidden} type={Den.Components.DisplayType.Up} breakpoint={Den.Components.BreakpointType.Small}>
            <Den.Components.XBetween overflow='visible'>
                <Menu />
                <Den.Components.X>
                    <Language locale={props.locale} pathname='/' />
                    <Den.Components.VSvg onClick={props.showHelp}><HelpSvg /></Den.Components.VSvg>
                    <Signin isUnauthorized={props.isUnauthorized} isPasswordValid={props.isPasswordValid} show={props.showSignin} hide={props.hideSignin} signin={props.signin} />
                </Den.Components.X>
            </Den.Components.XBetween>
            <Den.Components.Y margin='2em 0 0 0' cross={Den.Components.YCrossType.Center} gap='0.6em'>
                <Link href='/'>
                    <Den.Components.VSvg category={Den.Components.SvgCategory.Circle} size={Den.Components.SizeType.Large} padding='0.4em' backgroundColor='logo' frontColor={Den.Components.ColorType.White}><LogoSvg /></Den.Components.VSvg>
                </Link>
                <Den.Components.VLabel caption={t('slogan')} />
            </Den.Components.Y>
        </Den.Components.Display>
    </Den.Components.VHeader>;
}

const mapStateToProps = ({ home }: Store) => ({
    isUnauthorized: home.isSigninShow,
    isPasswordValid: home.isPasswordValid
});

const mapDispatchToProps = {
    showSignin,
    hideSignin,
    signin,
    showHelp
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);