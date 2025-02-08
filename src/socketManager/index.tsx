import io from "socket.io-client";
import { Constants, baseUrls } from "../utils/Constants";
import { authSocketService } from "./authSocket";
import { matchSocketService } from "./matchSocket";
import { userBalanceSocketService } from "./userBalance";

export let socket: any = null;
export let expertSocket: any = null;
export let matchSocket: any = null;

export const initialiseSocket = () => {
  socket = io(baseUrls.socket, {
    transports: [`${Constants.WEBSOCKET}`,`${Constants.POLLING}`],
    auth: {
      token: `${sessionStorage.getItem("jwtUser")}`,
    },
  });
  expertSocket = io(baseUrls.expertSocket, {
    transports: [`${Constants.WEBSOCKET}`,`${Constants.POLLING}`],
    auth: {
      token: `${sessionStorage.getItem("jwtUser")}`,
    },
  });
  matchSocket = io(baseUrls.matchSocket, {
    transports: [
      // process.env.NODE_ENV === "production"
      //   ? `${Constants.POLLING}`
      //   :
         `${Constants.WEBSOCKET}`,`${Constants.POLLING}`
    ],
  });
};

export const socketService = {
  connect: () => {
    initialiseSocket();
    // Connect to the socket server
    socket?.connect();
    expertSocket?.connect();
    matchSocket?.connect();
  },
  disconnect: () => {
    // Disconnect from the socket server
    socket?.disconnect();
    expertSocket?.disconnect();
    matchSocket?.disconnect();
  },
  auth: { ...authSocketService },
  userBalance: { ...userBalanceSocketService },
  // Add other socket-related methods as needed
};

export const expertSocketService = {
  match: { ...matchSocketService },
};
