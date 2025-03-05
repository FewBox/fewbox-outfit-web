'use client';
import { Den } from '@fewbox/den-web';
import React, { useEffect, useState, forwardRef, RefObject } from 'react';
import Cursor from '../Cursor';

export interface IMaskImageProps {
    imageUrl: string;
    zoom: number;
    isRevert?: boolean;
}

const MaskImage = forwardRef<HTMLCanvasElement, IMaskImageProps>((props, ref) => {
    const canvasRef = ref as RefObject<HTMLCanvasElement>;
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [scale, setScale] = useState<number>(1);
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [isCursorShow, setCursorStatus] = useState<boolean>(false);
    // const canvasHeight = 760; // Change to original image.
    const canvasScaleHeight = 800;
    const maskSize = 60;
    const maskColor = 'rgba(255, 255, 255, 1)';
    const destinationOut = 'destination-out';
    const sourceOver = 'source-over';

    useEffect(() => {
        // Load the image
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = props.imageUrl;
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            /*const ratio = img.width / img.height;
            const drawHeight = canvasHeight;
            const drawWidth = canvasHeight * ratio;
            canvas.width = drawWidth;
            canvas.height = drawHeight;*/
            canvas.width = img.width;
            canvas.height = img.height;
            setScale(canvasScaleHeight / canvas.height);
            // Draw the initial mask
            ctx.fillStyle = maskColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            drawImage(img);
            setImage(img);
        };
    }, [props.imageUrl]);

    const drawImage = (initImg?: HTMLImageElement) => {
        const canvas = canvasRef.current;
        canvas.style.height = `${canvasScaleHeight}px`;
        const ctx = canvas.getContext('2d');
        let img;
        if (initImg) {
            img = initImg;
        }
        else {
            img = image;
            clear();
        }
        const ratio = img.width / img.height;
        /*const drawHeight = canvasHeight;
        const drawWidth = canvasHeight * ratio;
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, drawWidth, drawHeight);*/
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
    };

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        // Todo: Need to implement.
        if (props.isRevert) {
            clear();
            ctx.globalCompositeOperation = sourceOver;
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            return;
        }
        setIsDrawing(true);
        drawMask(e);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        drawMask(e);
    };

    const drawMask = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        //console.log(scale, rect, e.clientX, e.clientY);
        const x = (e.clientX - rect.left) / scale;
        const y = (e.clientY - rect.top) / scale;
        ctx.globalCompositeOperation = destinationOut;
        ctx.beginPath();
        ctx.arc(x, y, props.zoom * maskSize * scale, 0, Math.PI * 2);
        ctx.fill();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const showCursor = () => {
        setCursorStatus(true);
    };
    const hideCursor = () => {
        setCursorStatus(false);
    };

    return <Den.Components.Y gap='1.6em'>
        {/*<Den.Components.VLabel caption='Clear' onClick={() => { clear(); }} />*/}
        <Den.Components.VHidden name='model_url' valueHook={props.imageUrl} />
        <canvas
            ref={ref}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onMouseEnter={showCursor}
            onMouseLeave={hideCursor}
            //onWheel={zoom}
            style={{ borderRadius: '1em', border: '1px solid #e1e1e1' }}
        />
        {!!isCursorShow && <Cursor containerRef={canvasRef} zoom={props.zoom} maskSize={maskSize * scale} />}
    </Den.Components.Y>;
});

export default MaskImage;