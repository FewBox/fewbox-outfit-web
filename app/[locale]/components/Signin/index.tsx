'use client';
import { Den } from "@fewbox/den-web";
import { useState } from "react";
import CloseSvg from '@/assets/svgs/close.svg';
import { useTranslations } from "next-intl";
import { SigninCredential } from "../../reducers/StateTypes";

export interface ISigninProps {
    isUnauthorized: boolean;
    show: () => void;
    hide: () => void;
    signin: (signinCredential: SigninCredential) => void;
}
export interface ISigninStates { }

export default function Signin(props: ISigninProps) {
    const t = useTranslations('MasterPage');
    const [state, setState] = useState<ISigninStates>({});
    const handleSubmit = (data: any) => {
        props.signin(data);
    };
    return <Den.Components.VBoundary>
        {!!props.isUnauthorized && <Den.Components.VMask backgroundColor={Den.Components.ColorType.White}>
            <Den.Components.VForm handleSubmit={handleSubmit} handleValidateError={() => { debugger; }}>
                <Den.Components.Y gap='1em'>
                    <Den.Components.XRight>
                        <Den.Components.VSvg size={Den.Components.SizeType.Small} frontColor={Den.Components.ColorType.Placeholder} onClick={props.hide}><CloseSvg /></Den.Components.VSvg>
                    </Den.Components.XRight>
                    <Den.Components.VBoundary>
                        <Den.Components.Position category={Den.Components.PositionCategory.Self} bottom='4.2em' right='1.6em'>
                            <Den.Components.VImage width={256} height={256} src='/images/signin.png'
                                style={{
                                    width: '24em',
                                    height: 'auto',
                                }} alt='signin' />
                        </Den.Components.Position>
                        <Den.Components.Y backgroundColor={Den.Components.ColorType.White} padding='4em 2em 2em 2em' borderRadius='1em' gap='1em'>
                            <Den.Components.Y gap='0.6em'>
                                <Den.Components.VTextBox padding='0.6em 0.8em' borderStyle='solid' borderColor={Den.Components.ColorType.Placeholder} borderRadius='6em' borderWidth='1px' name='username' placeholder={t('username')} isRequired />
                                <Den.Components.VPassword padding='0.6em 0.8em' borderStyle='solid' borderColor={Den.Components.ColorType.Placeholder} borderRadius='6em' borderWidth='1px' name='password' placeholder={t('password')} isRequired />
                            </Den.Components.Y>
                            <Den.Components.VSubmit size={Den.Components.SizeType.Small} padding='0.8em' borderRadius='6em' frontColor={Den.Components.ColorType.White} backgroundColor={Den.Components.ColorType.Black} caption={t('signin')} />
                        </Den.Components.Y>
                    </Den.Components.VBoundary>
                </Den.Components.Y>
            </Den.Components.VForm>
        </Den.Components.VMask>}
        <Den.Components.VLabel cursor='pointer' letterSpacing='3px' padding='0.3em 2em' borderStyle='solid' weight={Den.Components.FontWeightType.Light} borderColor={Den.Components.ColorType.Primary} frontColor={Den.Components.ColorType.Primary} borderWidth='1px' borderRadius='3em' caption={t('signin')} onClick={props.show} />
    </Den.Components.VBoundary>;
}