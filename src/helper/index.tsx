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
    return isRound
      ? Math.round(value / 1000) + "k"
      : (value / 1000).toFixed(1) + "k";
  } else {
    return isRound ? Math.round(value) : value;
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

export const formatToINR = (amount: any) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    currency: "INR",
  });
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

export const calculateRequiredStack = (
  initialTeamA: number,
  initialTeamB: number,
  perc: number
): number => {
  if (!initialTeamA || !initialTeamB || !perc) return 0;

  let result = (initialTeamB - initialTeamA) / (1 + perc / 100);
  return parseFloat(result.toFixed(2)) ?? 0;
};
