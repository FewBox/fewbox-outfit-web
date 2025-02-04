'use client';
import * as React from 'react';
import { Den } from '@fewbox/den-web';
import Paypal from '../Paypal';
import FeatureSvg from '@/assets/svgs/feature.svg';
import { useTranslations } from 'next-intl';

export interface ILicenseProps extends Den.Components.IBaseProps {
}

const License = (props: ILicenseProps) => {
    const t = useTranslations('PricingPage');
    return <>
        <Paypal
            padding='2em 1.6em'
            backgroundColor='subscription-background'
            frontColor={Den.Components.ColorType.White}
            borderColor='subscription-border'
            borderRadius='2em'
            borderStyle='solid'
            borderWidth='3px'
            pricing={{
                name: <Den.Components.Y>
                    <Den.Components.XRight>
                        <Den.Components.VLabel padding='0.2em 1em' borderStyle='solid' borderColor={Den.Components.ColorType.Placeholder} borderRadius='6em' borderWidth='1px' size={Den.Components.SizeType.Small} weight={Den.Components.FontWeightType.Thin} frontColor='subscription-border' caption={t('recommendation')} />
                    </Den.Components.XRight>
                    <Den.Components.XCenter>
                        <Den.Components.VLabel size={Den.Components.SizeType.Large} weight={Den.Components.FontWeightType.Black} frontColor='subscription-border' caption={t('subscription')} />
                    </Den.Components.XCenter>
                </Den.Components.Y>,
                description: <Den.Components.VLabel caption='' />,
                value: <Den.Components.XLeft gap='0.2em' cross={Den.Components.XCrossType.Baseline}>
                    <Den.Components.VLabel category={Den.Components.LabelCategory.H1} frontColor='subscription-border' size={Den.Components.SizeType.Large} caption='$1.99' />
                    <Den.Components.VLabel caption={t('month')} />
                </Den.Components.XLeft>,
                features: [
                    {
                        icon: <Den.Components.VSvg size={Den.Components.SizeType.ExtraSmall}><FeatureSvg /></Den.Components.VSvg>,
                        content: <Den.Components.VLabel size={Den.Components.SizeType.Small} caption={t('subscriptionItem1')} />
                    },
                    {
                        icon: <Den.Components.VSvg size={Den.Components.SizeType.ExtraSmall}><FeatureSvg /></Den.Components.VSvg>,
                        content: <Den.Components.VLabel size={Den.Components.SizeType.Small} caption={t('subscriptionItem2')} />
                    },
                    {
                        icon: <Den.Components.VSvg size={Den.Components.SizeType.ExtraSmall}><FeatureSvg /></Den.Components.VSvg>,
                        content: <Den.Components.VLabel size={Den.Components.SizeType.Small} caption={t('subscriptionItem3')} />
                    },
                    {
                        icon: <Den.Components.VSvg size={Den.Components.SizeType.ExtraSmall}><FeatureSvg /></Den.Components.VSvg>,
                        content: <Den.Components.VLabel size={Den.Components.SizeType.Small} caption={t('subscriptionItem4')} />
                    }
                ],
            }}
            options={{
                clientId: 'AfOGMe-aVK6GKU8n2Ur9-A2B14fSO3DJASzrYJzd9YxPb7-hVcYTrr1Qkwf7FS_8gHTsNWUC1dYxKtMY',
                dataNamespace: 'paypal_subscription',
                vault: true,
                intent: 'subscription', //
            }}
            buttonOptions={{
                style: {
                    layout: 'horizontal',
                    color: 'black',
                    shape: 'pill',
                    label: 'subscribe',
                    borderRadius: 64,
                    //disableMaxWidth: true,
                    height: 36,// 22 - 55,
                    //tagline: true
                },
                /*message: {
                    amount: 99.99,
                    align: 'center',
                    color: 'black',
                    position: 'bottom',
                },*/
                onError(err) {
                    // For example, redirect to a specific error page
                    console.error('Return to human service', err);
                },
                async createSubscription(data, actions) {
                    // updatedSubscription, status, and subscriptionId are defined by your code
                    return actions.subscription.create({
                        plan_id: "P-5UT014004A903700EMPLBLBY"
                    });
                }
                /*
                async createOrder() {
                    const response = await fetch("https://payment.fewbox.com/create-paypal-order", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            cart: [{
                                sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
                                quantity: "YOUR_PRODUCT_QUANTITY",
                            }]
                        })
                    });
                    const order = await response.json();
                    return order.id;
                }
                async onApprove(data) {
                    // Capture the funds from the transaction.
                    const response = await fetch("https://payment.fewbox.com/capture-paypal-order", {
                        method: "POST",
                        body: JSON.stringify({
                            orderID: data.orderID
                        })
                    })
                    const details = await response.json();
                    // Show success message to buyer
                    alert(`Transaction completed by ${details.payer.name.given_name}`);
                },
                onCancel(data) {
                    // Show a cancel page, or return to cart
                    console.log('Return to cart');
                },
                onError(err) {
                    // For example, redirect to a specific error page
                    console.error('Return to human service', err);
                },
                // onInit is called when the button first renders
                onInit(data, actions) {
                    // Disable the buttons
                    actions.disable();
                    // Listen for changes to the checkbox
                    document.querySelector("#check")?.addEventListener("change", function (event: any) {
                        // Enable or disable the button when it is checked or unchecked
                        if (event.target?.checked) {
                            actions.enable();
                        } else {
                            actions.disable();
                        }
                    });
                },
                // onClick is called when the button is selected
                onClick() {
                    // Show a validation error if the checkbox isn't checked
                    const checked: any = document.querySelector("#check");
                    if (!checked?.checked) {
                        document.querySelector("#error")?.classList.remove("hidden");
                    }
                },
                onShippingChange(data, actions) {
                    // Reject non-US addresses
                    if (data.shipping_address.country_code !== 'US') {
                        return actions.reject();
                    }
        
                    // Patch the shipping amount
                    const response = await fetch("/my-server/patch-paypal-order", {
                        method: "PATCH",
                        body: JSON.stringify(
                        {
                            shippingAddress: data.shipping_address
                        })
                    })
                }
                async onShippingAddressChange(data, actions) {
                    if (data.shippingAddress.countryCode !== "US") {
                        return actions.reject();
                    }
                },
                async onShippingOptionsChange(data, actions) {
                    if (data.selectedShippingOption?.type === 'PICKUP') {
                        return actions.reject();
                    }
                }
                */
            }} />
        <Paypal
            padding='2em 1.6em'
            backgroundColor={Den.Components.ColorType.White}
            frontColor={Den.Components.ColorType.Dark}
            borderColor={Den.Components.ColorType.Placeholder}
            borderRadius='2em'
            borderStyle='solid'
            borderWidth='3px'
            pricing={{
                name: <Den.Components.Y cross={Den.Components.YCrossType.Center}>
                    <Den.Components.VLabel size={Den.Components.SizeType.Large} weight={Den.Components.FontWeightType.Black} caption={t('yearly')} />
                </Den.Components.Y>,
                description: <Den.Components.VLabel caption='' />,
                value: <Den.Components.XLeft gap='0.2em' cross={Den.Components.XCrossType.Baseline}>
                    <Den.Components.VLabel size={Den.Components.SizeType.ExtraLarge} caption='$39.99' />
                    <Den.Components.VLabel caption={t('year')} />
                </Den.Components.XLeft>,
                features: [
                    {
                        icon: <Den.Components.VSvg size={Den.Components.SizeType.ExtraSmall}><FeatureSvg /></Den.Components.VSvg>,
                        content: <Den.Components.VLabel size={Den.Components.SizeType.Small} caption={t('yearlyItem1')} />
                    },
                    {
                        icon: <Den.Components.VSvg size={Den.Components.SizeType.ExtraSmall}><FeatureSvg /></Den.Components.VSvg>,
                        content: <Den.Components.VLabel size={Den.Components.SizeType.Small} caption={t('yearlyItem2')} />
                    },
                ],
            }}
            options={{
                clientId: 'AfOGMe-aVK6GKU8n2Ur9-A2B14fSO3DJASzrYJzd9YxPb7-hVcYTrr1Qkwf7FS_8gHTsNWUC1dYxKtMY',
            }}
            buttonOptions={{
                style: {
                    layout: 'horizontal',
                    color: 'black',
                    shape: 'pill',
                    label: 'buynow',
                    borderRadius: 64,
                    //disableMaxWidth: true,
                    height: 36,// 22 - 55,
                    //tagline: true
                },
                onError(err) {
                    // For example, redirect to a specific error page
                    console.error('Return to human service', err);
                },
                async createOrder(data, actions) {
                    return actions.order.create({
                        intent: 'CAPTURE',
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: 'USD',
                                    value: "39.99"
                                },
                            },
                        ],
                    });
                }
            }} />
    </>;
}

export default License;