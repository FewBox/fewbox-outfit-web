"use client";
import { Den } from "@fewbox/den-web";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import OutfitSvg from '@/assets/svgs/outfit.svg';
import TryOnSvg from '@/assets/svgs/tryon.svg';
import CloseSvg from '@/assets/svgs/close.svg';
import { Garment } from "@/assets/images/garment";

export interface IImageChooserProps {
    close: () => void;
}
export interface IImageChooserStates {
    imageUrl: string;
}

const ImageChooser = (props: IImageChooserProps): JSX.Element => {
    const t = useTranslations('HomePage');
    const [state, setState] = useState<IImageChooserStates>({ imageUrl: '' });
    return <Den.Components.Y gap='1em' cross={Den.Components.YCrossType.Center}>
        <Den.Components.VImage width={256} height={256} src={state.imageUrl.startsWith('http') ? state.imageUrl : Garment}
            style={{
                width: '16em',
                height: 'auto',
                borderRadius: '1em',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
            }} alt='garment' />
        <Den.Components.VFile name='garment_file' width='16em' fileIcon={<Den.Components.VSvg size={Den.Components.SizeType.Large}><OutfitSvg /></Den.Components.VSvg>} emptyMessage={t('empty')} />
        <Den.Components.VTextBox name='garment_url' width='16em' onChange={(e) => { setState({ ...state, imageUrl: e.currentTarget.value }); }} />
        <Den.Components.X gap='2em'>
            <Den.Components.VSubmit caption={<Den.Components.VSvg size={Den.Components.SizeType.Small}><TryOnSvg /></Den.Components.VSvg>} />
            <Den.Components.VSvg size={Den.Components.SizeType.Small} onClick={() => { props.close(); }}><CloseSvg /></Den.Components.VSvg>
        </Den.Components.X>
    </Den.Components.Y>
};

export default ImageChooser;