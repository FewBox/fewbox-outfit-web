import { Den } from '@fewbox/den-web';
import { Suspense } from 'react';
import Loading from '../../loading';
import { useTranslations } from 'next-intl';

export interface IMainProps {
    children: React.ReactNode;
}

export default function Main(props: IMainProps) {
    const t = useTranslations('MasterPage');
    return <Den.Components.VMain>
        <Den.Components.VBoundary>
            <Suspense fallback={<Loading />}>
                {props.children}
            </Suspense>
        </Den.Components.VBoundary>
    </Den.Components.VMain>;
}