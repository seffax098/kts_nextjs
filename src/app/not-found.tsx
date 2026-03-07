import Text from "@/shared/components/Text"
import styles from "./NotFound.module.scss"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className={styles.notFound}>
            <Text view="title">404 - Страница не найдена</Text>
            <Text view="p-20">К сожалению, такой страницы не существует.</Text>
            <div className={styles.actions}>
                <Link href="/" className={styles.primaryButton}>
                    <Text>Вернуться в каталог</Text>
                </Link>
            </div>
        </div>
    )
}