import { isWeiXin } from "@/utils/navigator";
import { getAppId, getSchoolCode } from "@/utils/session.utils";
import { getWxConfig } from "@/api/wechat";

export function configWxShare(title, url, img) {
  if (isWeiXin() && window["wx"]) {
    window["wx"].ready(function () {
      let img = img || `http://wx.zjtvu.edu.cn/logo.png`;
      let replaceParamVal = function (oldUrl, paramName, replaceWith) {
        let re = eval(`/(${paramName}=)([^&]*)/gi`);
        return oldUrl.replace(re, `${paramName}=${replaceWith}`);
      };
      let title = title || document.title;
      let url = url || window.location.href;
      //url中的s值替换为本地学校
      if (url.indexOf("&s=") > -1) {
        url = replaceParamVal(url, "s", getSchoolCode());
      } else {
        url += "&s=" + getSchoolCode();
      }
      window["wx"].updateAppMessageShareData({
        title: title, // 分享标题
        desc: title, // 分享描述
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: img, // 分享图标
      });
      window["wx"].updateTimelineShareData({
        title: title, // 分享标题
        desc: title,
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: img, // 分享图标
      });
      window["wx"].onMenuShareTimeline({
        title: title,
        link: url,
        imgUrl: img,
      });
      window["wx"].onMenuShareAppMessage({
        title: title,
        desc: title,
        link: url,
        imgUrl: img,
      });
      window["wx"].onMenuShareQQ({
        title: title,
        desc: title,
        link: url,
        imgUrl: img,
      });
      window["wx"].onMenuShareWeibo({
        title: title,
        desc: title,
        link: url,
        imgUrl: img,
      });
      window["wx"].onMenuShareQZone({
        title: title,
        desc: title,
        link: url,
        imgUrl: img,
      });
    });
  }
}

export async function wxConfig() {
  //微信配置
  try {
    let data = (await getWxConfig()) || {};
    if (window["wx"]) {
      //alert(`appId:${getAppId()},timestamp:${data.timestamp},nonceStr:${data.nonceStr},signature:${data.signature}`)
      window["wx"].config({
        debug: false,
        appId: getAppId(),
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: [
          "closeWindow",
          "chooseImage",
          "uploadImage",
          "updateAppMessageShareData",
          "updateTimelineShareData",
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "onMenuShareWeibo",
          "onMenuShareQZone",
          "openLocation",
          "getLocation",
          "updateAppMessageShareData",
          "updateTimelineShareData",
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "scanQRCode",
        ],
      });
      window["wx"].ready(function () {
        console.log("WX-CONFIG READY");
      });
      window["wx"].error(function (error) {
        console.log("WX-CONFIG ERROR");
        console.warn(error);
      });
    }
  } catch (e) {
    console.warn("微信Config失败");
    console.warn(e);
  }
}
