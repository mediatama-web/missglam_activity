import { useSocketContext } from "@/components/socket";

type EventCallback = (payload: unknown) => void;

export const useSocket = () => {
  const socket = useSocketContext();

  const emitEvent = (name: string, payload: unknown) => {
    socket.emit("event", { name, payload });
  };

  const listenEvent = (eventName: string, callback: EventCallback) => {
    const handler = (data: { name: string; payload: unknown }) => {
      if (data.name === eventName) {
        callback(data.payload);
      }
    };

    socket.on("event", handler);

    return () => {
      socket.off("event", handler);
    };
  };

  return { emitEvent, listenEvent };
};