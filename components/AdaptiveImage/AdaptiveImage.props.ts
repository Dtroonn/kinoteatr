import { ImageProps } from "next/image";

export interface IAdaptiveImageProps extends Omit<ImageProps, "layout"> {
    imageClassName?: string;
    children?: React.ReactNode;
}
