'use client';
import { Den } from "@fewbox/den-web";
import { useTranslations } from 'next-intl';
import CompareImage from "../CompareImage";
import { useState } from "react";

export interface IClientShowcasePage {
    totalShowcase: number;
}

export interface IClientShowcaseStates {
    currentShowcase: number;
}

const ClientShowcasePage = (props: IClientShowcasePage) => {
    const t = useTranslations('ShowcasePage');
    const [state, setState] = useState<IClientShowcaseStates>({ currentShowcase: 1 });
    const showcases = [];
    for (let showcase = 1; showcase <= props.totalShowcase; showcase++) {
        showcases.push(showcase);
    }
    return <Den.Components.Y margin='3em 0 0 0' gap='1em'>
        <Den.Components.Y cross={Den.Components.YCrossType.Center} gap='1em'>
            <Den.Components.VLabel weight={Den.Components.FontWeightType.Light} size={Den.Components.SizeType.ExtraLarge} caption={t('showcase')} />
            <CompareImage index={state.currentShowcase} />
        </Den.Components.Y>
        <Den.Components.XCenter gap='0.6em'>
            {showcases.map((showcase) => {
                return <Den.Components.VBoundary key={`showcase${showcase}`} onClick={() => { setState({ ...state, currentShowcase: showcase }); }}>
                    <Den.Components.VImage width={512} height={512}
                        style={{
                            width: '6em',
                            height: 'auto',
                            borderColor: showcase == state.currentShowcase ? 'green' : 'transparent',
                            borderStyle: 'solid',
                            borderWidth: '3px',
                            borderRadius: '0.2em'
                        }} src={`/images/showcase/${showcase}-after.png`} alt={`showcase ${showcase}`} />
                </Den.Components.VBoundary>
            })}
        </Den.Components.XCenter>
    </Den.Components.Y>;
}

export default ClientShowcasePage;