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
    BET_ACCOUNTSTATEMENT: "bet/accountStatement",
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
    casino: "casino",
    crashGames: "crashGames",
    macVirtual: "macVirtual",
    coloPred: "colorPred",
    macExcite: "macExcite",
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

export const liveCasinoPics: any = {
  All: "https://tezcdn.io/casino/int-casino-icon/all.webp",
  "dragon tiger": "https://tezcdn.io/casino/int-casino-icon/dragon-tiger.webp",
  baccarat: "https://tezcdn.io/casino/int-casino-icon/baccarat.webp",
  sicbo: "https://tezcdn.io/casino/int-casino-icon/sicbo.webp",
  roulette: "https://tezcdn.io/casino/int-casino-icon/roulette.webp",
  poker: "https://tezcdn.io/casino/int-casino-icon/poker.webp",
  lucky7: "https://tezcdn.io/casino/int-casino-icon/lucky7.webp",
  andarbahar: "https://tezcdn.io/casino/int-casino-icon/andarbahar.webp",
  teenpatti: "https://tezcdn.io/casino/int-casino-icon/teenpatti.webp",
  "32cards": "https://tezcdn.io/casino/int-casino-icon/32cards.webp",
  others: "https://tezcdn.io/casino/int-casino-icon/others.webp",
  lottery: "https://tezcdn.io/casino/int-casino-icon/lottery.webp",
  cricketwar: "https://tezcdn.io/casino/int-casino-icon/cricketwar.webp",
  "hi low": "https://tezcdn.io/casino/int-casino-icon/hi-low.webp",
  "fun games": "https://tezcdn.io/casino/int-casino-icon/fun-games.webp",
  crash: "https://tezcdn.io/casino/int-casino-icon/crash.webp",
  aviator: "https://tezcdn.io/casino/int-casino-icon/aviator.webp",
  mines: "https://tezcdn.io/casino/int-casino-icon/mines.webp",
  slots: "https://tezcdn.io/casino/int-casino-icon/slots.webp",
  "live game show":
    "https://tezcdn.io/casino/int-casino-icon/live-game-show.webp",
  "color prediction":
    "https://tezcdn.io/casino/int-casino-icon/color-prediction.webp",
  "sic bo": "https://tezcdn.io/casino/int-casino-icon/sic-bo.webp",
  "bac bo": "https://tezcdn.io/casino/int-casino-icon/bac-bo.webp",
  "fan tan": "https://tezcdn.io/casino/int-casino-icon/fan-tan.webp",
  craps: "https://tezcdn.io/casino/int-casino-icon/craps.webp",
  blackjack: "https://tezcdn.io/casino/int-casino-icon/blackjack.webp",
  "casino holdem":
    "https://tezcdn.io/casino/int-casino-icon/casino-holdem.webp",
  "double hand casino holdem poker":
    "https://tezcdn.io/casino/int-casino-icon/double-hand-casino-holdem-poker.webp",
  "video poker": "https://tezcdn.io/casino/int-casino-icon/video-poker.webp",
  "extreme texas holdem":
    "https://tezcdn.io/casino/int-casino-icon/extreme-texas-holdem.webp",
  "triple card poker":
    "https://tezcdn.io/casino/int-casino-icon/triple-card-poker.webp",
};

export const liveCasinoGameList: any = [
  {
    game_id: "150063",
    game_name: "Dream Wheel",
    category: "live game show",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/dw.webp",
    game_code: "MAC88-YLGS101",
  },
  {
    game_id: "150041",
    game_name: "6 Player Poker",
    category: "Poker",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/6pp.webp",
    game_code: "MAC88-X6PP101",
  },
  {
    game_id: "150046",
    game_name: "Cricket Match 20-20",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/cricket2020.webp",
    game_code: "MAC88-XCM101",
  },
  {
    game_id: "150056",
    game_name: "Instant Teen Patti",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/itp.webp",
    game_code: "MAC88-ZITP101",
  },
  {
    game_id: "150053",
    game_name: "10 - 10 cricket ",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/10_10_cricket.webp",
    game_code: "MAC88-YXC101",
  },
  {
    game_id: "150051",
    game_name: "High Low",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/high_low.webp",
    game_code: "MAC88-YHL101",
  },
  {
    game_id: "151083",
    game_name: "Ball by Ball VR",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/bbb.webp",
    game_code: "MAC88-BB101",
  },
  {
    game_id: "150070",
    game_name: "AK47 Teenpatti",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/ak47tp.webp",
    game_code: "MAC88-XAK47101",
  },
  {
    game_id: "151081",
    game_name: "Lucky 15",
    category: "Virtual",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/lucky15.webp",
    game_code: "MAC88-L15101",
  },
  {
    game_id: "150068",
    game_name: "Lucky 5",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/lucky5.webp",
    game_code: "MAC88-XLK5101",
  },
  {
    game_id: "151026",
    game_name: "Lankesh",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming Virtual",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/lankesh.jpeg",
    game_code: "MAC88-VTGLN101",
  },
  {
    game_id: "150057",
    game_name: "Andar Bahar 50",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/ab50.webp",
    game_code: "MAC88-ZABL101",
  },
  {
    game_id: "150061",
    game_name: "Side Bet city",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/sbc.webp",
    game_code: "MAC88-ZSBC101",
  },
  {
    game_id: "150054",
    game_name: "Muflis Teenpatti",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/mtp.webp",
    game_code: "MAC88-ZMTP101",
  },
  {
    game_id: "150055",
    game_name: "Instant worli",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/iw.webp",
    game_code: "MAC88-ZIW101",
  },
  {
    game_id: "150058",
    game_name: "Super Over",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/so.webp",
    game_code: "MAC88-ZSP101",
  },
  {
    game_id: "150059",
    game_name: "Center card",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/cc.webp",
    game_code: "MAC88-ZCC101",
  },
  {
    game_id: "150066",
    game_name: "20 20 Teenpatti 2",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/2020tp2.webp",
    game_code: "MAC88-TPTT2101",
  },
  {
    game_id: "150007",
    game_name: "Andar Bahar",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/andar_bahar.webp",
    game_code: "MAC88-XAB101",
  },
  {
    game_id: "150001",
    game_name: "Dragon Tiger",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/dt_mac88.webp",
    game_code: "MAC88-YDT102",
  },
  {
    game_id: "150013",
    game_name: "DTL",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/dtl_20_20.webp",
    game_code: "MAC88-YDTL101",
  },
  {
    game_id: "150036",
    game_name: "1 Day Dragon Tiger",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/dt_1day.webp",
    game_code: "MAC88-X1DT101",
  },
  {
    game_id: "150067",
    game_name: "Dragon Tiger 2",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/dt2.webp",
    game_code: "MAC88-DT2101",
  },
  {
    game_id: "150002",
    game_name: "Bacarrat",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/baccarat_mac88.webp",
    game_code: "MAC88-XBAC101",
  },
  {
    game_id: "150026",
    game_name: "29 Baccarat",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/29b.webp",
    game_code: "MAC88-X29BC101",
  },
  {
    game_id: "150003",
    game_name: "Sic Bo",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/sicbo_mac88.webp",
    game_code: "MAC88-XSB101",
  },
  {
    game_id: "150004",
    game_name: "Roulette",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/roulette_mac88.webp",
    game_code: "MAC88-XRT101",
  },
  {
    game_id: "150005",
    game_name: "Poker 20-20",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/20_20_poker.webp",
    game_code: "MAC88-XPOK101",
  },
  {
    game_id: "150032",
    game_name: "Poker 1-Day",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/poker_1_day.webp",
    game_code: "MAC88-Y1POK101",
  },
  {
    game_id: "150006",
    game_name: "Lucky7",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/lucky_7.webp",
    game_code: "MAC88-YLK7101",
  },
  {
    game_id: "150009",
    game_name: "Teenpatti One Day",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/tp1d.webp",
    game_code: "MAC88-X1TP101",
  },
  {
    game_id: "150023",
    game_name: "Test Teenpatti",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/teenpatti_test.webp",
    game_code: "MAC88-YTTP102",
  },
  {
    game_id: "150042",
    game_name: "Instant 2 Cards Teenpatti",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/2_card_tp.webp",
    game_code: "MAC88-X2TP101",
  },
  {
    game_id: "150030",
    game_name: "Muflis Teenpatti 1 Day",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/muflis_teenpati.webp",
    game_code: "MAC88-Y1MTP101",
  },
  {
    game_id: "150033",
    game_name: "20-20 Teenpatti",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/20_20_teenpatti.webp",
    game_code: "MAC88-YTPTT101",
  },
  {
    game_id: "150028",
    game_name: "Two Card Teenpatti",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/2_cards_teenpatti.webp",
    game_code: "MAC88-Y12TP101",
  },
  {
    game_id: "150049",
    game_name: "Open Teen patti",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/open_teen_patti.webp",
    game_code: "MAC88-YOTP101",
  },
  {
    game_id: "150010",
    game_name: "32 Cards",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/32_cards.webp",
    game_code: "MAC88-Y32CA102",
  },
  {
    game_id: "150014",
    game_name: "Amar Akbar Anthony",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/amar_akbar_anthony.webp",
    game_code: "MAC88-YA3101",
  },
  {
    game_id: "150015",
    game_name: "3 Cards Judgement",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/3cj.webp",
    game_code: "MAC88-X3CJ101",
  },
  {
    game_id: "150016",
    game_name: "Queen Race",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/queen.webp",
    game_code: "MAC88-YQR102",
  },
  {
    game_id: "150017",
    game_name: "Race 20",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/race_20.webp",
    game_code: "MAC88-YRTT102",
  },
  {
    game_id: "150018",
    game_name: "Casino War",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/casino_war.webp",
    game_code: "MAC88-XCAW101",
  },
  {
    game_id: "150019",
    game_name: "Worli Matka",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/worli_matka.webp",
    game_code: "MAC88-YWM102",
  },
  {
    game_id: "150025",
    game_name: "Trio",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/trio.webp",
    game_code: "MAC88-XTRI101",
  },
  {
    game_id: "150031",
    game_name: "Bollywood Casino B",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/bollywood_casino.webp",
    game_code: "MAC88-YBOC102",
  },
  {
    game_id: "150037",
    game_name: "Dus Ka Dum",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/10kadum.webp",
    game_code: "MAC88-X1DKD101",
  },
  {
    game_id: "150040",
    game_name: "One Card One Day",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/1c1d.webp",
    game_code: "MAC88-X10C101",
  },
  {
    game_id: "150043",
    game_name: "Race to 17",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/race_17.webp",
    game_code: "MAC88-XRT17101",
  },
  {
    game_id: "150045",
    game_name: "Note Number",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/notenumber.webp",
    game_code: "MAC88-X1NN101",
  },
  {
    game_id: "150048",
    game_name: "Race to 2nd",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/race_2.webp",
    game_code: "MAC88-X1RTS101",
  },
  {
    game_id: "150050",
    game_name: "Center Card One Day",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/center_card_one_day.webp",
    game_code: "MAC88-Y1CC101",
  },
  {
    game_id: "150020",
    game_name: "Lottery",
    category: "Live",
    provider_name: "MAC88",
    sub_provider_name: "Mac88 Gaming",
    status: "ACTIVE",
    url_thumb: "https://cdn.dreamdelhi.com/mac88/lottery.webp",
    game_code: "MAC88-XLOT101",
  },
  // {
  //   game_id: "151027",
  //   game_name: "Aviator X",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/monk88/aviatorx.webp",
  //   game_code: "MAC88-CAV101-VR",
  // }, //
  // {
  //   game_id: "151067",
  //   game_name: "AviatorX2",
  //   category: "Crash Games",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/aviatorx2.webp",
  //   game_code: "MAC88-CAVB101",
  // }, //
  // {
  //   game_id: "150003",
  //   game_name: "Sic Bo",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/sicbo_mac88.webp",
  //   game_code: "MAC88-XSB101",
  // }, //
  // {
  //   game_id: 1,
  //   url: "/ballbyball",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/ballbyball.jpg",
  //   game_name: "Ball By Ball",
  // }, //
  // {
  //   game_id: 2,
  //   url: "/superover",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/superover.jpg",
  //   game_name: "Super Over",
  // }, //
  // {
  //   game_id: "150016",
  //   game_name: "Queen Race",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/queen.webp",
  //   game_code: "MAC88-YQR102",
  // }, //
  // {
  //   game_id: 4,
  //   url: "/queen",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/queen.jpg",
  //   game_name: "Casino Queen",
  // }, //
  // {
  //   game_id: "150017",
  //   game_name: "Race 20",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/race_20.webp",
  //   game_code: "MAC88-YRTT102",
  // }, //
  // {
  //   game_id: 3,
  //   url: "/race20",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/race20.png",
  //   game_name: "Race 20-20",
  // }, //
  // {
  //   game_id: 5,
  //   url: "/cricketv3",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/cricketv3.jpg",
  //   game_name: "5Five Cricket",
  // }, //
  // {
  //   game_id: "150035",
  //   game_name: "5 Five Cricket",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/5_five_cricket.webp",
  //   game_code: "MAC88-Y15C101",
  // }, //
  // {
  //   game_id: "150014",
  //   game_name: "Amar Akbar Anthony",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/amar_akbar_anthony.webp",
  //   game_code: "MAC88-YA3101",
  // }, //
  // {
  //   game_id: "28",
  //   url: "/aaa",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/aaa.jpg",
  //   game_name: "Amar Akbar Anthony",
  // }, //

  // {
  //   game_id: "150009",
  //   game_name: "Teenpatti One Day",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/tp1d.webp",
  //   game_code: "MAC88-X1TP101",
  // }, //
  // {
  //   game_id: "150033",
  //   game_name: "20-20 Teenpatti",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/20_20_teenpatti.webp",
  //   game_code: "MAC88-YTPTT101",
  // }, //
  // {
  //   game_id: "150049",
  //   game_name: "Open Teen patti",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/open_teen_patti.webp",
  //   game_code: "MAC88-YOTP101",
  // }, //
  // {
  //   game_id: "150042",
  //   game_name: "Instant 2 Cards Teenpatti",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/2_card_tp.webp",
  //   game_code: "MAC88-X2TP101",
  // }, //
  // {
  //   game_id: "150028",
  //   game_name: "Two Card Teenpatti",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/2_cards_teenpatti.webp",
  //   game_code: "MAC88-Y12TP101",
  // }, //
  // {
  //   game_id: "150023",
  //   game_name: "Test Teenpatti",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/teenpatti_test.webp",
  //   game_code: "MAC88-YTTP102",
  // }, //
  // {
  //   game_id: 10,
  //   url: "/lucky7eu",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/lucky7eu.jpg",
  //   game_name: "Lucky 7 - B",
  // }, //
  // {
  //   game_id: "150001",
  //   game_name: "Dragon Tiger",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/dt_mac88.webp",
  //   game_code: "MAC88-YDT102",
  // }, //
  // {
  //   game_id: "150067",
  //   game_name: "Dragon Tiger 2",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/dt2.webp",
  //   game_code: "MAC88-DT2101",
  // }, //
  // {
  //   game_id: 31,
  //   url: "/dt6",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dt.jpg",
  //   game_name: "1 Day Dragon Tiger",
  // }, //
  // {
  //   game_id: "150013",
  //   game_name: "DTL",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/dtl_20_20.webp",
  //   game_code: "MAC88-YDTL101",
  // }, //
  // {
  //   game_id: 6,
  //   url: "/abj2",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/andar-bahar2.jpg",
  //   game_name: "Andar Bahar 2",
  // }, //
  // {
  //   game_id: 22,
  //   url: "/ab20",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/andar-bahar.jpg",
  //   game_name: "Andar Bahar",
  // }, //
  // {
  //   game_id: "150024",
  //   game_name: "The Trap",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/trap.webp",
  //   game_code: "MAC88-XTRP101",
  // }, //
  // {
  //   game_id: "150031",
  //   game_name: "Bollywood Casino B",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/bollywood_casino.webp",
  //   game_code: "MAC88-YBOC102",
  // }, //
  // {
  //   game_id: 29,
  //   url: "/btable",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/bollywood-casino.jpg",
  //   game_name: "Bollywood Casino",
  // }, //
  // {
  //   game_id: "150048",
  //   game_name: "Race to 2nd",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/race_2.webp",
  //   game_code: "MAC88-X1RTS101",
  // }, //
  // {
  //   game_id: "150043",
  //   game_name: "Race to 17",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/race_17.webp",
  //   game_code: "MAC88-XRT17101",
  // }, //
  // {
  //   game_id: "150018",
  //   game_name: "Casino War",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/casino_war.webp",
  //   game_code: "MAC88-XCAW101",
  // }, //
  // {
  //   game_id: 13,
  //   url: "/war",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/war.jpg",
  //   game_name: "Casino War",
  // }, //
  // {
  //   game_id: "150019",
  //   game_name: "Worli Matka",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/worli_matka.webp",
  //   game_code: "MAC88-YWM102",
  // }, //
  // {
  //   game_id: "150020",
  //   game_name: "Lottery",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/lottery.webp",
  //   game_code: "MAC88-XLOT101",
  // }, //
  // {
  //   game_id: "150002",
  //   game_name: "Bacarrat",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/baccarat_mac88.webp",
  //   game_code: "MAC88-XBAC101",
  // }, //
  // {
  //   game_id: "150026",
  //   game_name: "29 Baccarat",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/29b.webp",
  //   game_code: "MAC88-X29BC101",
  // }, //
  // {
  //   game_id: 8,
  //   url: "/baccarat2",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/baccarat2.jpg",
  //   game_name: "Baccarat 2",
  // }, //
  // {
  //   game_id: "150052",
  //   game_name: "Baccarat One Day",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/baccarat_one_day.webp",
  //   game_code: "MAC88-Y1BAC101",
  // }, //
  // {
  //   game_id: "150010",
  //   game_name: "32 Cards",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/32_cards.webp",
  //   game_code: "MAC88-Y32CA102",
  // }, //
  // {
  //   game_id: 27,
  //   url: "/32cards-B",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/32cardsB.jpg",
  //   game_name: "32 Cards B",
  // }, //
  // {
  //   game_id: "150025",
  //   game_name: "Trio",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/trio.webp",
  //   game_code: "MAC88-XTRI101",
  // }, //
  // {
  //   game_id: "150032",
  //   game_name: "Poker 1 Day",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/poker_1_day.webp",
  //   game_code: "MAC88-Y1POK101",
  // }, //
  // {
  //   game_id: "150005",
  //   game_name: "Poker 20-20",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/20_20_poker.webp",
  //   game_code: "MAC88-XPOK101",
  // }, //
  // {
  //   game_id: 21,
  //   url: "/poker20",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/poker.jpg",
  //   game_name: "20-20 Poker",
  // }, //
  // {
  //   game_id: "150015",
  //   game_name: "3 Cards Judgement",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/3cj.webp",
  //   game_code: "MAC88-X3CJ101",
  // }, //
  // {
  //   game_id: 25,
  //   url: "/3cardj",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/3cardsJ.jpg",
  //   game_name: "3 Cards Judgement",
  // }, //
  // {
  //   game_id: "150040",
  //   game_name: "One Card One Day",
  //   category: "Others",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/1c1d.webp",
  //   game_code: "MAC88-X10C101",
  // }, //
  // {
  //   game_id: "150038",
  //   game_name: "One Card 20-20",
  //   category: "Others",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/1_card_20_20.webp",
  //   game_code: "MAC88-XCTT101",
  // }, //
  // {
  //   game_id: "150036",
  //   game_name: "1 Day Dragon Tiger",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/dt_1day.webp",
  //   game_code: "MAC88-X1DT101",
  // }, //
  // {
  //   game_id: 14,
  //   url: "/dtl20",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dtl.jpg",
  //   game_name: "20-20 DTL",
  // }, //
  // {
  //   game_id: 26,
  //   url: "/32cards-A",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/32cardsA.jpg",
  //   game_name: "32 Cards A",
  // }, //
  // {
  //   game_id: "150045",
  //   game_name: "Note Number",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/notenumber.webp",
  //   game_code: "MAC88-X1NN101",
  // }, //
  // {
  //   game_id: "150006",
  //   game_name: "Lucky7",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/lucky_7.webp",
  //   game_code: "MAC88-YLK7101",
  // }, //
  // {
  //   game_id: "150004",
  //   game_name: "Roulette",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/roulette_mac88.webp",
  //   game_code: "MAC88-XRT101",
  // }, //
  // {
  //   game_id: "150039",
  //   game_name: "One Card Meter",
  //   category: "Others",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/1_card_meter.webp",
  //   game_code: "MAC88-XOCM101",
  // }, //
  // {
  //   game_id: 9,
  //   url: "/baccarat",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/baccarat.png",
  //   game_name: "Baccarat",
  // }, //
  // {
  //   game_id: 7,
  //   url: "/dt202",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dt202.jpg",
  //   game_name: "20-20 Dragon Tiger 2",
  // }, //
  // {
  //   game_id: "150037",
  //   game_name: "Dus Ka Dum",
  //   category: "Live",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/10kadum.webp",
  //   game_code: "MAC88-X1DKD101",
  // }, //
  // {
  //   game_id: 32,
  //   url: "/lucky7-A",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/lucky7.jpg",
  //   game_name: "Lucky 7 - A",
  // }, //
  // {
  //   game_id: "11",
  //   url: "/cmatch20",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/cc-20.jpg",
  //   name: "20-20 Cricket Match",
  // }, //
  // {
  //   game_id: 15,
  //   url: "/teen9",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg",
  //   game_name: "Test Teenpatti",
  // }, //
  // {
  //   game_id: 19,
  //   url: "/poker6",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/poker.jpg",
  //   game_name: "6 Player Poker",
  // }, //
  // {
  //   game_id: "12",
  //   url: "/cmeter",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/cmeter.jpg",
  //   name: "Casino Meter",
  // }, //
  // {
  //   game_id: 16,
  //   url: "/teen8",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg",
  //   game_name: "Open Teenpatti",
  // }, //
  // {
  //   game_id: "17",
  //   url: "/teen",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg",
  //   name: "1 Day Teenpatti",
  // }, //
  // {
  //   game_id: 18,
  //   url: "/teen20",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/teenpatti.jpg",
  //   game_name: "20-20 Teenpatti",
  // }, //
  // {
  //   game_id: 24,
  //   url: "/worli2",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/worli.jpg",
  //   game_name: "Instant Worli",
  // }, //
  // {
  //   game_id: 30,
  //   url: "/dt20",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/dt.jpg",
  //   game_name: "20-20 Dragon Tiger",
  // }, //
  // {
  //   game_id: "151015",
  //   game_name: "VR 2 Card TP",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_2ctp.webp",
  //   game_code: "MAC88-VTG2TP101",
  // }, //
  // {
  //   game_id: "151010",
  //   game_name: "VR Casino Meter",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_casinometer.webp",
  //   game_code: "MAC88-VTGCAM101",
  // }, //
  // {
  //   game_id: "151007",
  //   game_name: "VR Bollywood Casino",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_bc.webp",
  //   game_code: "MAC88-VTGBC101",
  // }, //
  // {
  //   game_id: "151006",
  //   game_name: "VR Mulfis Teenpatti",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_mtp.webp",
  //   game_code: "MAC88-VTGMT101",
  // }, //
  // {
  //   game_id: "151021",
  //   game_name: "VR Worli Matka",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_worlimatka.webp",
  //   game_code: "MAC88-VTGWM101",
  // }, //
  // {
  //   game_id: "151004",
  //   game_name: "VR Trio",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_trio.webp",
  //   game_code: "MAC88-VTGTRI101",
  // }, //
  // {
  //   game_id: "151009",
  //   game_name: "VR Dragon Tiger",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_dragontiger.webp",
  //   game_code: "MAC88-VTGDT101",
  // }, //
  // {
  //   game_id: "151008",
  //   game_name: "VR Amar Akbar Anthony",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_aaa.webp",
  //   game_code: "MAC88-VTGA3101",
  // }, //
  // {
  //   game_id: "230004",
  //   game_name: "Limbo",
  //   category: "slot",
  //   provider_name: "DC",
  //   sub_provider_name: "Monk88",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/monk88/limbo.webp",
  //   game_code: "monk88_limbo",
  // }, //
  // {
  //   game_id: "151016",
  //   game_name: "VR Queen Race",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_queen.webp",
  //   game_code: "MAC88-VTGQR101",
  // }, //
  // {
  //   game_id: "151003",
  //   game_name: "VR Lucky 7",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_lucky7.webp",
  //   game_code: "MAC88-VTGLK7101",
  // }, //
  // {
  //   game_id: "151012",
  //   game_name: "VR 32 Cards",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_32cards.webp",
  //   game_code: "MAC88-VTG32C101",
  // }, //
  // {
  //   game_id: "151022",
  //   game_name: "VR 29 card bacarrat",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_29b.webp",
  //   game_code: "MAC88-VTG29B101",
  // }, //
  // {
  //   game_id: "230005",
  //   game_name: "Mines",
  //   category: "slot",
  //   provider_name: "DC",
  //   sub_provider_name: "Monk88",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/monk88/mines.webp",
  //   game_code: "monk88_mines",
  // }, //
  // {
  //   game_id: "151005",
  //   game_name: "VR 20-20 DTL",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_2020_dtl.webp",
  //   game_code: "MAC88-VTGDTL101",
  // }, //
  // {
  //   game_id: 20,
  //   url: "/poker",
  //   imgSrc:
  //     "https://dzm0kbaskt4pv.cloudfront.net/v12/static/front/img/casinoicons/img/poker.jpg",
  //   game_name: "1 Day Poker",
  // }, //
  // {
  //   game_id: "151017",
  //   game_name: "VR Poker",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_poker.webp",
  //   game_code: "MAC88-VTGPOK101",
  // }, //
  // {
  //   game_id: "151011",
  //   game_name: "VR 20-20 Teenpatti",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_tp2020.webp",
  //   game_code: "MAC88-VTGTP101",
  // }, //
  // {
  //   game_id: "151014",
  //   game_name: "VR Andar Bahar",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_ab.webp",
  //   game_code: "MAC88-VTGAB101",
  // }, //
  // {
  //   game_id: "151019",
  //   game_name: "VR Auto Roulette",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_roulette.webp",
  //   game_code: "MAC88-VTGRT101",
  // }, //
  // {
  //   game_id: "230006",
  //   game_name: "Plinko",
  //   category: "slot",
  //   provider_name: "DC",
  //   sub_provider_name: "Monk88",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/monk88/plinko.webp",
  //   game_code: "monk88_plinko",
  // }, //
  // {
  //   game_id: "230001",
  //   game_name: "Crash",
  //   category: "slot",
  //   provider_name: "DC",
  //   sub_provider_name: "Monk88",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/monk88/crash.webp",
  //   game_code: "monk88_crash",
  // }, //
  // {
  //   game_id: "151018",
  //   game_name: "VR Race T20",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_race_20.webp",
  //   game_code: "MAC88-VTGRTT101",
  // }, //
  // {
  //   game_id: "151020",
  //   game_name: "VR High low",
  //   category: "Virtual",
  //   provider_name: "MAC88",
  //   sub_provider_name: "Mac88 Gaming Virtual",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/mac88/vr_hilo.webp",
  //   game_code: "MAC88-VTGHL101",
  // }, //
  // {
  //   game_id: "230002",
  //   game_name: "Diamonds",
  //   category: "slot",
  //   provider_name: "DC",
  //   sub_provider_name: "Monk88",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/monk88/diamonds.webp",
  //   game_code: "monk88_diamonds",
  // }, //
  // {
  //   game_id: "230003",
  //   game_name: "Dice",
  //   category: "slot",
  //   provider_name: "DC",
  //   sub_provider_name: "Monk88",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/monk88/dice.webp",
  //   game_code: "monk88_dice",
  // }, //
  // {
  //   game_id: "230008",
  //   game_name: "Hilo",
  //   category: "slot",
  //   provider_name: "DC",
  //   sub_provider_name: "Monk88",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/monk88/hilo.webp",
  //   game_code: "monk88_hilo",
  // }, //
  // {
  //   game_id: "230007",
  //   game_name: "X-Roulette",
  //   category: "slot",
  //   provider_name: "DC",
  //   sub_provider_name: "Monk88",
  //   status: "ACTIVE",
  //   url_thumb: "https://cdn.dreamdelhi.com/monk88/roulette.webp",
  //   game_code: "monk88_slide",
  // }, //
];

export const homeCasinoListIcons: any = {
  aviator: "https://tezcdn.io/casino/casino-highlight/aviator-730-280.gif",
  mines: "https://tezcdn.io/casino/casino-highlight/evoplay-730-280.gif",
  "fun games": "https://tezcdn.io/casino/casino-highlight/fungames-730_280.gif",
  "color prediction":
    "https://tezcdn.io/casino/casino-highlight/wingogames-730-280.gif",
};
