"use client";
import { Den } from "@fewbox/den-web";
import { Den as DenAppend } from "@fewbox/den-web-append";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import MaskImage from "../MaskImage";
import ChalkSvg from '@/assets/svgs/chalk.svg';
import EraserSvg from '@/assets/svgs/eraser.svg';
import WomenSvg from '@/assets/svgs/women.svg';
import MenSvg from '@/assets/svgs/men.svg';
import KidsSvg from '@/assets/svgs/kids.svg';
import GarmentSvg from '@/assets/svgs/garment.svg';
import SelfSvg from '@/assets/svgs/self.svg';
import DonateSvg from '@/assets/svgs/donate.svg';
import './index.scss';
import ImageChooser from "../ImageChooser";
import { Tryon } from "../../reducers/StateTypes";
import { getStorage } from "../../storage";
import StorageKeys from "../../storage/StorageKeys";

const enum MeasurementType {
    Chalk = 'chalk',
    Eraser = 'eraser'
}

export enum ModelType {
    Women,
    Men,
    Kids
}

export interface IOutfitProps {
    modelImageUrl: string;
    isFitting: boolean;
    changeModelImage: (modelImageUrl: string) => void;
    tryon: (tryon: Tryon) => void;
    startFitting: () => void;
    completeFitting: () => void;
}

export interface IOutfitStates {
    zoom: number;
    measurementType: MeasurementType;
    modelType: ModelType;
    isPurchaseShow: boolean;
    isMirrorShow: boolean;
}

const getFileExtension = (filename) => {
    return filename.split('.').pop();
};

const buildUploadImageVerbsPromise = (file: File, filename?: string): Promise<Response> => {
    const operationName = 'UploadImage';
    const query = `mutation UploadImage($input: UploadRequest!) {
                uploadImage(input: $input) {
                  isSuccessful
                  payload {
                    mimetype
                    name
                    encoding
                  }
                }
              }`;
    const variables = {
        input: null
    };
    const formData = new FormData();
    formData.append('operations', JSON.stringify({ operationName, query, variables }));
    formData.append('map', JSON.stringify({ '0': ['variables.input'] }));
    if (filename) {
        formData.append('0', file, filename);
    }
    else {
        formData.append('0', file);
    }
    return DenAppend.Network.verbsPostPromise('graphql', {}, formData);
};

const buildUploadOnlineImageVerbsPromise = (url: string, name: string): Promise<Response> => {
    const operationName = 'UploadOnlineImage';
    const query = `mutation UploadOnlineImage($input: UploadOnlineRequest!) {
        uploadOnlineImage(input: $input) {
          errorCode
          errorMessage
          isSuccessful
          payload {
            name
            subfolder
            type
          }
        }
      }`;
    const variables = {
        input: {
            url,
            name
        }
    };
    const graphql = {
        operationName,
        query,
        variables
    };
    return DenAppend.Network.verbsPostPromise('graphql', { 'content-type': 'application/json' }, JSON.stringify(graphql));
};

const buildUploadMaskVerbsPromise = (file: File, name?: string): Promise<Response> => {
    const operationName = 'UploadMask';
    const query = `mutation UploadMask($input: UploadRequest!) {
        uploadMask(input: $input) {
          isSuccessful
          payload {
            encoding
            name
            mimetype
          }
        }
      }`;
    const variables = {
        input: null
    };
    const formData = new FormData();
    formData.append('operations', JSON.stringify({ operationName, query, variables }));
    formData.append('map', JSON.stringify({ '0': ['variables.input'] }));
    if (name) {
        formData.append('0', file, `${name}.${getFileExtension(file.name)}`);
    }
    else {
        formData.append('0', file);
    }
    return DenAppend.Network.verbsPostPromise('graphql', {}, formData);
};

const Outfit = (props: IOutfitProps): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const saveMaskImage = () => {
        const canvas = canvasRef.current;
        const link = document.createElement("a");
        link.download = "mask.png";
        link.href = canvas.toDataURL();
        link.click();
    };
    const t = useTranslations('HomePage');
    const [state, setState] = useState<IOutfitStates>({ zoom: 1, measurementType: MeasurementType.Chalk, modelType: ModelType.Women, isPurchaseShow: false, isMirrorShow: false });
    useEffect(() => {
    }, []);
    const toolWidth = '12em';
    const toolHeight = '18em';
    const handleSubmit = (data) => {
        if (data.garment_file && (data.model_file || data.model_url)) {
            canvasRef.current.toBlob((modelGarmentBlob) => {
                const clientId = getStorage(StorageKeys.CLIENT_ID);
                // Garment
                const garmentName = `${clientId}_garment`;
                const garmentFileName = `${garmentName}.${getFileExtension(data.garment_file.name)}`;
                const garmentPromise = buildUploadImageVerbsPromise(data.garment_file, garmentFileName);
                // Model Garment
                const modelGarmentName = `${clientId}_model_garment`;
                const modelGarmentFileName = `${modelGarmentName}.png`;
                const modelGarmentFile = new File([modelGarmentBlob], modelGarmentFileName, { type: 'image/png' });
                const modelGarmentPromise = buildUploadMaskVerbsPromise(modelGarmentFile);
                // Model
                var modelPromise: Promise<Response>;
                const modelName = `${clientId}_model`;
                var modelFileName: string;
                if (data.model_file) {
                    modelFileName = `${modelName}.${getFileExtension(data.model_file.name)}`;
                    modelPromise = buildUploadImageVerbsPromise(data.model_file, modelFileName);
                }
                else {
                    modelFileName = `${modelName}.${getFileExtension(data.model_url)}`;
                    modelPromise = buildUploadOnlineImageVerbsPromise(data.model_url, modelFileName);
                }
                Promise.all([garmentPromise, modelPromise, modelGarmentPromise])
                    .then((responses) => {
                        if (responses[0].status == 200 && responses[0].status == 200 && responses[0].status == 200) {
                            const tryon: Tryon = {
                                clientId,
                                garment: garmentFileName,
                                model: modelFileName,
                                modelGarment: modelGarmentFileName,
                                scale: 1
                            };
                            props.tryon(tryon);
                        }
                        else {
                            props.completeFitting();
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
        }
        else {
            // Todo:
        }
        //&&canvasRef.current
        //console.log(data);
        return;
        /*props.startFitting();
        const clientId = getStorage(StorageKeys.CLIENT_ID);
        const garmentName = `${clientId}_garment`;
        const modelName = `${clientId}_model`;
        const modelGarmentName = `${clientId}_model_garment`;
        canvasRef.current.toBlob((modelGarmentBlob) => {
            const modelGarmentFileName = `${modelGarmentName}.png`;
            const modelGarmentFile = new File([modelGarmentBlob], modelGarmentFileName, { type: 'image/png' });
            buildDownloadVerbsPromise(props.modelImageUrl)
                .then(async (response) => {
                    const modelBlob = await response.blob();
                    const modelFileName = `${modelName}.${getFileExtension(props.modelImageUrl)}`;
                    const modelFile = new File([modelBlob], modelFileName);
                    const garmentFileName = `${garmentName}.${getFileExtension(data.garment_file.name)}`;
                    const garmentPromise = buildUploadImageVerbsPromise(data.garment_file, garmentFileName);
                    const modelPromise = buildUploadImageVerbsPromise(modelFile);
                    const modelGarmentPromise = buildUploadMaskVerbsPromise(modelGarmentFile);
                    Promise.all([garmentPromise, modelPromise, modelGarmentPromise])
                        .then((responses) => {
                            if (responses[0].status == 200 && responses[0].status == 200 && responses[0].status == 200) {
                                const tryon: Tryon = {
                                    clientId,
                                    garment: garmentFileName,
                                    model: modelFileName,
                                    modelGarment: modelGarmentFileName,
                                    scale: 1
                                };
                                props.tryon(tryon);
                            }
                            else {
                                props.completeFitting();
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                })
                .catch(()=>{
                    props.completeFitting();
                });
        });*/
    }
    return <Den.Components.VForm handleSubmit={handleSubmit}>
        <Den.Components.Y gap='3em'>
            <Den.Components.X gap='0.6em'>
                <Den.Components.YTop width={toolWidth} height={toolHeight} gap='1em' cross={Den.Components.YCrossType.Center}>
                    <Den.Components.VLabel size={Den.Components.SizeType.Normal} weight={Den.Components.FontWeightType.Thin} frontColor={Den.Components.ColorType.Black} caption={t('model')} />
                    <Den.Components.VSvg onClick={() => { setState({ ...state, modelType: ModelType.Women }); props.changeModelImage('https://img.ltwebstatic.com/images3_pi/2025/01/03/7c/1735896447c6ae06db2def0b14704e23fba94b84b4.webp'); }} frontColor={state.modelType == ModelType.Women ? Den.Components.ColorType.Primary : Den.Components.ColorType.Dark25}><WomenSvg /></Den.Components.VSvg>
                    <Den.Components.VSvg onClick={() => { setState({ ...state, modelType: ModelType.Men }); props.changeModelImage('https://img.ltwebstatic.com/images3_pi/2024/03/20/0b/171092569796387212e2fe7c56b3d94ca52aad570f.webp'); }} frontColor={state.modelType == ModelType.Men ? Den.Components.ColorType.Primary : Den.Components.ColorType.Dark25}><MenSvg /></Den.Components.VSvg>
                    <Den.Components.VSvg onClick={() => { setState({ ...state, modelType: ModelType.Kids }); props.changeModelImage('https://img.ltwebstatic.com/images3_pi/2024/08/14/78/17236281132c880b2d4c74b3c762b052553af8e8db.webp'); }} frontColor={state.modelType == ModelType.Kids ? Den.Components.ColorType.Primary : Den.Components.ColorType.Dark25}><KidsSvg /></Den.Components.VSvg>
                </Den.Components.YTop>
                <Den.Components.Y gap='0.6em'>
                    <Den.Components.XRight gap='0.6em'>
                        {/*<Den.Components.VLabel padding='0.2em 0.6em' borderRadius='2em' cursor='pointer' backgroundColor={Den.Components.ColorType.Primary} frontColor={Den.Components.ColorType.White} size={Den.Components.SizeType.Large} caption={'export'} onClick={() => { saveMaskImage(); }} />*/}
                    </Den.Components.XRight>
                    <MaskImage ref={canvasRef} imageUrl={props.modelImageUrl} zoom={state.zoom} isRevert={state.measurementType == MeasurementType.Eraser} />
                </Den.Components.Y>
                {!!state.isMirrorShow && <ImageChooser isFitting={props.isFitting} close={() => { setState({ ...state, isMirrorShow: false }); }} />}
                <Den.Components.YTop width={toolWidth} height={toolHeight} gap='1em' cross={Den.Components.YCrossType.Center}>
                    <Den.Components.VLabel size={Den.Components.SizeType.Normal} weight={Den.Components.FontWeightType.Thin} frontColor={Den.Components.ColorType.Black} caption={t('measurement')} />
                    <Den.Components.Y cross={Den.Components.YCrossType.Center}>
                        <Den.Components.X gap='1em'>
                            <Den.Components.VSvg frontColor={state.measurementType == MeasurementType.Chalk ? Den.Components.ColorType.Primary : Den.Components.ColorType.Dark25} onClick={() => { setState({ ...state, measurementType: MeasurementType.Chalk }); }}><ChalkSvg /></Den.Components.VSvg>
                            <Den.Components.VSvg frontColor={state.measurementType == MeasurementType.Eraser ? Den.Components.ColorType.Primary : Den.Components.ColorType.Dark25} onClick={() => { setState({ ...state, measurementType: MeasurementType.Eraser }); }}><EraserSvg /></Den.Components.VSvg>
                        </Den.Components.X>
                        <Den.Components.VRange className='tape' isValueShow backgroundColor={Den.Components.ColorType.Transparent} min={1} max={4} onChange={(e) => { setState({ ...state, zoom: e.target.value }) }} value={1}
                            controlBackgroundColor={Den.Components.ColorType.Placeholder} controlBorderColor={Den.Components.ColorType.Black} valueSize={Den.Components.SizeType.Small} />
                    </Den.Components.Y>
                </Den.Components.YTop>
            </Den.Components.X>
            <Den.Components.XBetween padding='0 0 3em 0'>
                <Den.Components.VBoundary></Den.Components.VBoundary>
                <Den.Components.XCenter onClick={() => { setState({ ...state, isMirrorShow: true }); }} padding='0.6em 3em' gap='0.2em' borderRadius='6em' backgroundColor={Den.Components.ColorType.Primary}>
                    <Den.Components.VSvg><GarmentSvg /></Den.Components.VSvg>
                    <Den.Components.VLabel caption={t('garment')} />
                </Den.Components.XCenter>
                <Den.Components.VBoundary>
                    <Den.Components.Dock category={Den.Components.DockCategory.Left} renderOverlay={() => {
                        if (state.isPurchaseShow) {
                            return <Den.Components.X style={{ top: 0 }} gap='1em'>
                                <Den.Components.X className='tooltip' zIndex={9999999} width='16em' padding='1em' gap='0.6em' borderRadius='0.2em' backgroundColor={Den.Components.ColorType.White}>
                                    <Den.Components.VSvg size={Den.Components.SizeType.Large}><DonateSvg /></Den.Components.VSvg>
                                    <Den.Components.VLabel frontColor={Den.Components.ColorType.Dark} caption={t('purchase')} />
                                </Den.Components.X>
                                <Den.Components.VLabel className='arraw' backgroundColor={Den.Components.ColorType.White} category={Den.Components.LabelCategory.I} caption='' />
                            </Den.Components.X>;
                        }
                        else {
                            return <></>;
                        }
                    }}>
                        <Den.Components.VHyperlink category={Den.Components.HyperlinkCategory.NewWindow} to='https://www.paypal.com/paypalme/fewbox/2'>
                            <Den.Components.VSvg frontColor={Den.Components.ColorType.Primary} onClick={() => { }} onMouseEnter={() => { setState({ ...state, isPurchaseShow: true }); }} onMouseLeave={() => { setState({ ...state, isPurchaseShow: false }); }}><SelfSvg /></Den.Components.VSvg>
                        </Den.Components.VHyperlink>
                    </Den.Components.Dock>
                </Den.Components.VBoundary>
            </Den.Components.XBetween>
        </Den.Components.Y>
    </Den.Components.VForm>;
};

export default Outfit;