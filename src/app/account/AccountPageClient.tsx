'use client'
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import Text from "@shared/components/Text";
import Button from "@shared/components/Button";
import { useAuthStore, useCartStore } from "@/shared/stores/root/hooks";
import type { UserProfile } from "@/shared/types/user";
import { formatPrice } from "@shared/utils/formatPrice";
import InfoSection from "./components/InfoSection";
import PaymentCard from "./components/PaymentCard";
import styles from "./Account.module.scss";

interface Props {
    user: UserProfile;
}

const formatBirthDate = (value: string) => {
    const [year, month, day] = value.split("-").map(Number);

    if (!year || !month || !day) return value;

    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const AccountPageClient = ({ user }: Props) => {
    const authStore = useAuthStore();
    const cartStore = useCartStore();
    const router = useRouter();
    const [loggingOut, setLoggingOut] = useState(false);

    const fullName = `${user.firstName} ${user.lastName}`;

    const handleLogout = async () => {
        setLoggingOut(true);

        try {
            await authStore.logout();
            cartStore.load();
            router.replace("/authorization");
        } finally {
            setLoggingOut(false);
        }
    };

    return (
        <div className={styles.account}>
            <section className={styles.profile}>
                <Image
                    src={user.image}
                    alt={fullName}
                    width={128}
                    height={128}
                    className={styles.avatar}
                    preload
                />

                <div className={styles.profile__info}>
                    <Text view="title" className={styles.profile__name}>{fullName}</Text>
                    <div className={styles.profile__meta}>
                        <Text view="p-18" color="secondary">@{user.username}</Text>
                        <span className={styles.role}>{user.role}</span>
                    </div>
                    <Text view="p-18" color="secondary" className={styles.profile__email}>{user.email}</Text>
                </div>

                <div className={styles.profile__actions}>
                    <Link href="/cart" className={styles.linkButton}>
                        <Button className={styles.actionButton}>
                            {`Cart · ${cartStore.totalQuantity} ${cartStore.totalQuantity === 1 ? "item" : "items"}`}
                        </Button>
                    </Link>
                    <Button
                        className={`${styles.actionButton} ${styles.logout}`}
                        onClick={handleLogout}
                        loading={loggingOut}
                    >
                        Log out
                    </Button>
                </div>
            </section>

            <div className={styles.grid}>
                <InfoSection
                    title="Personal info"
                    rows={[
                        { label: "Full name", value: `${user.firstName} ${user.maidenName} ${user.lastName}` },
                        { label: "Birth date", value: formatBirthDate(user.birthDate) },
                        { label: "Age", value: user.age },
                        { label: "Gender", value: capitalize(user.gender) },
                        { label: "Phone", value: user.phone },
                        { label: "Email", value: user.email },
                    ]}
                />

                <InfoSection
                    title="Shipping address"
                    rows={[
                        { label: "Street", value: user.address.address },
                        { label: "City", value: user.address.city },
                        { label: "State", value: `${user.address.state} (${user.address.stateCode})` },
                        { label: "Postal code", value: user.address.postalCode },
                        { label: "Country", value: user.address.country },
                    ]}
                />

                <InfoSection
                    title="Work & education"
                    rows={[
                        { label: "Company", value: user.company.name },
                        { label: "Position", value: user.company.title },
                        { label: "Department", value: user.company.department },
                        { label: "University", value: user.university },
                    ]}
                />

                <InfoSection title="Payment method">
                    <PaymentCard
                        type={user.card.type}
                        last4={user.card.last4}
                        expires={user.card.expires}
                        holder={fullName}
                    />
                    {!cartStore.isEmpty && (
                        <Text view="p-16" color="secondary">
                            {`Your cart total: $${formatPrice(cartStore.totalPrice)}`}
                        </Text>
                    )}
                </InfoSection>
            </div>
        </div>
    );
};

export default observer(AccountPageClient);
