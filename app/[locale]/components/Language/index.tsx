
import { Den } from '@fewbox/den-web';
import EnglishSvg from '@/assets/svgs/english.svg';
import ChineseSvg from '@/assets/svgs/chinese.svg';
import { Link } from '@/i18n/routing';

export interface ILanguageProps {
    locale: string;
    pathname: string;
}

export default function Language(props: ILanguageProps) {
    return <Den.Components.X gap='0.2em' padding='0.1em 0.2em' backgroundColor={Den.Components.ColorType.Secondary} borderRadius='6em'>
        <Link href={props.pathname} locale="en">
            <Den.Components.VSvg size={Den.Components.SizeType.Small} frontColor={props.locale == 'en' ? Den.Components.ColorType.Dark : Den.Components.ColorType.Placeholder}><EnglishSvg /></Den.Components.VSvg>
        </Link>
        <Link href={props.pathname} locale="zh-cn">
            <Den.Components.VSvg size={Den.Components.SizeType.Small} frontColor={props.locale == 'zh-cn' ? Den.Components.ColorType.Dark : Den.Components.ColorType.Placeholder}><ChineseSvg /></Den.Components.VSvg>
        </Link>
    </Den.Components.X>;
}