"use client";
import { Den } from "@fewbox/den-web";
import { RefObject, useEffect, /*useState*/ } from "react";
//import { useTranslations } from "next-intl";
import './index.scss';

export interface ICursorProps {
    containerRef: RefObject<HTMLCanvasElement>;
    maskSize: number;
    zoom: number;
}
//export interface ICursorStates { }

const Cursor = (props: ICursorProps): JSX.Element => {
    const zoomMaskSize = props.maskSize * props.zoom;
    //const t = useTranslations('HomePage');
    //const [state, setState] = useState<ICursorStates>({});
    useEffect(() => {
        const customCursor = document.querySelector('.custom-cursor') as HTMLDivElement;
        props.containerRef.current.removeEventListener('mousemove', () => { });
        props.containerRef.current.addEventListener('mousemove', (event: MouseEvent) => {
            customCursor.style.display = 'block';
            customCursor.style.left = `${event.clientX - ((props.maskSize * props.zoom) / 2)}px`;
            customCursor.style.top = `${event.clientY - ((props.maskSize * props.zoom) / 2)}px`;
        });
        props.containerRef.current.addEventListener('mouseout', (/*event: MouseEvent*/) => {
            customCursor.style.display = 'none';
        });
    }, [props.zoom, props.maskSize]);
    return <Den.Components.VEllipse padding={0} backgroundColor={Den.Components.ColorType.Black} className='custom-cursor' width={`${zoomMaskSize}px`} height={`${zoomMaskSize}px`} />;
};

export default Cursor;