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
    login: "fgUser/login",
    changePassword: "fgUser/change-password",
  },

  MainPaths: {
    root: "/fgUser",
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
    root: "/fgUser",
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
  apiBasePath: "http://3.89.232.255:5050",
  thirdParty: "http://3.89.232.255:3200",
  expertPath: "http://3.89.232.255:6060",
};

export const teamStatus = {
  suspended: "suspended",
  active: "active",
  closed: "closed",
  ballStart: "ball start",
  ballStop: "ball stop",
  ballRunning: "ball running",
};

export const baseUrls = {
  socket:
    process.env.NODE_ENV === "production"
      ? `${Constants.apiBasePath}`
      : "http://localhost:5050",
  matchSocket:
    process.env.NODE_ENV === "production"
      ? `${Constants.thirdParty}`
      : "http://localhost:3200",
  expertSocket:
    process.env.NODE_ENV === "production"
      ? `${Constants.expertPath}`
      : "http://localhost:6060",
};
