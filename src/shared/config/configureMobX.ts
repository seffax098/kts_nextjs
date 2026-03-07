import { configure } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";

export const isServer = typeof window === "undefined";

enableStaticRendering(isServer);

configure({
    useProxies: "ifavailable",
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
});