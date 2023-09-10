export const diffMoreThanMonth = (from: Date, to: Date) => {
  if (!from || !to) return false;
  const fromTs = from.valueOf();
  const toTs = to.valueOf();
  const diff = (toTs - fromTs) / 1000;
  return diff >= 2678400;
};
