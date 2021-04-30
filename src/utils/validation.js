export const minLen = (l) => (v) =>
  (v && v.length >= l) || `至少输入${l}个字符`;
export const maxLen = (l) => (v) =>
  (v && v.length <= l) || `至多输入${l}个字符`;
export const exactLen = (l) => (v) =>
  (v && v.length === l) || `必须输入${l}个字符`;
export const required = (msg) => (v) =>
  v === 0 || v === "0" || v === "false" || Boolean(v) || msg;
export const requiredArray = (msg) => (v) =>
  (Array.isArray(v) && v.length >= 1) || msg;

export const min = (num) => (v) => {
  let number = Number(v);
  if (String(number) === "NaN") {
    return `请输入数字`;
  }
  return (
    ((Boolean(number) || number === 0) && number >= num) || `不能小于${num}`
  );
};

export const max = (num) => (v) => {
  let number = Number(v);
  if (String(number) === "NaN") {
    return `请输入数字`;
  }
  return (
    ((Boolean(number) || number === 0) && number <= num) || `不能大于${num}`
  );
};

export const between = (max, min) => (v) => {
  let number = Number(v);
  if (String(number) === "NaN") {
    return `请输入数字`;
  }
  return (
    ((Boolean(number) || number === 0) && number <= max && number >= min) ||
    `不能大于${max},不能小于${min} `
  );
};
