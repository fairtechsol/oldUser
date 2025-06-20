import { socket } from ".";

export const userBalanceSocketService = {
  updateUserBalance: (callback: any) => {
    socket?.on("updateUserBalance", callback);
  },
  userSessionBetPlaced: (callback: any) => {
    socket?.on("userSessionBetPlaced", callback);
  },
  userMatchBetPlaced: (callback: any) => {
    socket?.on("userMatchBetPlaced", callback);
  },
  matchResultDeclared: (callback: any) => {
    socket?.on("matchResult", callback);
  },
  sessionNoResult: (callback: any) => {
    socket?.on("sessionNoResult", callback);
  },
  matchResultUnDeclared: (callback: any) => {
    socket?.on("matchResultUnDeclare", callback);
  },
  declaredMatchResultAllUser: (callback: any) => {
    socket?.on("matchResultDeclareAllUser", callback);
  },
  unDeclaredMatchResultAllUser: (callback: any) => {
    socket?.on("matchResultUnDeclareAllUser", callback);
  },
  matchDeleteBet: (callback: any) => {
    socket?.on("matchDeleteBet", callback);
  },
  sessionResult: (callBack: any) => {
    socket?.on("sessionResult", callBack);
  },
  sessionResultUnDeclare: (callBack: any) => {
    socket?.on("sessionResultUnDeclare", callBack);
  },
  sessionDeleteBet: (callback: any) => {
    socket?.on("sessionDeleteBet", callback);
  },
  updateDeleteReason: (callback: any) => {
    socket?.on("updateDeleteReason", callback);
  },
  updateUserBalanceOff: () => {
    socket?.off("updateUserBalance");
  },
  userSessionBetPlacedOff: () => {
    socket?.off("userSessionBetPlaced");
  },
  userMatchBetPlacedOff: () => {
    socket?.off("userMatchBetPlaced");
  },
  matchResultDeclaredOff: () => {
    socket?.off("matchResult");
  },
  matchResultUnDeclaredOff: () => {
    socket?.off("matchResultUnDeclare");
  },
  declaredMatchResultAllUserOff: () => {
    socket?.off("matchResultDeclareAllUser");
  },
  unDeclaredMatchResultAllUserOff: () => {
    socket?.off("matchResultUnDeclareAllUser");
  },
  matchDeleteBetOff: () => {
    socket?.off("matchDeleteBet");
  },
  sessionResultOff: () => {
    socket?.off("sessionResult");
  },
  sessionResultUnDeclareOff: () => {
    socket?.off("sessionResultUnDeclare");
  },
  sessionDeleteBetOff: () => {
    socket?.off("sessionDeleteBet");
  },
  sessionNoResultOff: () => {
    socket?.off("sessionNoResult");
  },
  updateDeleteReasonOff: () => {
    socket?.off("updateDeleteReason");
  },
};
