import io from "socket.io-client";
import { authSocketService } from "./authSocket";
import { matchSocketService } from "./matchSocket";
import { userBalanceSocketService } from "./userBalance";
import { baseUrls } from "../utils/Constants";

export let socket: any = null;
export let expertSocket: any = null;
export let matchSocket: any = null;

export const initialiseSocket = () => {
  socket = io(baseUrls.socket, {
    transports: ["websocket"],
    auth: {
      token: `${sessionStorage.getItem("userToken")}`,
    },
  });
  expertSocket = io(baseUrls.expertSocket, {
    transports: ["websocket"],
    auth: {
      token: `${sessionStorage.getItem("userToken")}`,
    },
  });
  matchSocket = io(baseUrls.matchSocket, {
    transports: ["websocket"],
  });
};

export const socketService = {
  connect: () => {
    initialiseSocket();
    // Connect to the socket server
    socket.connect();
    expertSocket.connect();
    matchSocket.connect();
  },
  disconnect: () => {
    // Disconnect from the socket server
    socket.disconnect();
    expertSocket.disconnect();
    matchSocket.disconnect();
  },
  auth: { ...authSocketService },
  userBalance: { ...userBalanceSocketService },
  // Add other socket-related methods as needed
};

export const expertSocketService = {
  match: { ...matchSocketService },
};
