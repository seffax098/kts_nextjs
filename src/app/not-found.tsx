import Text from "@/shared/components/Text"
import Button from "@/shared/components/Button"
import styles from "./NotFound.module.scss"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className={styles.notFound}>
            <span className={styles.code}>404</span>
            <Text view="subtitle" className={styles.title}>Page not found</Text>
            <Text view="p-20" color="secondary" className={styles.text}>
                The page you are looking for doesn&apos;t exist or has been moved.
            </Text>
            <div className={styles.actions}>
                <Link href="/" className={styles.linkButton}>
                    <Button>Go to catalog</Button>
                </Link>
                <Link href="/cart" className={styles.linkButton}>
                    <Button className={styles.secondaryButton}>Open cart</Button>
                </Link>
            </div>
        </div>
    )
}
