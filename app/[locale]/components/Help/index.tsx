import { Den } from '@fewbox/den-web';
import CloseSvg from '@/assets/svgs/close.svg';

export interface Step {
    optionCaption: string;
    optionIcons: JSX.Element[];
    targetCaption: string;
}

export enum HelpCategory {
    Horizontal = 'horizontal',
    Vertical = 'vertical'
}

export interface IHomeProps {
    category?: HelpCategory;
    steps: Step[];
    hide: () => void;
}

const Help = (props: IHomeProps) => {
    if (props.category == HelpCategory.Vertical) {
        return <Den.Components.XCenter gap='3em'>
            <Den.Components.Y gap='1em'>
                {props.steps.map((step, stepIndex) => {
                    const content = <Den.Components.X gap='0.2em'>
                        <Den.Components.VLabel caption={step.optionCaption} />
                        <Den.Components.X>
                            {step.optionIcons.map((optionIcon, optionIconIndex) => {
                                return <Den.Components.VSvg key={`option-icon${optionIconIndex}`} size={Den.Components.SizeType.Small} frontColor={Den.Components.ColorType.Dark50}>{optionIcon}</Den.Components.VSvg>;
                            })}
                        </Den.Components.X>
                        <Den.Components.VLabel caption={step.targetCaption} />
                    </Den.Components.X>;
                    return <Den.Components.XLeft key={`step${stepIndex}`} gap='0.2em'>
                        <Den.Components.VLabel alignType={Den.Components.LabelAlignType.Center} width='1.6em' height='1.6em' borderRadius='6em' backgroundColor={Den.Components.ColorType.Info} frontColor={Den.Components.ColorType.White} caption={(stepIndex + 1).toString()} />
                        {content}
                    </Den.Components.XLeft>
                })}
            </Den.Components.Y>
            <Den.Components.VSvg size={Den.Components.SizeType.ExtraSmall} frontColor={Den.Components.ColorType.Dark} onClick={props.hide}><CloseSvg /></Den.Components.VSvg>
        </Den.Components.XCenter>;
    }
    else {
        return <Den.Components.XCenter gap='3em'>
            <Den.Components.X gap='2em'>
                {props.steps.map((step, stepIndex) => {
                    const content = <Den.Components.X gap='0.2em'>
                        <Den.Components.VLabel weight={Den.Components.FontWeightType.Thin} size={Den.Components.SizeType.Small} caption={step.optionCaption} />
                        <Den.Components.X>
                            {step.optionIcons.map((optionIcon, optionIconIndex) => {
                                return <Den.Components.VSvg key={`option-icon${optionIconIndex}`} size={Den.Components.SizeType.ExtraSmall} frontColor={Den.Components.ColorType.Dark50}>{optionIcon}</Den.Components.VSvg>;
                            })}
                        </Den.Components.X>
                        <Den.Components.VLabel weight={Den.Components.FontWeightType.Thin} size={Den.Components.SizeType.Small} caption={step.targetCaption} />
                    </Den.Components.X>;
                    return <Den.Components.XLeft key={`step${stepIndex}`} gap='0.2em'>
                        <Den.Components.VLabel size={Den.Components.SizeType.Small} alignType={Den.Components.LabelAlignType.Center} width='1.6em' height='1.6em' borderRadius='6em' backgroundColor={Den.Components.ColorType.Info} frontColor={Den.Components.ColorType.White} caption={(stepIndex + 1).toString()} />
                        {content}
                    </Den.Components.XLeft>
                })}
            </Den.Components.X>
            <Den.Components.VSvg size={Den.Components.SizeType.ExtraSmall} frontColor={Den.Components.ColorType.Dark} onClick={props.hide}><CloseSvg /></Den.Components.VSvg>
        </Den.Components.XCenter>;
    }
}

export default Help;