export const delay = function (timeInMills) {
  return new Promise((resolve) => setTimeout(resolve, timeInMills));
};
