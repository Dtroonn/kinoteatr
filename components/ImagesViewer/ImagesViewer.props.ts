export interface ImagesViewerProps {
    startIdx?: number;
    open: boolean;
    onClose: () => void;
    items: { src: string; type?: "image" | "youtube-video" }[];
}
