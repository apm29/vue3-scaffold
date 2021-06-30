import { reactive } from "vue";

const MemoryCache = reactive({});

const CacheKey = "$_cached_network_data";

/**
 * 私有方法,设置SessionStorage数据
 * @param key
 * @param data
 * @param expire
 */
function setSessionStorage(key, data, expire) {
  const cacheString = sessionStorage.getItem(CacheKey);
  let cache;
  try {
    cache = JSON.parse(cacheString) || {};
  } catch (e) {
    cache = {};
  }
  cache[key] = {
    data: data,
    expire: expire,
  };
  sessionStorage.setItem(CacheKey, JSON.stringify(cache));
}

function getSessionStorage(key) {
  const cacheString = sessionStorage.getItem(CacheKey);
  let cache;
  try {
    cache = JSON.parse(cacheString) || {};
  } catch (e) {
    cache = {};
  }
  const data = cache[key];
  if (!data || data.expire <= new Date().getTime()) {
    return null;
  } else {
    return data.data;
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

export function cacheNetworkData(option, data, expire) {
  cache(hashcode(option), data, expire);
}

export function retrieveNetworkData(option) {
  return retrieve(hashcode(option));
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
