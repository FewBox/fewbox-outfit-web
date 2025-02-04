'use client';
import { Den } from "@fewbox/den-web";
import { useState } from "react";
import CloseSvg from '@/assets/svgs/close.svg';
import { useTranslations } from "next-intl";

export interface ISigninProps { }
export interface ISigninStates {
    isModalShow: boolean;
}

export default function Signin(props: ISigninProps) {
    const t = useTranslations('MasterPage');
    const [state, setState] = useState<ISigninStates>({ isModalShow: false });
    const handleSubmit = (data: any) => {
        console.log(data);
        setState({ isModalShow: false });
    };
    return <Den.Components.VBoundary>
        {!!state.isModalShow && <Den.Components.VMask>
            <Den.Components.VForm handleSubmit={handleSubmit}>
                <Den.Components.Y gap='1em'>
                    <Den.Components.XRight>
                        <Den.Components.VSvg size={Den.Components.SizeType.Small} frontColor={Den.Components.ColorType.Placeholder} onClick={() => { setState({ isModalShow: false }); }}><CloseSvg /></Den.Components.VSvg>
                    </Den.Components.XRight>
                    <Den.Components.Y backgroundColor={Den.Components.ColorType.White} padding='3em 2em' borderRadius='1em' gap='1em'>
                        <Den.Components.Y gap='0.6em'>
                            <Den.Components.VTextBox padding='0.3em 0.4em' borderStyle='solid' borderColor={Den.Components.ColorType.Placeholder} borderRadius='6em' borderWidth='1px' name='username' placeholder={t('username')} />
                            <Den.Components.VPassword padding='0.3em 0.4em' borderStyle='solid' borderColor={Den.Components.ColorType.Placeholder} borderRadius='6em' borderWidth='1px' name='password' placeholder={t('password')} />
                        </Den.Components.Y>
                        <Den.Components.VSubmit size={Den.Components.SizeType.Small} padding='0.6em 1.2em' borderRadius='6em' frontColor={Den.Components.ColorType.White} backgroundColor={Den.Components.ColorType.Black} caption={t('signin')} />
                    </Den.Components.Y>
                </Den.Components.Y>
            </Den.Components.VForm>
        </Den.Components.VMask>}
        <Den.Components.VLabel cursor='pointer' margin='0 0 0 1em' padding='0.2em 2em' borderStyle='solid' borderColor={Den.Components.ColorType.Black} borderWidth='1px' borderRadius='3em' caption={t('signin')} onClick={() => {
            setState({ isModalShow: true });
        }} />
    </Den.Components.VBoundary>;
}