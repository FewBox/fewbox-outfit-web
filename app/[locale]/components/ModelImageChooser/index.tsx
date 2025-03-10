"use client";
import { Den } from "@fewbox/den-web";
import { useState } from "react";
import { useTranslations } from "next-intl";
import ModelSvg from '@/assets/svgs/model.svg';

export interface IModelImageChooserProps {
    changeModelImage: (base64String: string) => void;
}
export interface IModelImageChooserStates {
    emptyMessage: string;
}

const truncateFilename = (filename, front, back) => {
    if (filename.length <= front + back) {
        return filename;
    }
    return `${filename.substring(0, front)}...${filename.substring(filename.length - back)}`;
}

const ModelImageChooser = (props: IModelImageChooserProps): JSX.Element => {
    const t = useTranslations('HomePage');
    const [state, setState] = useState<IModelImageChooserStates>({ emptyMessage: '' });
    return <Den.Components.Y gap='1em' cross={Den.Components.YCrossType.Center}>
        <Den.Components.VFile name='model_file' loadingSize={Den.Components.SizeType.Large} loadingColor={Den.Components.ColorType.Success} caption={<Den.Components.VLabel category={Den.Components.LabelCategory.Div}
            size={Den.Components.SizeType.Small} alignType={Den.Components.LabelAlignType.Center} caption={t('upload-model')} />}
            autoUpload={(file: File, complete) => {
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const base64String = e.target.result as string;
                        props.changeModelImage(base64String);
                        setState({ ...state, emptyMessage: truncateFilename(file.name, 6, 6) });
                        complete();
                    };
                    reader.readAsDataURL(file);
                }
            }}
            padding='1em 3em' category={Den.Components.FileCategory.Vertical} borderRadius='0.6em' borderColor={Den.Components.ColorType.Dark} borderStyle='dashed' borderWidth='1px'
            fileIcon={<Den.Components.VSvg><ModelSvg /></Den.Components.VSvg>} emptyMessage={state.emptyMessage} />
    </Den.Components.Y>
};

export default ModelImageChooser;