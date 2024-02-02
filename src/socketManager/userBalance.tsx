import { socket } from ".";

export const userBalanceSocketService = {
  updateUserBalance: (callback: any) => {
    socket.on("updateUserBalance", callback);
  },
  userSessionBetPlaced: (callback: any) => {
    socket.on("userSessionBetPlaced", callback);
  },
  userMatchBetPlaced: (callback: any) => {
    socket.on("userMatchBetPlaced", callback);
  },
  matchResultDeclared: (callback: any) => {
    socket.on("matchResult", callback);
  },
  matchResultUnDeclared: (callback: any) => {
    socket.on("matchResultUnDeclare", callback);
  },
  matchDeleteBet: (callback: any) => {
    socket.on("matchDeleteBet", callback);
  },
  sessionDeleteBet: (callback: any) => {
    socket.on("sessionDeleteBet", callback);
  },
};
