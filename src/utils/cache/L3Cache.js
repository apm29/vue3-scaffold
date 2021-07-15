import { reactive } from "vue";

const MemoryCache = reactive({});

/**
 * 私有方法,设置SessionStorage数据
 * @param key
 * @param data
 * @param expire
 * 存储为{ type:String, data:Object}
 */
function setSessionStorage(key, data, expire) {
  const cache = {
    type: typeof data,
    data: data,
    expire: expire,
  };
  sessionStorage.setItem(key, JSON.stringify(cache));
}

function getSessionStorage(key) {
  const cacheString = sessionStorage.getItem(key);
  let cache;
  try {
    cache = JSON.parse(cacheString) || {};
  } catch (e) {
    cache = {};
  }
  switch (cache.type) {
    case typeof "":
      cache.data = String(cache.data);
      break;
    case typeof null:
      cache.data = null;
      break;
    case typeof {}:
      break;
    case typeof undefined:
      cache.data = undefined;
      break;
    case typeof 0:
      break;
    default:
      break;
  }
  const data = cache.data;
  if (cache.expire <= new Date().getTime()) {
    return null;
  } else {
    return data;
  }
}
function getMemoryCache(key) {
  const data = MemoryCache[key];
  if (!data || data.expire <= new Date().getTime()) {
    return null;
  } else {
    return data.data;
  }
}

function setMemoryCache(key, data, expire) {
  MemoryCache[key] = {
    data: data,
    expire: expire,
  };
}

export function cache(key, data, expire = new Date().getTime() + 500_000) {
  //本地缓存
  setSessionStorage(key, data, expire);
  //内存缓存
  setMemoryCache(key, data, expire);
}

export function retrieve(key) {
  return getMemoryCache(key) || getSessionStorage(key);
}

export function invalidateAll() {
  Object.keys(MemoryCache).forEach((key) => {
    MemoryCache[key] = undefined;
  });
  sessionStorage.clear();
}

export function cacheNetworkData(option, data, expire) {
  cache(getKeyFromOption(option), data, expire);
}

export function retrieveNetworkData(option) {
  return retrieve(getKeyFromOption(option));
}

function getKeyFromOption(option) {
  return hashcode({
    url: option.url,
    method: option.method,
    baseURL: option.baseURL,
    transformRequest: option.transformRequest,
    transformResponse: option.transformResponse,
    headers: option.headers,
    params: option.params,
    paramsSerializer: option.paramsSerializer,
    data: option.data,
    responseType: option.responseType,
  });
}

function hashcode(obj) {
  const str = JSON.stringify(obj);
  let hash = 0,
    i,
    chr,
    len;
  if (str.length === 0) {
    return hash;
  }
  for (i = 0, len = str.length; i < len; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
