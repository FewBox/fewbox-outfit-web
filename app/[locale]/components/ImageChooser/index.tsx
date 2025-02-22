"use client";
import { Den } from "@fewbox/den-web";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import OutfitSvg from '@/assets/svgs/outfit.svg';
import CloseSvg from '@/assets/svgs/close.svg';

export interface IImageChooserProps {
    close: () => void;
}
export interface IImageChooserStates { }

const ImageChooser = (props: IImageChooserProps): JSX.Element => {
    const t = useTranslations('HomePage');
    const [state, setState] = useState<IImageChooserStates>({});
    return <Den.Components.Y gap='1em'>
        <Den.Components.VFile name='garment_file' width='16em' fileIcon={<Den.Components.VSvg size={Den.Components.SizeType.Large}><OutfitSvg /></Den.Components.VSvg>} emptyMessage={t('empty')} />
        <Den.Components.VTextBox name='garment_url' />
        <Den.Components.VSvg size={Den.Components.SizeType.Small} onClick={() => { props.close(); }}><CloseSvg /></Den.Components.VSvg>
    </Den.Components.Y>
};

export default ImageChooser;