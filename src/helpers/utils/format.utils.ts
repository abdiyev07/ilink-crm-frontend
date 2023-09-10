export const objectPropertiesToQuery = (object: any): string => {
  const arr = Object.entries(object);
  if (!arr.length) return "";
  let res = "";
  const lastIdx = arr.length - 1;
  arr.forEach((el, idx) => {
    if (arr.length === 1) return (res = `${el[0]}=${el[1]}`);
    if (lastIdx === idx) return (res += `${el[0]}=${el[1]}`);
    res += `${el[0]}=${el[1]}&`;
  });
  return res;
};

export const formatBlobErrorToMsg = async (e: any) => {
  const msg = await e.response.data.text();
  alert(JSON.parse(msg)?.message || "Произошла ошибка...");
};
