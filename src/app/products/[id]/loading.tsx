import Link from "next/link";
import Back from "./components/Back";
import SkeletonCard from "./components/SkeletonCard";
import ScrollToTop from "./components/ScrollToTop";
import styles from "./ProductPage.module.scss";

export default function ProductLoading() {
    return (
        <div className={styles.productPage}>
            <ScrollToTop />
            <Link href="/" className={styles.back__link}>
                <Back />
            </Link>
            <div className={styles.product__content}>
                <SkeletonCard />
            </div>
        </div>
    );
}
