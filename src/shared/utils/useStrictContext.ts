import { useContext, type Context } from "react";

type UseStrictContextParams<T> = {
    context: Context<T | null>;
    message?: string;
};

export function useStrictContext<T>({
    context,
    message = "useStrictContext missing provider",
}: UseStrictContextParams<T>): T {
    const value = useContext(context);

    if (value === null) {
        throw new Error(message);
    }

    return value;
}