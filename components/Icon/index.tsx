import React from "react";
import clsx from "clsx";

import { IconProps } from "./Icon.props";

export const Icon: React.FC<IconProps> = ({ icon, className, color='black' }) => {
    return <span className={clsx(`icon-${icon}`, className)}></span>;
};
