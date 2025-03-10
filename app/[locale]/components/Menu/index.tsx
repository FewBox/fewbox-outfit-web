"use client";
import { Den } from "@fewbox/den-web";
import MenuSvg from "@/assets/svgs/menu.svg";
import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

//export interface IMenuProps { }
export interface IMenuStates {
    isSelected: boolean;
}

const Menu = (/*props: IMenuProps*/): JSX.Element => {
    const t = useTranslations('MasterPage');
    const [state, setState] = useState<IMenuStates>({ isSelected: false });
    return <Den.Components.Dock category={Den.Components.DockCategory.LeftInnerBottom} renderOverlay={() => {
        if (state.isSelected) {
            return <Den.Components.Y padding='1em 2em' gap='0.6em' backgroundColor={Den.Components.ColorType.White} borderRadius='1em'>
                <Link href="/document">
                    <Den.Components.VLabel category={Den.Components.LabelCategory.Div} caption={t('document')} onClick={() => { setState({ isSelected: false }) }} />
                </Link>
                <Link href="/pricing">
                    <Den.Components.VLabel category={Den.Components.LabelCategory.Div} caption={t('pricing')} onClick={() => { setState({ isSelected: false }) }} />
                </Link>
                <Link href="/about">
                    <Den.Components.VLabel category={Den.Components.LabelCategory.Div} caption={t('about')} onClick={() => { setState({ isSelected: false }) }} />
                </Link>
            </Den.Components.Y>;
        }
        else {
            return <></>;
        }
    }}>
        <Den.Components.VSvg cursor='pointer' onClick={() => { setState({ isSelected: !state.isSelected }); }}><MenuSvg /></Den.Components.VSvg>
    </Den.Components.Dock>;
};

export default Menu;