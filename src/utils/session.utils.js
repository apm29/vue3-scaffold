import config from "@/utils/config";

export const TOKEN_KEY = config.tokenKey;
export const OPEN_ID_KEY = config.openIdKey;
export const USER_KEY = config.userKey;
export const SCHOOL_KEY = config.schoolCodeKey;
export const APP_ID_KEY = config.appIdKey;
export const WX_AUTH_COUNT = "WX_AUTH_COUNT";

function setLocalStorage(key, token) {
  if (token) {
    localStorage.setItem(key, token);
  } else {
    localStorage.removeItem(key);
  }
}

function getLocalStorage(key) {
  const token = localStorage.getItem(key);
  if (token && token !== "null" && token !== "undefined") {
    return token;
  } else {
    return undefined;
  }
}

/**
 * 私有方法,设置localStorage数据
 * @param key
 * @param token
 */
function setSessionStorage(key, token) {
  if (token) {
    sessionStorage.setItem(key, token);
  } else {
    sessionStorage.removeItem(key);
  }
}

/**
 * 私有方法,获取localStorage数据
 * @param key
 */
function getSessionStorage(key) {
  const token = sessionStorage.getItem(key);
  if (token && token !== "null" && token !== "undefined") {
    return token;
  } else {
    return undefined;
  }
}

export const setToken = (token) => {
  setLocalStorage(TOKEN_KEY, token);
};

export const getToken = () => {
  return getLocalStorage(TOKEN_KEY);
};

export const setUserInfo = (user) => {
  setLocalStorage(USER_KEY, JSON.stringify(user));
};

export const getUserInfo = () => {
  const userString = getLocalStorage(USER_KEY);
  if (userString) {
    try {
      return JSON.parse(userString);
    } catch (e) {
      return undefined;
    }
  } else {
    return undefined;
  }
};

export const setOpenId = (openId) => {
  setLocalStorage(OPEN_ID_KEY, openId);
};

export const getOpenId = () => {
  return getLocalStorage(OPEN_ID_KEY);
};
export const setSchoolCode = (schoolCode) => {
  setLocalStorage(SCHOOL_KEY, schoolCode);
};

export const getSchoolCode = () => {
  return getLocalStorage(SCHOOL_KEY);
};

export const setAppId = (openId) => {
  setLocalStorage(APP_ID_KEY, openId);
};

export const getAppId = () => {
  return getLocalStorage(APP_ID_KEY);
};

export const setWxAuthCount = (count) => {
  setLocalStorage(WX_AUTH_COUNT, count);
};

export const getWxAuthCount = () => {
  try {
    return parseInt(getLocalStorage(WX_AUTH_COUNT));
  } catch (e) {
    return 0;
  } finally {
  }
};

export const setUsedTicketList = (usedTickets) => {
  setSessionStorage("used-tickets", JSON.stringify(usedTickets));
};

export const getUsedTicketList = () => {
  const userString = getSessionStorage("used-tickets");
  if (userString) {
    try {
      return JSON.parse(userString);
    } catch (e) {
      console.log(e);
      return [];
    }
  } else {
    return [];
  }
};
