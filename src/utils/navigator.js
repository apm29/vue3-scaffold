export const isWeiXin = () => {
  let ua = navigator.userAgent.toLowerCase();
  return ua.indexOf("micromessenger") >= 0;
};

export const isYiBan = () => {
  let ua = navigator.userAgent.toLowerCase();
  return ua.indexOf("yiban") >= 0;
};
