import { expertSocket, matchSocket } from ".";
let currSocket: any = [];

export const matchSocketService = {
  joinMatchRoom: (matchId: any, roleName: any) => {
    expertSocket?.emit("matchRoom", {
      id: matchId,
    });

    matchSocket.emit("initCricketData", {
      matchId: matchId,
      roleName: roleName,
    });
    currSocket.push(
      setInterval(() => {
        matchSocket.emit("initCricketData", {
          matchId: matchId,
          roleName: roleName,
        });
      }, 120000)
    );
  },
  leaveAllRooms: () => {
    for (let item of currSocket) {
      clearInterval(item);
    }
    currSocket = [];
    expertSocket?.emit("leaveAllRoom");
  },
  leaveMatchRoom: (matchId: any) => {
    for (let item of currSocket) {
      clearInterval(item);
    }
    currSocket = [];
    matchSocket?.emit("disconnectCricketData", {
      matchId: matchId,
    });
  },
  matchAdded: (callback: any) => {
    expertSocket?.on("addMatch", callback);
  },
  getMatchRates: (matchId: string, callback: any) => {
    matchSocket?.on(`liveData${matchId}`, callback);
  },
  matchAddedOff: () => {
    expertSocket?.off("addMatch");
  },
  getMatchRatesOff: (matchId: string) => {
    for (let item of currSocket) {
      clearInterval(item);
    }
    currSocket = [];
    matchSocket?.off(`liveData${matchId}`);
  },
};
