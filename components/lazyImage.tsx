/*
Generate a random funtion
 */
import {useRef, useEffect, useState} from "react";
import type {ImgHTMLAttributes} from "react";

type LazyImagesProsp = { src: string, }
type ImageNativeTypes = ImgHTMLAttributes<HTMLImageElement>;
type Props = LazyImagesProsp & ImageNativeTypes;
export const LazyImage = ({src, ...imgProps}: Props): JSX.Element => {
    const node = useRef<HTMLImageElement>(null);
    const [currentSrc, setCurrentSrc] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=");

    useEffect(() => {

        /*
        TODO:nuevo observador
         */
        const observe = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setCurrentSrc((src))
                }
            })
        });

        /*
        TODO:observe node
         */
        if (node.current) {
            observe.observe((node.current));
        }
        /*
        TODO: desconectarm
         */
        return () => {
            observe.disconnect();
        }

    }, [src]);
    return <img
        ref={node}
        src={currentSrc}
        {...imgProps}
    />
}