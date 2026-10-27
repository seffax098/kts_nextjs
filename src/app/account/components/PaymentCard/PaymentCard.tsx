import styles from "./PaymentCard.module.scss";

interface Props {
    type: string;
    last4: string;
    expires: string;
    holder: string;
}

const PaymentCard = ({ type, last4, expires, holder }: Props) => {
    return (
        <div className={styles.card}>
            <div className={styles.top}>
                <span className={styles.chip} />
                <span className={styles.type}>{type}</span>
            </div>

            <div className={styles.number}>
                <span>••••</span>
                <span>••••</span>
                <span>••••</span>
                <span>{last4}</span>
            </div>

            <div className={styles.bottom}>
                <div className={styles.field}>
                    <span className={styles.label}>Card holder</span>
                    <span className={styles.holder}>{holder}</span>
                </div>
                <div className={styles.field}>
                    <span className={styles.label}>Expires</span>
                    <span>{expires}</span>
                </div>
            </div>
        </div>
    );
};

export default PaymentCard;
