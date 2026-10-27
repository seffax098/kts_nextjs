import { useEffect, useRef, useState } from "react";

export const useInView = <T extends Element>(rootMargin: string, enabled = true) => {
    const ref = useRef<T>(null);
    const [inView, setInView] = useState(!enabled);

    useEffect(() => {
        const el = ref.current;

        if (!enabled || inView || !el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, [enabled, inView, rootMargin]);

    return [ref, inView] as const;
};
