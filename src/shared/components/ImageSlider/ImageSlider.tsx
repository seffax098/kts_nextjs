import Image, { getImageProps } from "next/image";
import ArrowRight from "../icons/ArrowRight";
import styles from "./ImageSlider.module.scss";
import { useEffect, useState } from "react";

const IMAGE_SIZE = 600;
const SIZES = "(max-width: 1024px) 100vw, (max-width: 1440px) 450px, 600px";

const ImageSlider = ({ images, title }: { images: { url: string }[]; title: string }) => {
    const [current, setCurrent] = useState(0);
    const currentUrl = images[current].url;

    useEffect(() => {
        if (images.length < 2) return;

        const neighbours = new Set([
            images[(current + 1) % images.length].url,
            images[(current - 1 + images.length) % images.length].url,
        ]);

        neighbours.forEach((src) => {
            const { props } = getImageProps({ src, alt: "", width: IMAGE_SIZE, height: IMAGE_SIZE, sizes: SIZES });
            const img = new window.Image();
            if (props.sizes) img.sizes = props.sizes;
            if (props.srcSet) img.srcset = props.srcSet;
            img.src = props.src;
        });
    }, [current, images]);

    const handlePrev = () => {
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
    }
    const handleNext = () => {
        setCurrent((prev) => (prev + 1) % images.length);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.slider}>
                {images.length > 1 && <ArrowRight className={`${styles.prev} ${styles.icon}`} onClick={handlePrev} width={35} height={35} />}
                <Image
                    src={currentUrl}
                    alt={images.length > 1 ? `${title} — photo ${current + 1} of ${images.length}` : title}
                    className={styles.sliderImage}
                    width={IMAGE_SIZE}
                    height={IMAGE_SIZE}
                    preload={current === 0}
                    sizes={SIZES}
                />
                {images.length > 1 && <ArrowRight className={`${styles.next} ${styles.icon}`} onClick={handleNext} width={35} height={35} />}
            </div>
        </div>
    )
}

export default ImageSlider