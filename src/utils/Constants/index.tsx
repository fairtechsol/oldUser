export const ApiConstants = {
  LiveCasinoGame: "/mac88/casino/list",
  LiveCasinoGameLogin: "/mac88/casino/login",
  LiveCasinoGameProvider: "/mac88/providers",
  LiveCasinoGameBets: "/mac88/bets",
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    CHANGEPASSWORD: "user/changePassword",
    OLD_PASSWORD: "/user/check/oldPassword",
  },
  MATCH: {
    RATES: "/getUserRateDetails/",
    MATCHLIST: "/match/list",
    SEARCHLIST: "/user/searchlist",
    MATCHDETAILS: "/match/",
    CURRENTBET: "/bet",
    MARKET_MATCH_LIST_CRICKET:
      "https://marketsarket.qnsports.live/getcricketmatches",
    MARKET_MATCH_LIST_FOOTBALL:
      "https://marketsarket.qnsports.live/getsoccerallmatches2",
    MARKET_MATCH_LIST_TENNIS:
      "https://marketsarket.qnsports.live/gettennisallmatches2",
  },
  USER: {
    MARQUEE: "/expert/notification",
    SET_BTN_VALUE: "/button/insert",
    GET_BTN_VALUE: "/button",
    GET_PROFILE: "/user/profile",
    ACCOUNT_STATEMENT: "/transaction/get/",
    LIST: "/user/list",
    MATCH_WISE_PROFITLOSS: "user/total/matchWise/profitLoss",
    TOTAL_PROFITLOSS: "user/totalProfitLoss",
    TOTAL_BET_PROFITLOSS: "user/total/bet/profitLoss",
    TOTAL_SESSION_PROFITLOSS: "user/total/session/profitLoss",
  },
  EXPERT: {
    COMPETITIONLIST: "/expert/match/competitionList/",
    COMPETITIONDATES: "/expert/match/competition/dates/",
    COMPETITIONMATCHES: "/expert/match/competition/getMatch/",
  },
  CARDS: {
    MATCH: {
      GET_CARD_DETAIL: "/match/card",
      GET_CARD_DETAIL_INITIAL: "/match/initial/card",
      PLACE_BET: "/bet/cardBetting",
      RESULT: "/card/result/detail",
    },
  },
  BET: {
    PLACEBETSESSION: "bet/session",
    PLACEBETMATCHBETTING: "bet/matchBetting",
    PLACEBETTOURNAMENT: "bet/tournament",
    GETPLACEDBETS: "bet",
    RUN_AMOUNT: "bet/session/profitLoss",
  },
  LIVESTREAM: {
    GET_CHANNEL_ID: "https://scoreapi.365cric.com/api/match/getStream",
    GET_VIDEO: "https://video.proexch.in/tv/static",
  },
};

export const Constants = {
  pageLimit: 10,
  AuthPaths: {
    root: "/",
    login: "login",
    changePassword: "change-password",
  },

  MainPaths: {
    root: "/",
    match: "match",
    comingSoon: "comingsoon",
    liveMarketMatches: "inplay/matchDetail",
    liveMarketSport: "match/matchDetail",
    myAccount: "my-account",
    liveMarket: "inplay",
    changeButtonValue: "my-account/change_button_value",
    rules: "rules",
    changePassword: "my-account/change_password",
    secureAuth: "my-account/secure-auth",
    liveCasino: "liveCasino",
  },
  ReportsPaths: {
    root: "/",
    profitLoss: "my-account/profit_loss",
    accountStatement: "my-account/account_statement",
    currentBet: "my-account/current_bet",
    generalReport: "my-account/general_report",
    betHistory: "my-account/bet_history",
  },
  pageCount: 10,
  listOfClientCountLimit: 15,

  // customPageLimit: 10,
  // customTimeOut: 300000,// 5 mint in mili seconds user ideal 5 mint after that logout
  // customTimer: 30000,// 30 sec in mili seconds remainint timer start and show message  Your session will expire in 30 second
  // sessionExpireTime: 30 // 30 sec,

  customPageLimit: 15,
  customTimeOut: 1000 * 60 * 60, // 5 mint in mili seconds user ideal 5 mint after that logout
  customTimer: 1000 * 60 * 5, // 30 sec in mili seconds remainint timer start and show message  Your session will expire in 30 second
  sessionExpireTime: 60 * 5, // 30 sec
  apiBasePath: "https://devbetfairapi.fairgame.club",
  thirdParty: "https://devserviceapi.fairgame.club",
  expertPath: "https://devexpertapi.fairgame.club",
  apiBasePathLive: "https://betfairapi.fairgame7.com",
  thirdPartyLive: "https://serviceapi.fairgame7.com",
  expertPathLive: "https://expertapi.fairgame7.com",
  localPath: "http://localhost:5000",
  localPathThird: "http://localhost:3200",
  localPathExpert: "http://localhost:6060",
  WEBSOCKET: "websocket",
  POLLING: "polling",
  PRODUCTION: "production",
  randomeNumber: "JiskaPataNaLageG",
  publicNumber: `U2FsdGVkX1+7Lz0LzD8AsrBoHiQrViZiWhIWBqYuL4dgfGXwUbjJndfELn+Usn4xpSEl8s1RoIqzSS/EHUfPLYK/iq/6V0lKQpDaaK52maKES7/cOdFiuXYTVTGu+/HajYeHTly+Xgn1egPHG1NcK9wP6U3vTUDEkHaB2C4hNejgB/JPzdDD8pp60kc+VzCrkbxbRM2oiR4iEtCRQPac4vz0SdQFaSPaG1gexmBFdu/w5ZMSPoPxuSM2rSA0UvmYobUoP5VkQbkIlL1fZhlwOmJ2bm5AHUyfzfHU1njCgwYhB6eJswzg0Qr8lu2cstCaB6zmxeXmdYF41o157foAyeXgBT/TRYt4nwFQ4WuKngLRPPjM6/LD/sY9sZBFv58i`,
  privateNumber: `U2FsdGVkX19PB0k7pc6tsaolSzWPHY2kgJvHhevrMQ7JuPxXzoTJ/RVKBD6yBUt3xnPx4Nu+beP2YSbQ5GvSxw0ZJRzPMDNp1UOtOPzl5afvOf2wbvZLzhHSkW/qUmERYHLa7b24YLZDY0nIjS6PRLxc22qlRavxSa0/LCRGN0tWmTneiwD6aCgYPkD6YyzpL7qhBPCPSzCJ4CG05wknMfhg6kZSfNEYssJy3moQdlNTjr/6H923TMHCyE5GNfXeLgEYFdA2xxfbRiDJNvm9oJeDyhOiKOqM5kw7GceZQ4pHbtd4snOkfrMjVCY+ogpkXGpauvyTO+dJrqb2rDJ2OZlfHgXhCbWXlyq6CPFmmwqly5ZtJMDyOLhUZ/yJ2z4e/vLJYFuEcOFk4BQrpmnsAiVsCZyV9WGZER5mR11Wri0kWBw0Nya/mbGljAYWJzB8PcpUvZcwa3/Zoh6WgYzoSeAKWP8ftQvcHOQIa7XrFUWWYGH9DpHFJ4f2TnLb+azIMeFkdLXRTO0wETkf3G1H8uSND7B95tHn4L77wcXe5lHTguj4vFHs3dy+o+sqRKqilB6et/ehikfinAh6aBg2isbVnnp5BFzvfwwPKEMb1bKfMpFB3xg9ip8qsVKN6t3Igx5ur8E6ZQ/GpQ4IBUqFc/gkj3cA4v+inA/x/J4Al3RB2kw5V3Jm0Nq9cDf7pUY9AGOoTWZz+TOGKXCrctWBRolCLBmJRKMBGcPCZd7WgCTU3dMzqb4MB8e86QBVNQO8rAr1Nb4IQIcohAthGaFScD0VmWv1/omL0GxIvFY+tNl0IT9OK0rF9pAM+LjuCzP56MeMpEQx+K5LR8sUQtN9QXcHaQfmkBv8ThPmQGkyRKM7t6Pimf9j1niiUp3HArtIFCKFTzYpPEXHc0LeAYLr7TQ06zlLuQLsOcHsIim/0aNAjyXVUFcVvNX673sKA6wvaAMLdJOAzea54U+MVOgeP1t2WTJGjr7TiUKm8SWxVy0OhxRKyjFtJPGktUCYA/4h0oNtVb1atSBBGfcbtt6RubdtQzGfYGjjJHSc329dS17AgoCdlyu1FllcJ3MqGya6LySxBN29Jh9qM9N5Qw3cnvvkkhG/f0yj44Vcna3MjxS4gobAFa5jZacxQ8w0xGRkjETfN/22Kt7qUZnKwQ5f21iMeTDXDtNwN/Pld866Z9GVBQKekM6J9AhR0kWVZJQJ`,
};

export const cardUrlMain = "https://jmdapi.com/tablevideo/?id=";
export const liveStreamCricketPageUrl =
  "https://maxbet07.com/liveStreamCricket/";
export const liveStreamUrlCricket = "https://maxbet07.com/liveStreamCricket/";
export const liveStreamUrl = "https://maxbet07.com/liveStream/";

export const teamStatus = {
  suspended: "suspended",
  active: "active",
  closed: "closed",
  ballStart: "ball start",
  ballStop: "ball stop",
  ballRunning: "ball running",
};

export const matchBettingType = {
  matchOdd: "matchOdd",
  bookmaker: "bookmaker",
  bookmaker2: "bookmaker2",
  quickbookmaker1: "quickbookmaker1",
  quickbookmaker2: "quickbookmaker2",
  quickbookmaker3: "quickbookmaker3",
  tiedMatch1: "tiedMatch1",
  tiedMatch2: "tiedMatch2",
  tiedMatch3: "tiedMatch3",
  completeMatch: "completeMatch",
  completeMatch1: "completeMatch1",
  completeManual: "completeManual",
  other: "other",
  tournament: "tournament",
};
export const sessionBettingType = {
  session: "session",
  fancy1: "fancy1",
  overByOver: "overByover",
  ballByBall: "ballByBall",
  oddEven: "oddEven",
  cricketCasino: "cricketCasino",
  tournament: "tournament",
};

export const profitLossDataForMatchConstants = {
  [matchBettingType.matchOdd]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.bookmaker]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.bookmaker2]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.quickbookmaker1]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.quickbookmaker2]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.quickbookmaker3]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.tiedMatch1]: {
    A: "yesRateTie",
    B: "noRateTie",
  },
  [matchBettingType.tiedMatch2]: {
    A: "yesRateTie",
    B: "noRateTie",
  },
  [matchBettingType.tiedMatch3]: {
    A: "yesRateTie",
    B: "noRateTie",
  },
  [matchBettingType.completeMatch]: {
    A: "yesRateComplete",
    B: "noRateComplete",
  },
  [matchBettingType.completeMatch1]: {
    A: "yesRateComplete",
    B: "noRateComplete",
  },
  [matchBettingType.completeManual]: {
    A: "yesRateComplete",
    B: "noRateComplete",
  },
  [matchBettingType.other]: {
    A: "userTeamARateOther",
    B: "userTeamBRateOther",
    C: "userTeamCRateOther",
  },
};

export const serviceUrl = import.meta.env.VITE_BASE_URL;

export const baseUrls = {
  socket: import.meta.env.VITE_BASE_URL,
  matchSocket: import.meta.env.VITE_THIRD_PARTY_BASE_URL,
  expertSocket: import.meta.env.VITE_EXPERT_BASE_URL,
};

export const marketApiConst: { [key: string]: string } = {
  cricket: ApiConstants.MATCH.MARKET_MATCH_LIST_CRICKET,
  football: ApiConstants.MATCH.MARKET_MATCH_LIST_FOOTBALL,
  tennis: ApiConstants.MATCH.MARKET_MATCH_LIST_TENNIS,
};
