import { useRootStore } from "./RootStoreProvider";

export const useAuthStore = () => {
    return useRootStore().authStore;
};

export const useCartStore = () => {
    return useRootStore().cartStore;
};