import { Den } from '@fewbox/den-web';

export interface IProgressBarProps {
    currentStep: number;
    totalStep: number;
}

const Diameter = '0.4em';

const ProgressBar = (props: IProgressBarProps) => {
    const steps = [];
    for (let step = 1; step <= props.totalStep; step++) {
        steps.push(step);
    }
    return <Den.Components.XLeft gap='0.2em'>
        {steps.map((step, stepIndex) => {
            if (step == props.currentStep && props.currentStep != props.totalStep) {
                return <Den.Components.VAnimation key={`step${stepIndex}`} category={Den.Components.AnimationCategory.Flash} repeat={Den.Components.AnimationRepeat.Infinite} speed={Den.Components.AnimationSpeed.Slower}>
                    <Den.Components.VEllipse width={Diameter} height={Diameter} backgroundColor={Den.Components.ColorType.Success} />
                </Den.Components.VAnimation>;
            }
            else {
                return <Den.Components.VEllipse key={`step${stepIndex}`} width={Diameter} height={Diameter} backgroundColor={step <= props.currentStep ? Den.Components.ColorType.Success : Den.Components.ColorType.Black} />;
            }
        })}
    </Den.Components.XLeft>;
}

export default ProgressBar;