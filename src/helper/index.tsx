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
