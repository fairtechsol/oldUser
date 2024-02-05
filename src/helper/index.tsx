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

export const customSort = () => {
  //(a:any, b:any) param
  // betStatus 1 should come before betStatus 2
  // const betStatusOrder = { 1: 0, 0: 1, 2: 2 };
  const aStatus = 0;
  const bStatus = 0;
  return aStatus - bStatus;
};
