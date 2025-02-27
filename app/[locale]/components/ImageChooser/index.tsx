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
    isFitting: boolean;
}
export interface IImageChooserStates {
    imageUrl: string;
    emptyMessage: string;
}

const truncateFilename = (filename, front, back) => {
    if (filename.length <= front + back) {
        return filename;
    }
    return `${filename.substring(0, front)}...${filename.substring(filename.length - back)}`;
}

const ImageChooser = (props: IImageChooserProps): JSX.Element => {
    const t = useTranslations('HomePage');
    const [state, setState] = useState<IImageChooserStates>({ imageUrl: '', emptyMessage: 'N/A' });
    const garmentShow = <Den.Components.VImage width={256} height={256} src={state.imageUrl.startsWith('data:image') ? state.imageUrl : Garment}
        style={{
            width: '16em',
            height: 'auto',
            borderRadius: '1em',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
        }} alt='garment' />;
    return <Den.Components.Y gap='1em' cross={Den.Components.YCrossType.Center}>
        {!!props.isFitting && <Den.Components.VAnimation category={Den.Components.AnimationCategory.Flip} repeat={Den.Components.AnimationRepeat.Infinite} speed={Den.Components.AnimationSpeed.Slower}>
            {garmentShow}
        </Den.Components.VAnimation>}
        {!props.isFitting && garmentShow}
        <Den.Components.VFile name='garment_file' loadingSize={Den.Components.SizeType.Large} loadingColor={Den.Components.ColorType.Success} caption={<Den.Components.VLabel category={Den.Components.LabelCategory.Div}
            alignType={Den.Components.LabelAlignType.Center} caption={t('upload')} />}
            autoUpload={(file: File, complete) => {
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const base64String = e.target.result as string;
                        setState({ ...state, imageUrl: base64String, emptyMessage: truncateFilename(file.name, 6, 6) });
                        complete();
                    };
                    reader.readAsDataURL(file);
                }
            }}
            padding='2em' category={Den.Components.FileCategory.Vertical} borderRadius='0.6em' borderColor={Den.Components.ColorType.Dark} borderStyle='dashed' borderWidth='2px'
            fileIcon={<Den.Components.VSvg size={Den.Components.SizeType.Large} frontColor={Den.Components.ColorType.Dark}><OutfitSvg /></Den.Components.VSvg>} emptyMessage={state.emptyMessage} />
        {/*<Den.Components.VTextBox name='garment_url' width='16em' onChange={(e) => { setState({ ...state, imageUrl: e.currentTarget.value }); }} />*/}
        <Den.Components.X gap='2em'>
            {!!props.isFitting && <Den.Components.VBoundary cursor='not-allowed'><Den.Components.VSvg frontColor={Den.Components.ColorType.Dark25} size={Den.Components.SizeType.Small}><TryOnSvg /></Den.Components.VSvg></Den.Components.VBoundary>}
            {!props.isFitting && <Den.Components.VSubmit caption={<Den.Components.VSvg frontColor={Den.Components.ColorType.Primary} size={Den.Components.SizeType.Small}><TryOnSvg /></Den.Components.VSvg>} />}
            {/*!!props.isFitting && <Den.Components.VSvg size={Den.Components.SizeType.Small} frontColor={Den.Components.ColorType.Primary} onClick={() => { props.close(); }}><CancelSvg /></Den.Components.VSvg>*/}
            <Den.Components.VSvg size={Den.Components.SizeType.Small} frontColor={Den.Components.ColorType.Primary} onClick={() => { props.close(); }}><CloseSvg /></Den.Components.VSvg>
        </Den.Components.X>
    </Den.Components.Y>
};

export default ImageChooser;