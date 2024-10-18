import service from "../service";
import { ApiConstants } from "../utils/Constants";

const order: any = {
  session: 1,
  overByover: 2,
  ballByBall: 3,
  fancy1: 4,
  khado: 5,
  meter: 6,
  oddEven: 7,
};

export const formatNumber = (value: number, isRound: any) => {
  if (value >= 1000) {
    // return (value / 1000).toFixed(1) + "k";
    return isRound
      ? Math.round(value / 1000) + "k"
      : (value / 1000).toFixed(1) + "k";
  } else {
    return isRound ? Math.round(value) : value;
    // return value
  }
};

export const currencyFormatter = (amount: number) => {
  if (amount >= 10000000) {
    return amount / 10000000 + "cr";
  } else if (amount >= 100000) {
    return amount / 100000 + "lac";
  } else if (amount >= 1000) {
    return amount / 1000 + "k";
  } else {
    return amount;
  }
};

export const customSort = (a: any, b: any) => {
  const order: any = { live: 1, save: 2, result: 3 };
  return order[a?.activeStatus] - order[b?.activeStatus];
};

export const customBookmakerSort = (a: any, b: any) => {
  const order: any = {
    quickbookmaker1: 1,
    quickbookmaker2: 2,
    quickbookmaker3: 3,
  };
  return order[a?.type] - order[b?.type];
};

export const formatToINR = (amount: any) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    currency: "INR",
  });
  // console.log(amount, "amoutn")
  return formatter.format(parseFloat(amount || 0));
};

export const handleDecimalAmount = (num: any, color: any) => {
  let amount = num?.toFixed(2);
  let value;
  if (amount && amount?.includes(".")) {
    value = amount?.split(".");
  } else {
    value = amount;
  }
  return value?.length > 0 ? (
    <>
      <span style={{ color: color }}>{formatToINR(value[0])}.</span>
      <span style={{ fontSize: "0.8em", color: color }}>{value[1]}</span>
    </>
  ) : null;
};

export const convertData = (items: any) => {
  try {
    const result: any = {};

    items?.forEach((item: any) => {
      if (!result[item?.type]) {
        result[item?.type] = {
          mname: item?.type,
          rem: "",
          gtype: item?.gtype,
          status: item?.status,
          section: [],
        };
      }
      const sectionItem = {
        ...item,
      };
      result[item?.type]?.section?.push(sectionItem);
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateSessionBettingsItem = (
  matchDetailBettings: any,
  apiResponseBettings: any
) => {
  try {
    if (!apiResponseBettings || Object.keys(apiResponseBettings).length === 0) {
      for (const key in matchDetailBettings) {
        if (matchDetailBettings.hasOwnProperty(key)) {
          matchDetailBettings[key].mid = apiResponseBettings[key]?.mid;
          const matchDetailSections = matchDetailBettings[key]?.section;
          matchDetailSections?.forEach((section: any) => {
            section.isComplete = true;
          });
        }
      }
      return matchDetailBettings;
    } else
      for (const key in matchDetailBettings) {
        if (apiResponseBettings.hasOwnProperty(key)) {
          matchDetailBettings[key].mid = apiResponseBettings[key]?.mid;
          const apiSections = apiResponseBettings[key].section;
          const matchDetailSections = matchDetailBettings[key]?.section;

          if (matchDetailSections) {
            matchDetailSections.forEach(
              (matchDetailSection: any, index: number) => {
                const matchDetailSectionIndex = apiSections?.findIndex(
                  (section: any) => section?.id === matchDetailSection?.id
                );

                if (matchDetailSectionIndex !== -1) {
                  matchDetailSections[index] = {
                    ...matchDetailSection,
                    ...apiSections[matchDetailSectionIndex],
                    minBet: apiSections[matchDetailSectionIndex]?.min,
                    maxBet: apiSections[matchDetailSectionIndex]?.max,
                  };
                }
              }
            );
            apiSections?.forEach((apiSection: any) => {
              const existsInMatchDetail = matchDetailSections.some(
                (matchDetailSection: any) =>
                  matchDetailSection.id === apiSection.id
              );
              if (!existsInMatchDetail) {
                matchDetailSections.push({
                  ...apiSection,
                  minBet: apiSection?.min,
                  maxBet: apiSection?.max,
                });
              }
            });
          }
        }
      }
    return matchDetailBettings;
  } catch (error) {
    console.log(error);
  }
};

export const getChannelId = async (eventId: number) => {
  try {
    const res: any = await service.get(
      `${ApiConstants.LIVESTREAM.GET_CHANNEL_ID}?Cno=${eventId}`
    );
    if (res) {
      return res?.result;
    }
  } catch (error) {
    console.log(error);
  }
};

export const customSortBySessionMarketName = (
  [_, nameA]: any,
  [__, nameB]: any
) => {
  const orderA = order[nameA] || Infinity;
  const orderB = order[nameB] || Infinity;
  return orderA - orderB;
};
