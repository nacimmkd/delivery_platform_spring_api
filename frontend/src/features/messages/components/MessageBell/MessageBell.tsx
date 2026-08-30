import { useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import styles from "./MessageBell.module.css";
import Menu from "@/shared/components/menu/Menu.tsx";
import MenuItem from "@/shared/components/menu/MenuItem.tsx";
import Text from "@/shared/components/text/Text.tsx";
import Spinner from "@/shared/components/spinner/Spinner.tsx";
import Icon from "@/shared/components/icon/Icon.tsx";
import useClickOutside from "@/shared/hooks/useClickOutside.ts";
import useConversationsQuery from "@/features/messages/hooks/useConversationsQuery.ts";
import otherParticipant from "@/features/messages/utils/otherParticipant.ts";
import authStore from "@/features/auth/store/auth.store.ts";

export default function MessageBell() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const currentUserId = authStore((s) => s.user?.userId);
    const { items, totalUnread, isLoading } = useConversationsQuery();

    useClickOutside(containerRef, () => setIsOpen(false));

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.trigger} onClick={() => setIsOpen((v) => !v)}>
                <MessageCircle size={24} color="white" />
                {totalUnread > 0 && <span className={styles.badge}>{totalUnread > 9 ? "9+" : totalUnread}</span>}
            </div>

            <Menu isOpen={isOpen} className={styles.dropdown}>
                <Text tag="h4" weight="semibold" className={styles.title}>Messages</Text>

                {isLoading && (
                    <div className={styles.state}>
                        <Spinner />
                    </div>
                )}

                {!isLoading && items.length === 0 && (
                    <Text tag="p" muted size={0.85} className={styles.state}>Aucune conversation.</Text>
                )}

                {!isLoading && items.map(({ conversation, unreadCount }) => {
                    const user = otherParticipant(conversation, currentUserId);
                    const name = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Utilisateur";
                    const preview = conversation.lastMessage?.content;

                    return (
                        <MenuItem
                            key={conversation.conversationId}
                            label={preview ? `${name} — ${preview}` : name}
                            icon={<Icon src={user?.avatarUrl ?? "/avatar.png"} size={28} label={name} />}
                            trailing={unreadCount > 0 ? <span className={styles.dot} /> : undefined}
                            onClick={() => setIsOpen(false)}
                        />
                    );
                })}
            </Menu>
        </div>
    );
}
