import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const apiUrl = import.meta.env.VITE_API_URL;
const wsUrl = `${new URL(apiUrl).origin}/ws`;

export function createStompClient(): Client {
    return new Client({
        webSocketFactory: () => new SockJS(wsUrl),
        reconnectDelay: 5000,
    });
}
