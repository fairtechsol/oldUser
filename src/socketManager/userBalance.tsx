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
  sessionNoResult: (callback: any) => {
    socket.on("sessionNoResult", callback);
  },
  sessionNoResultOff: (callback: any) => {
    socket.off("sessionNoResult", callback);
  },
  matchResultUnDeclared: (callback: any) => {
    socket.on("matchResultUnDeclare", callback);
  },
  matchDeleteBet: (callback: any) => {
    socket.on("matchDeleteBet", callback);
  },
  sessionResult: (callBack: any) => {
    socket.on("sessionResult", callBack);
  },
  sessionResultUnDeclare: (callBack: any) => {
    socket.on("sessionResultUnDeclare", callBack);
  },
  sessionDeleteBet: (callback: any) => {
    socket.on("sessionDeleteBet", callback);
  },
  updateUserBalanceOff: (callback: any) => {
    socket.off("updateUserBalance", callback);
  },
  userSessionBetPlacedOff: (callback: any) => {
    socket.off("userSessionBetPlaced", callback);
  },
  userMatchBetPlacedOff: (callback: any) => {
    socket.off("userMatchBetPlaced", callback);
  },
  matchResultDeclaredOff: (callback: any) => {
    socket.off("matchResult", callback);
  },
  matchResultUnDeclaredOff: (callback: any) => {
    socket.off("matchResultUnDeclare", callback);
  },
  matchDeleteBetOff: (callback: any) => {
    socket.off("matchDeleteBet", callback);
  },
  sessionResultOff: (callBack: any) => {
    socket.off("sessionResult", callBack);
  },
  sessionResultUnDeclareOff: (callBack: any) => {
    socket.off("sessionResultUnDeclare", callBack);
  },
  sessionDeleteBetOff: (callback: any) => {
    socket.off("sessionDeleteBet", callback);
  },
};
