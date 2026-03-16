import Text from "@/shared/components/Text"
import styles from "./NotFound.module.scss"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className={styles.notFound}>
            <Text view="title">404 - Page not found</Text>
            <Text view="p-20">Unfortunately, such a page does not exist.</Text>
            <div className={styles.actions}>
                <Link href="/" className={styles.primaryButton}>
                    <Text>Return to catalog</Text>
                </Link>
            </div>
        </div>
    )
}