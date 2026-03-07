'use client'

import styles from "./Error.module.scss";
import Button from "@/shared/components/Button";
import Text from "@/shared/components/Text";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className={styles.error}>
            <Text view="title">Произошла ошибка!</Text>
            <Text view="p-20">{error.message}</Text>
            <div className={styles.actions}>
                <Button onClick={() => reset()}>Попробовать снова</Button>
                <Link href="/" className={styles.LinkButton}>
                    <Button>
                        На главную
                    </Button>
                </Link>
            </div>
        </div>
    )
}