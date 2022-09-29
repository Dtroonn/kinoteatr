import React from "react";

export const useDidUpdateEffect = (
    effect: React.EffectCallback,
    deps?: React.DependencyList | undefined,
): void => {
    const isMountedRef = React.useRef<boolean>(false);
    React.useEffect(() => {
        if (!isMountedRef.current) {
            isMountedRef.current = true;
            return;
        }

        return effect();
    }, deps);
};
