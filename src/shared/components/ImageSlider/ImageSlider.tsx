import Image from "next/image";
import ArrowRight from "../icons/ArrowRight";
import styles from "./ImageSlider.module.scss";
import { useEffect, useState } from "react";

const ImageSlider = ({ images }: { images: { url: string }[] }) => {
    const [current, setCurrent] = useState(0);
    const currentUrl = images[current].url;

    const handlePrev = () => {
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
    }
    const handleNext = () => {
        setCurrent((prev) => (prev + 1) % images.length);
    }

    return (
        <div className={styles.imageSlider}>
            <div className={styles.slider}>
                <ArrowRight className={`${styles.prev} ${styles.icon}`} onClick={handlePrev} width={35} height={35} />
                <Image
                    key={currentUrl}
                    src={currentUrl}
                    alt={`Product image`}
                    className={styles.sliderImage}
                    width={600}
                    height={600}
                />
                <ArrowRight className={`${styles.next} ${styles.icon}`} onClick={handleNext} width={35} height={35} />
            </div>
        </div>
    )
}

export default ImageSlider