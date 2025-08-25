import socket from "@/lib/socket";
import React, { createContext, useContext, useEffect } from "react";

const SocketContext = createContext(socket);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocketContext = () => useContext(SocketContext);
