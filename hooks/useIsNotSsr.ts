import React from "react";

export const useIsNotSsr = (): boolean => {
    const [isNotSsr, setIsNotSsr] = React.useState<boolean>(false);

    React.useEffect(() => {
        setIsNotSsr(true);
    }, []);

    return isNotSsr;
};
