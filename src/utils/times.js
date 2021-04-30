import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(isBetween);
dayjs.updateLocale("en", {
  relativeTime: {
    future: "%s后",
    past: "%s前",
    s: "几秒",
    m: "一分钟",
    mm: "%d分钟",
    h: "一小时",
    hh: "%d小时",
    d: "一天",
    dd: "%d天",
    M: "一个月",
    MM: "%d个月",
    y: "一年",
    yy: "%d年",
  },
});

/**
 * 显示两天内的时间差
 * @param timeStr
 * @returns {string}
 */
export function formattedRecentTime(timeStr) {
  let date = dayjs(timeStr);
  let time = date.valueOf();
  let now = dayjs().valueOf();
  let subtract = now - time;
  if (subtract < 0) {
    return "刚刚";
  } else if (subtract < 1000 * 60 * 60 * 48) {
    return date.fromNow();
  } else {
    return date.format("YYYY.MM.DD");
  }
}

export function isTimeBetween(time, start, end) {
  let now = dayjs(time);
  let startTime = dayjs(start);
  let endTime = dayjs(end);
  return now.isBetween(startTime, endTime);
}
export function isTimeAfter(time, end) {
  let now = dayjs(time);
  let endTime = dayjs(end);
  return now.isAfter(endTime);
}

export function isTimeBefore(time, end) {
  let now = dayjs(time);
  let endTime = dayjs(end);
  return now.isBefore(endTime);
}
