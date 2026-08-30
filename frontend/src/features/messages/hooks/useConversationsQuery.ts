import { useQuery } from "@tanstack/react-query";
import conversationService from "@/features/messages/services/conversation.service.ts";
import type { ConversationSummary } from "@/shared/types";

export type ConversationItem = {
    conversation: ConversationSummary;
    unreadCount: number;
};

export default function useConversationsQuery() {

    const query = useQuery({
        queryKey: ["conversations"],
        queryFn: async (): Promise<ConversationItem[]> => {
            const conversations = await conversationService.getMyConversations();
            const unreadCounts = await Promise.all(
                conversations.map((c) => conversationService.getUnreadCount(c.conversationId ?? "")),
            );
            return conversations.map((conversation, i) => ({
                conversation,
                unreadCount: unreadCounts[i],
            }));
        },
    });

    const items = query.data ?? [];
    const totalUnread = items.reduce((sum, item) => sum + item.unreadCount, 0);

    return {
        items,
        totalUnread,
        isLoading: query.isLoading,
        isError: query.isError,
    };
}
