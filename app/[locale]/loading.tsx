import { Den } from '@fewbox/den-web';
import LoaderSvg from '@/assets/svgs/loader.svg';

export default function Loading() {
    return <Den.Components.Y width='100vw' cross={Den.Components.YCrossType.Center}>
        <Den.Components.VSvg><LoaderSvg /></Den.Components.VSvg>
    </Den.Components.Y>;
}