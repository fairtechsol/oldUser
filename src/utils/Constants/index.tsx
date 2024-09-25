export const ApiConstants = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    CHANGEPASSWORD: "user/changePassword",
    OLD_PASSWORD: "/user/check/oldPassword",
  },
  MATCH: {
    MATCHLIST: "/match/list",
    SEARCHLIST: "/user/searchlist",
    MATCHDETAILS: "/match/",
    CURRENTBET: "/bet",
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
    liveMarketMatches: "matchDetail",
    myAccount: "my-account",
    liveMarket: "inplay",
    changeButtonValue: "change_button_value",
    rules: "rules",
    changePassword: "change_password",
    secureAuth: "secure-auth",
  },
  ReportsPaths: {
    root: "/",
    profitLoss: "profit_loss",
    accountStatement: "account_statement",
    currentBet: "current_bet",
    generalReport: "general_report",
    betHistory: "bet_history",
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
};

export const cardUrlMain = "https://jmdapi.com/tablevideo/?id=";

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

// export const baseUrls = {
//   socket:
//     process.env.NODE_ENV === Constants.PRODUCTION
//       ? `${Constants.apiBasePath}`
//       : `${Constants.localPath}`,
//   matchSocket:
//     process.env.NODE_ENV === Constants.PRODUCTION
//       ? `${Constants.thirdParty}`
//       : `${Constants.localPathThird}`,
//   expertSocket:
//     process.env.NODE_ENV === Constants.PRODUCTION
//       ? `${Constants.expertPath}`
//       : `${Constants.localPathExpert}`,
// };

export const baseUrls = {
  socket:
    process.env.NODE_ENV === Constants.PRODUCTION
      ? `${Constants.apiBasePathLive}`
      : `${Constants.localPath}`,
  matchSocket:
    process.env.NODE_ENV === Constants.PRODUCTION
      ? `${Constants.thirdPartyLive}`
      : `${Constants.localPathThird}`,
  expertSocket:
    process.env.NODE_ENV === Constants.PRODUCTION
      ? `${Constants.expertPathLive}`
      : `${Constants.localPathExpert}`,
};
