import { ReactNode } from "react";
import Text from "@shared/components/Text";
import styles from "./InfoSection.module.scss";

interface Row {
    label: string;
    value: ReactNode;
}

interface Props {
    title: string;
    rows?: Row[];
    children?: ReactNode;
}

const InfoSection = ({ title, rows, children }: Props) => {
    return (
        <section className={styles.section}>
            <Text view="p-20" weight="bold">{title}</Text>

            {rows && (
                <dl className={styles.list}>
                    {rows.map((row) => (
                        <div key={row.label} className={styles.row}>
                            <dt>
                                <Text tag="span" view="p-16" color="secondary">{row.label}</Text>
                            </dt>
                            <dd className={styles.value}>
                                <Text tag="span" view="p-16" weight="medium">{row.value}</Text>
                            </dd>
                        </div>
                    ))}
                </dl>
            )}

            {children}
        </section>
    );
};

export default InfoSection;
