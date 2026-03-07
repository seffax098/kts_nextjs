"use client";

import { ReactNode, useEffect } from "react";
import '@shared/config/configureMobX'
import { RootStoreProvider, useRootStore } from "@/shared/stores/root/RootStoreProvider";
import { RootStoreInitialState } from "@/shared/stores/root/types";

function Bootstrapper({ children }: { children: ReactNode }) {
    const { authStore } = useRootStore();

    useEffect(() => {
        authStore.bootstrap();
    }, [authStore]);

    return <>{children}</>;
}

export function Providers({ children, initialState }: { children: ReactNode; initialState?: RootStoreInitialState }) {
    return (
        <RootStoreProvider initialState={initialState}>
            <Bootstrapper>{children}</Bootstrapper>
        </RootStoreProvider>
    );
}