import { expertSocket, matchSocket } from ".";

export const matchSocketService = {
  joinMatchRoom: (matchId: any, roleName: any) => {
    expertSocket.emit("matchRoom", {
      id: matchId,
    });

    matchSocket.emit("initCricketData", {
      matchId: matchId,
      roleName: roleName,
    });
  },
  leaveAllRooms: () => {
    expertSocket.emit("leaveAll");
  },
  leaveMatchRoom: (matchId: any) => {
    matchSocket.emit("disconnectCricketData", {
      matchId: matchId,
    });
  },
  matchAdded: (callback: any) => {
    expertSocket.on("addMatch", callback);
  },
  getMatchRates: (matchId: string, callback: any) => {
    matchSocket.on(`liveData${matchId}`, callback);
  },
};
