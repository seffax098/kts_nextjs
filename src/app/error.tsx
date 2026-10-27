'use client'

import { useEffect } from "react";
import styles from "./Error.module.scss";
import Button from "@/shared/components/Button";
import Text from "@/shared/components/Text";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className={styles.error}>
            <Text view="title">Something went wrong</Text>
            <Text view="p-20">We couldn&apos;t load this page. Please try again or go back to the home page.</Text>
            <div className={styles.actions}>
                <Button onClick={() => reset()}>Try again</Button>
                <Link href="/" className={styles.LinkButton}>
                    <Button>
                        Home
                    </Button>
                </Link>
            </div>
        </div>
    )
}
