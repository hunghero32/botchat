module.exports.config = {
  name: "vú",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "nnl", //thích thay cre ko bố m đã bố thí cho dùng rồi bớt bớt lại nha con chó
  description: "Random nude",
  commandCategory: "hình ảnh",
  usages: "vú",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

const request = require('request');
const fs = require("fs");

module.exports.run = async ({ api, event }) => {
  const axios = require('axios');
  const threadID = event.threadID;

  const imageUrls = await Promise.all(Array.from({ length: 6 }, async () => {
    const res = await axios.get('http://api-vua-trang.tranng123123.repl.co/images/du');
    return res.data.url;

  }));

  const attachments = await Promise.all(imageUrls.map(async (url) => {
    return (await axios({
      url,
      method: "GET",
      responseType: "stream"
    })).data
  }));

  const res = await axios.get(`https://api.apibot.repl.co/thinh`);
  var thinh = res.data.data;
  api.sendMessage({
    body: `🌸 ===『 𝗜𝗠𝗔𝗚𝗘 𝗗𝘂́ 』===🌸
━━━━━━━━━━━━━━━━━━━━
[🎊] → 𝗧𝗵𝗶́𝗻𝗵 : ${thinh}
[🖤] → 𝗔̉𝗻𝗵 𝗗𝘂́ 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗯𝗲̂𝗻 𝗱𝘂̛𝗼̛́𝗶
━━━━━━━━━━━━━━━━━━━━
⚠️ 𝗔̉𝗻𝗵 𝘀𝗲̃ 𝗿𝗮 𝗻𝗴𝗮̂̃𝘂 𝗻𝗵𝗶𝗲̂𝗻 𝘁𝘂̛̀ 𝟭 => 𝟲 𝗮̉𝗻𝗵`,
    attachment: attachments
  }, threadID);
};