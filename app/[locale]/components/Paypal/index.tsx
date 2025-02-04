import * as React from 'react';
import { PayPalButtons, PayPalScriptProvider, ReactPayPalScriptOptions } from '@paypal/react-paypal-js';
import type { PayPalButtonsComponentOptions } from "@paypal/paypal-js/types/components/buttons";
import { Den } from '@fewbox/den-web';
import './index.scss';

export interface Feature {
    icon: JSX.Element;
    content: JSX.Element;
}

export interface Pricing {
    name: JSX.Element;
    description: JSX.Element;
    value: JSX.Element;
    features: Feature[];
}

export interface IPaypalProps extends Den.Components.IBaseProps {
    pricing: Pricing;
    options: ReactPayPalScriptOptions;
    buttonOptions?: PayPalButtonsComponentOptions;
}

export interface IPaypalStates extends Den.Components.IBaseStates {
}

const Paypal = (props: IPaypalProps) => {
    const _base = Den.Components.Base(props);
    return (
        <Den.Components.Y {...props} className={_base.getClassName('paypal')} style={_base.getStyle()} gap='0.6em'>
            <Den.Components.Y gap='0.2em'>
                {props.pricing.name}
                {props.pricing.value}
            </Den.Components.Y>
            {props.pricing.description}
            {props.pricing.features.map((feature, featureIndex) => {
                return <Den.Components.XLeft key={`feature${featureIndex}`} gap='0.6em'>
                    <Den.Components.VBoundary width='1em'>
                        {feature.icon}
                    </Den.Components.VBoundary>
                    {feature.content}
                </Den.Components.XLeft>;
            })}
            <Den.Components.VBoundary padding='2em 0 0 0'>
                <PayPalScriptProvider options={props.options}>
                    <PayPalButtons {...props.buttonOptions} />
                </PayPalScriptProvider>
            </Den.Components.VBoundary>
        </Den.Components.Y>
    );
}

export default Paypal;