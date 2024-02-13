export const ApiConstants = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    CHANGEPASSWORD: "user/changePassword",
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
  },
  EXPERT: {
    COMPETITIONLIST: "/expert/match/competitionList/",
    COMPETITIONDATES: "/expert/match/competition/dates/",
    COMPETITIONMATCHES: "/expert/match/competition/getMatch/",
  },
  BET: {
    PLACEBETSESSION: "bet/session",
    PLACEBETMATCHBETTING: "bet/matchBetting",
    GETPLACEDBETS: "bet",
    RUN_AMOUNT: "bet/session/profitLoss",
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
  apiBasePath: "http://54.208.19.89:5001",
  thirdParty: "http://54.208.19.89:3200",
  expertPath: "http://54.208.19.89:6060",
  localPath: "http://localhost:5001",
  localPathThird: "http://localhost:3200",
  localPathExpert: "http://localhost:6060",
};

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
  quickbookmaker1: "quickbookmaker1",
  quickbookmaker2: "quickbookmaker2",
  quickbookmaker3: "quickbookmaker3",
  tiedMatch1: "tiedMatch1",
  tiedMatch2: "tiedMatch2",
  completeMatch: "completeMatch",
};

export const baseUrls = {
  socket:
    process.env.NODE_ENV === "production"
      ? `${Constants.apiBasePath}`
      : `${Constants.localPath}`,
  matchSocket:
    process.env.NODE_ENV === "production"
      ? `${Constants.thirdParty}`
      : `${Constants.localPathThird}`,
  expertSocket:
    process.env.NODE_ENV === "production"
      ? `${Constants.expertPath}`
      : `${Constants.localPathExpert}`,
};
