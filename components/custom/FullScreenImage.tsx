"use client";

type FullScreenImageProps = {
    src: string;
    alt?: string;
}
export default function FullScreenImage(props: FullScreenImageProps) {

    function onImageClick() {
        window.open(props.src, "_blank");
    }

    return (
        <img src={props.src} title="Click to open" className="cursor-pointer" onClick={onImageClick} alt={props.alt} />
    )
}