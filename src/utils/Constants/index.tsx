export const ApiConstants = {
    AUTH: {
      LOGIN: "/auth/login",
      LOGOUT: "/auth/logout",
    },
    USER: {
      BALANCEUPDATE: "/balance/update",
      CHANGEPASSWORD: "/user/changePassword",
      LIST: "/user/list",
      BALANCE: "/user/balance",
      EXPERTLIST: "/expert/list",
      ADDFGADMIN: "/user/add",
      ADDURLADMIN: "/superadmin/add",
      ADDEXPERT: "/expert/add",
      UPDATEEXPERT: "/expert/update",
      UPDATE: "/user/updateUser",
      PROFILE: "/user/profile",
      MARQUEE: "/expert/notification",
      LOCKUNLOCK: "/user/lockUnlockUser",
      CREDITREFERRENCE: "/user/update/creditreferrence",
      EXPOSURELIMIT: "/user/update/exposurelimit",
    },
    SUPERADMIN: {
      ADD: "/superadmin/add",
      UPDATE_USER: "/superadmin/updateUser",
      CHANGE_PASSWORD: "/superadmin/changePassword",
      LOCK_UNLOCK_USER: "/superadmin/lockUnlockUser",
      EXPOSURE_LIMIT: "/superadmin/update/exposurelimit",
      CREDIT_REFERRENCE: "/superadmin/update/creditreferrence",
      UPDATE_BALANCE: "/superadmin/update/balance",
    },
    WALLET: {
      BALANCEUPDATE: "wallet/update/balance",
      CREDITREFERRENCE: "wallet/update/creditreference",
      EXPOSURELIMIT: "wallet/update/exposurelimit",
      LOCKUNLOCK: "/user/lockUnlockUser",
      CHANGEPASSWORD: "/user/changePassword",
      REPORTS: {
        GETACCOUNTSTATEMENT: "/transaction/get",
      },
    },
    EXPERT: {
      COMPETITIONLIST: "/expert/match/competitionList/",
      COMPETITIONDATES: "/expert/match/competition/dates/",
      COMPETITIONMATCHES: "/expert/match/competition/getMatch/",
    },
    INPLAY: {
      MATCHLIST: "match/list",
    },
    MATCH: {
      GET: "match",
      BETDELETE: "/bet/deleteMultipleBet",
    },
  };
  
  export const Constants = {
    pageLimit: 10,
    AuthPaths: {
      root: "/",
      login: "login",
      changePassword: "change_password",
    },

    
    MainPaths: {
      root: "/",
      match: "match",
      comingSoon: "comingsoon",
      liveMarketMatches: "matchDetail",
      myAccount: "my-account",
      liveMarket: "inplay",
    },



    WalletSettingsPaths: {
      root: "/wallet/walletSettings",
      deposit: "deposit",
      withdraw: "withdraw",
      creditReference: "credit_reference",
    },
    ReportsPaths: {
      root: "/reports",
      profitLoss: "profit_loss",
      accountStatement: "account_statement",
      currentBet: "current_bet",
      generalReport: "general_report",
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
  
  export const baseUrls = {
    socket:
      process.env.NODE_ENV === "production"
        ? `${Constants.apiBasePath}`
        : "http://localhost:5050",
    thirdParty:
      process.env.NODE_ENV === "production"
        ? `${Constants.thirdParty}`
        : "http://localhost:3200",
    expertSocket:
      process.env.NODE_ENV === "production"
        ? `${Constants.expertPath}`
        : "http://localhost:6060",
  };
  