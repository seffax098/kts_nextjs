"use client";

import React, { useState } from "react";
import { RootStore } from "./RootStore";
import { useStrictContext } from "@/shared/utils/useStrictContext";
import { RootStoreInitialState } from "./types";

type RootStoreContextValue = RootStore;

type RootStoreProviderProps = {
    children: React.ReactNode;
    initialState?: RootStoreInitialState;
};

const RootStoreContext = React.createContext<RootStoreContextValue | null>(null);

export const RootStoreProvider: React.FC<RootStoreProviderProps> = ({ children, initialState }) => {
    const [store] = useState(() => new RootStore(initialState));


    return (
        <RootStoreContext.Provider value={store} >
            {children}
        </RootStoreContext.Provider>
    );
};

export const useRootStore = () => {
    return useStrictContext({
        context: RootStoreContext,
        message: "RootStoreContext was not provided",
    });
};