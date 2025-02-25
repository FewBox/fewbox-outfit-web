'use client';
import { Den } from '@fewbox/den-web';
import React, { useRef, useEffect, useState } from 'react';
import Cursor from '../Cursor';

export interface IMaskImageProps {
    imageUrl: string;
    zoom: number;
    isRevert?: boolean;
}

const MaskImage = (props: IMaskImageProps) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [scale, setScale] = useState<number>(1);
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [isCursorShow, setCursorStatus] = useState<boolean>(false);
    const canvasHeight = 760;
    const maskSize = 40;
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
            const ratio = img.width / img.height;
            const drawHeight = canvasHeight;
            const drawWidth = canvasHeight * ratio;
            canvas.width = drawWidth;
            canvas.height = drawHeight;
            // Draw the initial mask
            ctx.fillStyle = maskColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            drawImage(img);
            setImage(img);
        };
    }, [props.imageUrl]);

    const drawImage = (initImg?: HTMLImageElement) => {
        const canvas = canvasRef.current;
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
        const drawHeight = canvasHeight;
        const drawWidth = canvasHeight * ratio;
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, drawWidth, drawHeight);
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
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.globalCompositeOperation = destinationOut;
        ctx.beginPath();
        ctx.arc(x, y, props.zoom * maskSize / 2, Math.PI * 2);
        ctx.fill();
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.globalCompositeOperation = destinationOut;
        ctx.beginPath();
        ctx.arc(x, y, props.zoom * maskSize / 2, 0, Math.PI * 2);
        ctx.fill();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const zoom = (event) => {
        const delta = event.deltaY;
        if (delta < 0) {
            setScale(scale * 1.1);
        } else {
            setScale(scale / 1.1);
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.scale(scale, scale);
        drawImage();
    };

    const saveMaskImage = () => {
        const canvas = canvasRef.current;
        const link = document.createElement("a");
        link.download = "mask.png";
        link.href = canvas.toDataURL();
        link.click();
    };

    const clear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (scale > 1) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        else {
            ctx.clearRect(0, 0, canvas.width / scale, canvas.height / scale);
        }
    };

    const showCursor = () => {
        setCursorStatus(true);
    };
    const hideCursor = () => {
        setCursorStatus(false);
    };

    return <Den.Components.Y gap='1.6em'>
        {/*<Den.Components.VLabel caption='Clear' onClick={() => { clear(); }} />*/}
        <Den.Components.XRight gap='0.6em'>
            <Den.Components.VLabel padding='0.2em 0.6em' borderRadius='2em' cursor='pointer' backgroundColor={Den.Components.ColorType.Primary} frontColor={Den.Components.ColorType.White} size={Den.Components.SizeType.Large} caption={'export'} onClick={() => { saveMaskImage(); }} />
        </Den.Components.XRight>
        <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onMouseEnter={showCursor}
            onMouseLeave={hideCursor}
            //onWheel={zoom}
            style={{ borderRadius: '1em', border: '1px solid #e1e1e1'}}
        />
        {!!isCursorShow && <Cursor containerRef={canvasRef} zoom={props.zoom} maskSize={maskSize} />}
    </Den.Components.Y>;
};

export default MaskImage;