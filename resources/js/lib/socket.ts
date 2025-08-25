import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  event: (data: { name: string; payload: unknown }) => void;
}

interface ClientToServerEvents {
  event: (data: { name: string; payload: unknown }) => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("https://websocket.inventorydata.xyz", {
  auth: {
    appId: "MISS_GLAM_APP",
  },
  autoConnect: false,
});

export default socket;
