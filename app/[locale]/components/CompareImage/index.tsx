'use client';
import { Den } from '@fewbox/den-web';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import LeftSvg from '@/assets/svgs/left.svg';
import RightSvg from '@/assets/svgs/right.svg';
import './index.scss';

export interface ICompareImageProps {
    index: number;
}

const CompareImage = (props: ICompareImageProps) => {
    const t = useTranslations('ShowcasePage');
    useEffect(() => {
        document.querySelector("#image-comparison-slider");
        const slider = document.querySelector("#image-comparison-slider") as HTMLDivElement;
        const sliderImgWrapper = document.querySelector("#image-comparison-slider .img-wrapper") as HTMLDivElement;
        const sliderHandle = document.querySelector("#image-comparison-slider .handle") as HTMLDivElement;

        slider.addEventListener("mousemove", sliderMouseMove);
        slider.addEventListener("touchmove", sliderMouseMove);

        function sliderMouseMove(event) {

            if (isSliderLocked) return;

            const sliderLeftX = slider.offsetLeft;
            const sliderWidth = slider.clientWidth;
            const sliderHandleWidth = sliderHandle.clientWidth;

            let mouseX = (event.clientX || event.touches[0].clientX) - sliderLeftX;
            if (mouseX < 0) mouseX = 0;
            else if (mouseX > sliderWidth) mouseX = sliderWidth;

            sliderImgWrapper.style.width = `${((1 - mouseX / sliderWidth) * 100).toFixed(4)}%`;
            sliderHandle.style.left = `calc(${((mouseX / sliderWidth) * 100).toFixed(4)}% - ${sliderHandleWidth / 2}px)`;
        }

        let isSliderLocked = false;

        slider.addEventListener("mousedown", sliderMouseDown);
        slider.addEventListener("touchstart", sliderMouseDown);
        slider.addEventListener("mouseup", sliderMouseUp);
        slider.addEventListener("touchend", sliderMouseUp);
        slider.addEventListener("mouseleave", sliderMouseLeave);

        function sliderMouseDown(event) {
            if (isSliderLocked) isSliderLocked = false;
            sliderMouseMove(event);
        }

        function sliderMouseUp() {
            if (!isSliderLocked) isSliderLocked = true;
        }

        function sliderMouseLeave() {
            if (isSliderLocked) isSliderLocked = false;
        }
    }, []);
    return <Den.Components.VBoundary id="image-comparison-slider">
        <img src={`/images/showcase/${[props.index]}-before.png`} alt="before" />
        <Den.Components.VBoundary className="img-wrapper">
            <img src={`/images/showcase/${[props.index]}-after.png`} alt="after" />
        </Den.Components.VBoundary>
        <Den.Components.VBoundary className="label label-before">{t('before')}</Den.Components.VBoundary>
        <Den.Components.VBoundary className="label label-after">{t('after')}</Den.Components.VBoundary>
        <Den.Components.VBoundary className="handle">
            <Den.Components.VBoundary className="handle-line"></Den.Components.VBoundary>
            <Den.Components.X className="handle-circle">
                <Den.Components.VSvg frontColor={Den.Components.ColorType.White} size={Den.Components.SizeType.ExtraSmall}><LeftSvg /></Den.Components.VSvg>
                <Den.Components.VSvg frontColor={Den.Components.ColorType.White} size={Den.Components.SizeType.ExtraSmall}><RightSvg /></Den.Components.VSvg>
            </Den.Components.X>
            <Den.Components.VBoundary className="handle-line"></Den.Components.VBoundary>
        </Den.Components.VBoundary>
    </Den.Components.VBoundary>;
}

export default CompareImage;