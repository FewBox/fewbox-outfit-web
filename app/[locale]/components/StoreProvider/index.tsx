'use client';
import { Provider } from 'react-redux';
import store from "../../store";

export interface IStoreProviderProps {
    children: React.ReactNode;
}

export default function StoreProvider(props: IStoreProviderProps) {
    return <Provider store={store}>{props.children}</Provider>;
}