import type { ConversationSummary, ProfileBrief } from "@/shared/types";

export default function otherParticipant(conversation: ConversationSummary, currentUserId?: string): ProfileBrief | undefined {
    const participants = conversation.participants ?? [];
    return participants.find((p) => p.userId !== currentUserId) ?? participants[0];
}
