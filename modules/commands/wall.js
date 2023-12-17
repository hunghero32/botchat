const axios = require("axios");
const fs = require("fs");
module.exports.config = {
	name: "wall",
	version: "0.0.1",
	hasPermssion: 1,
	credits: "Tpk - táo/mod by tobi",
	description: "Cap màn hình",
	commandCategory: "Tiện ích",
    cooldowns: 5
}
module.exports.onLoad = async () => {
    const { existsSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];

    const path = resolve(__dirname, "cache", "pornlist.txt");

    if (!existsSync(path)) return await global.utils.downloadFile("https://raw.githubusercontent.com/blocklistproject/Lists/master/porn.txt", path);
    else return;
}

module.exports.run = async ({ event, api, args, Currencies }) => {
  const request = require("request");
const fs = require("fs");

   const { threadID, messageID, senderID } = event;
    var cc = [
      "https://i.imgur.com/gFj89D4.jpeg",
"https://i.imgur.com/8AKZQW7.jpeg",
      "https://i.imgur.com/udRRKTq.jpeg",
"https://i.imgur.com/n7DNce1.jpeg",
      "https://i.imgur.com/hbYSOfj.jpeg",
      "https://i.imgur.com/eUOsF7F.jpeg",
              ];
let image = [];
 for(let i = 0; i < 6; i++) {
    const stream = (await axios.get(cc[i], {
        responseType: "stream"
    })).data;
    image.push(stream);
};
  const ccc = {
    body: `🌐==== [ 𝗖𝗔𝗣 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 ] ====🌐
━━━━━━━━━━━━━━━━━━
[👉]➜ 𝗗𝘂̛𝗼̛́𝗶 𝗹𝗮̀ 𝗰𝗮́𝗰 𝗹𝗼𝗮̣𝗶 𝗰𝗮𝗽 𝗯𝗮̣𝗻 𝗵𝗮̃𝘆 𝗰𝗵𝗼̣𝗻
𝟭. 𝗰𝗮𝗽 𝘄𝗮𝗹𝗹 𝗱𝗮̣𝗻𝗴 đ𝗶𝗲̣̂𝗻 𝘁𝗵𝗼𝗮̣𝗶 𝗻𝗲̂̀𝗻 𝘁𝗿𝗮̆́𝗻𝗴 ⚪
𝟮. 𝗰𝗮𝗽 𝘄𝗮𝗹𝗹 𝗱𝗮̣𝗻𝗴 𝗻𝗲̂̀𝗻 𝗽𝗰 𝗻𝗲̂̀𝗻 𝘁𝗿𝗮̆́𝗻𝗴 ⚪
𝟑. 𝐂𝐚𝐩 𝐰𝐚𝐥𝐥 𝐝𝐚̣𝐧𝐠 𝐢𝐩𝐚𝐝 𝐧𝐞̂̀𝐧 𝐭𝐫𝐚̆́𝐧𝐠 ⚪
𝟒. 𝗖𝗮𝗽 𝘄𝗮𝗹𝗹 𝗱𝗮̣𝗻𝗴 đ𝗶𝗲̣̂𝗻 𝘁𝗵𝗼𝗮̣𝗶 𝗻𝗲̂̀𝗻 đ𝗲𝗻 🖤
𝟓. 𝗖𝗮𝗽 𝘄𝗮𝗹𝗹 𝗱𝗮̣𝗻𝗴 𝗽𝗰 𝗻𝗲̂̀𝗻 đ𝗲𝗻 🖤
𝟔. 𝐂𝐚𝐩 𝐰𝐚𝐥𝐥 𝐝𝐚̣𝐧𝐠 𝐢𝐩𝐚𝐝 𝐧𝐞̂̀𝐧 đ𝐞𝐧 🖤
[⚠️]➜ 𝗥𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝗸𝗲̀𝗺 𝘀𝗼̂́ 𝘁𝗵𝘂̛́ 𝘁𝘂̛̣ đ𝗲̂̉ 𝗰𝗵𝗼̣𝗻
 `,
    attachment: image
};
    if (!args[0]) {        
        return api.sendMessage(ccc, event.threadID, (error, info) => {
        
            global.client.handleReply.push({
                type: "choosee",
                name: this.config.name,
                author: event.senderID,
                messageID: info.messageID
            })
        })
    }
}
    module.exports.handleReply = async function ({
    args,
    event,
    Users,
    api,
    handleReply,
    Currencies,
    __GLOBAL
}) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const request = require("request");
  let data = (await Currencies.getData(event.senderID)).ghepTime;
 
    
    switch (handleReply.type) {
         case "choosee": {
       switch (event.body) {
        case "0": {
         const axios = require('axios');
          const moment = require("moment-timezone");
  const tpkk = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
  let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
       api.unsendMessage(handleReply.messageID);
    api.sendMessage({body: `[⏳]➜ đ𝗼̛̣𝗶 𝘁𝗶́ 𝗻𝗵𝗮 ${name} 𝗯𝗼𝘁 đ𝗮𝗻𝗴 𝗰𝗮𝗽`, mentions}, event.threadID, event.messageID);
   if (Object.keys(event.mentions).length == 1) {
      var uid = Object.keys(event.mentions)[0];
    }
  else {
          var uid = event.senderID;
    }`sb=riuUZI1belsWU97s_4CIY-wE;datr=8H2VZJVxDYmMYrGwPAlTVFae;wd=1366x649;c_user=100065602475816;xs=42%3A8E4UR00SO1cZIQ%3A2%3A1688620135%3A-1%3A6334;fr=06A3xGQhC1NzTFzrg.AWU2fGSKe4oX7SzYisIm-H-gk0k.Bkpkdj.DB.AAA.0.0.Bkpk-2.AWVv5CXjGrs;`,
    vaildItems = ['sb', 'datr', 'c_user', 'xs', 'm_pixel_ratio', 'locale', 'wd', 'fr', 'presence', 'xs', 'm_page_voice', 'fbl_st', 'fbl_ci', 'fbl_cs', 'vpd', 'wd', 'fr', 'presence'];
    var cookie = `sb=riuUZI1belsWU97s_4CIY-wE;datr=8H2VZJVxDYmMYrGwPAlTVFae;wd=1366x649;c_user=100065602475816;xs=42%3A8E4UR00SO1cZIQ%3A2%3A1688620135%3A-1%3A6334;fr=06A3xGQhC1NzTFzrg.AWU2fGSKe4oX7SzYisIm-H-gk0k.Bkpkdj.DB.AAA.0.0.Bkpk-2.AWVv5CXjGrs;`;
    cookies.split(';').forEach(item => {
        var data = item.split('=');
        if (vaildItems.includes(data[0])) cookie += `${data[0]}=${data[1]};`;
    });
    var url = encodeURI(encodeURI((`https://apicap.vorhaidang0123.repl.co/screenshot/${uid}/${cookie}`))),
        path = __dirname + `/cache/${uid}.png`;
    axios({
        method: "GET",
        url: `https://api.screenshotmachine.com/?key=a1bbf7&url=${url}&dimension=480x800`,
        responseType: "arraybuffer"
    }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        api.sendMessage({body: `‎🌐==== [ 𝗖𝗔𝗣 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 ] ====🌐
━━━━━━━━━━━━━━━━━━━
[🌸]➜ 𝗕𝗼𝘁 𝘃𝘂̛̀𝗮 𝗰𝗮𝗽 𝘅𝗼𝗻𝗴 𝘆𝗲̂𝘂 𝗰𝘂̉𝗮 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻
━━━━━━━━━━━━━━━━━━━
[⚜️]➜ 𝗖𝗮𝗽 𝘄𝗮𝗹𝗹 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗱𝗮̣𝗻𝗴 𝗽𝗰 𝗻𝗲̂̀𝗻 𝘁𝗿𝗮̆́𝗻𝗴 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 đ𝗮̂𝘆`,mentions, attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    }).catch(err => console.log(err));
        };
           break;
        case "1": {
          const axios = require('axios');
          api.unsendMessage(handleReply.messageID);
const moment = require("moment-timezone");
  const tpkk = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
  let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
       api.unsendMessage(handleReply.messageID);
    api.sendMessage({body: `[⏳]➜ đ𝗼̛̣𝗶 𝘁𝗶́ 𝗻𝗵𝗮 ${name} 𝗯𝗼𝘁 đ𝗮𝗻𝗴 𝗰𝗮𝗽`, mentions}, event.threadID, event.messageID);
   if (Object.keys(event.mentions).length == 1) {
      var uid = Object.keys(event.mentions)[0];
    }
  else {
          var uid = event.senderID;
    }
    var cookies = `sb=riuUZI1belsWU97s_4CIY-wE;datr=8H2VZJVxDYmMYrGwPAlTVFae;wd=1366x649;c_user=100065602475816;xs=42%3A8E4UR00SO1cZIQ%3A2%3A1688620135%3A-1%3A6334;fr=06A3xGQhC1NzTFzrg.AWU2fGSKe4oX7SzYisIm-H-gk0k.Bkpkdj.DB.AAA.0.0.Bkpk-2.AWVv5CXjGrs;`,
    vaildItems = ['sb', 'datr', 'c_user', 'xs', 'm_pixel_ratio', 'locale', 'wd', 'fr', 'presence', 'xs', 'm_page_voice', 'fbl_st', 'fbl_ci', 'fbl_cs', 'vpd', 'wd', 'fr', 'presence'];
    var cookie = `sb=riuUZI1belsWU97s_4CIY-wE;datr=8H2VZJVxDYmMYrGwPAlTVFae;wd=1366x649;c_user=100065602475816;xs=42%3A8E4UR00SO1cZIQ%3A2%3A1688620135%3A-1%3A6334;fr=06A3xGQhC1NzTFzrg.AWU2fGSKe4oX7SzYisIm-H-gk0k.Bkpkdj.DB.AAA.0.0.Bkpk-2.AWVv5CXjGrs;`;
    cookies.split(';').forEach(item => {
        var data = item.split('=');
        if (vaildItems.includes(data[0])) cookie += `${data[0]}=${data[1]};`;
    });
    var url = encodeURI(encodeURI((`https://apicap.vorhaidang0123.repl.co/screenshot/${uid}/${cookie}`))),
        path = __dirname + `/cache/${uid}.png`;
    axios({
        method: "GET",
        url: `https://api.screenshotmachine.com/?key=a1bbf7&url=${url}&dimension=480x800`,
        responseType: "arraybuffer"
    }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        api.sendMessage({body: `‎🌐==== [ 𝗖𝗔𝗣 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 ] ====🌐
━━━━━━━━━━━━━━━━━━━
[🌸]➜ 𝗕𝗼𝘁 𝘃𝘂̛̀𝗮 𝗰𝗮𝗽 𝘅𝗼𝗻𝗴 𝘆𝗲̂𝘂 𝗰𝘂̉𝗮 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻
━━━━━━━━━━━━━━━━━━━
[⚜️]➜ 𝗖𝗮𝗽 𝘄𝗮𝗹𝗹 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗱𝗮̣𝗻𝗴 𝗽𝗰 𝗻𝗲̂̀𝗻 𝘁𝗿𝗮̆́𝗻𝗴 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 đ𝗮̂𝘆`,mentions, attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    }).catch(err => console.log(err));
        };
            break;
        case "2": {
          const axios = require('axios');
          api.unsendMessage(handleReply.messageID);
const moment = require("moment-timezone");
  const tpkk = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
  let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
       api.unsendMessage(handleReply.messageID);
    api.sendMessage({body: `[⏳]➜ đ𝗼̛̣𝗶 𝘁𝗶́ 𝗻𝗵𝗮 ${name} 𝗯𝗼𝘁 đ𝗮𝗻𝗴 𝗰𝗮𝗽`, mentions}, event.threadID, event.messageID);
   if (Object.keys(event.mentions).length == 1) {
      var uid = Object.keys(event.mentions)[0];
    }
  else {
          var uid = event.senderID;
    }
    var cookies = `sb=riuUZI1belsWU97s_4CIY-wE;datr=8H2VZJVxDYmMYrGwPAlTVFae;wd=1366x649;c_user=100065602475816;xs=42%3A8E4UR00SO1cZIQ%3A2%3A1688620135%3A-1%3A6334;fr=06A3xGQhC1NzTFzrg.AWU2fGSKe4oX7SzYisIm-H-gk0k.Bkpkdj.DB.AAA.0.0.Bkpk-2.AWVv5CXjGrs;`,
    vaildItems = ['sb', 'datr', 'c_user', 'xs', 'm_pixel_ratio', 'locale', 'wd', 'fr', 'presence', 'xs', 'm_page_voice', 'fbl_st', 'fbl_ci', 'fbl_cs', 'vpd', 'wd', 'fr', 'presence'];
    var cookie = `sb=riuUZI1belsWU97s_4CIY-wE;datr=8H2VZJVxDYmMYrGwPAlTVFae;wd=1366x649;c_user=100065602475816;xs=42%3A8E4UR00SO1cZIQ%3A2%3A1688620135%3A-1%3A6334;fr=06A3xGQhC1NzTFzrg.AWU2fGSKe4oX7SzYisIm-H-gk0k.Bkpkdj.DB.AAA.0.0.Bkpk-2.AWVv5CXjGrs;`;
    cookies.split(';').forEach(item => {
        var data = item.split('=');
        if (vaildItems.includes(data[0])) cookie += `${data[0]}=${data[1]};`;
    });
    var url = encodeURI(encodeURI((`https://apicap.vorhaidang0123.repl.co/screenshot/${uid}/${cookie}`))),
        path = __dirname + `/cache/${uid}.png`;
    axios({
        method: "GET",
        url: `https://api.screenshotmachine.com/?key=a1bbf7&url=${url}&dimension=1920x1080`,
        responseType: "arraybuffer"
    }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        api.sendMessage({body: `‎🌐==== [ 𝗖𝗔𝗣 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 ] ====🌐
━━━━━━━━━━━━━━━━━━━
[🌸]➜ 𝗕𝗼𝘁 𝘃𝘂̛̀𝗮 𝗰𝗮𝗽 𝘅𝗼𝗻𝗴 𝘆𝗲̂𝘂 𝗰𝘂̉𝗮 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻
━━━━━━━━━━━━━━━━━━━
[⚜️]➜ 𝗖𝗮𝗽 𝘄𝗮𝗹𝗹 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗱𝗮̣𝗻𝗴 𝗽𝗰 𝗻𝗲̂̀𝗻 𝘁𝗿𝗮̆́𝗻𝗴 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 đ𝗮̂𝘆`,mentions, attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    }).catch(err => console.log(err));
        };
            break;
        case "4": {
          const axios = require('axios');
          api.unsendMessage(handleReply.messageID);
const moment = require("moment-timezone");
  const tpkk = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
  let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
       api.unsendMessage(handleReply.messageID);
    api.sendMessage({body: `[⏳]➜ đ𝗼̛̣𝗶 𝘁𝗶́ 𝗻𝗵𝗮 ${name} 𝗯𝗼𝘁 đ𝗮𝗻𝗴 𝗰𝗮𝗽`, mentions}, event.threadID, event.messageID);
   if (Object.keys(event.mentions).length == 1) {
      var uid = Object.keys(event.mentions)[0];
    }
  else {
          var uid = event.senderID;
    }
    var cookies = `sb=riuUZI1belsWU97s_4CIY-wE;datr=8H2VZJVxDYmMYrGwPAlTVFae;wd=1366x649;c_user=100065602475816;xs=42%3A8E4UR00SO1cZIQ%3A2%3A1688620135%3A-1%3A6334;fr=06A3xGQhC1NzTFzrg.AWU2fGSKe4oX7SzYisIm-H-gk0k.Bkpkdj.DB.AAA.0.0.Bkpk-2.AWVv5CXjGrs;
 `,
    vaildItems = ['sb', 'datr', 'c_user', 'xs', 'm_pixel_ratio', 'locale', 'wd', 'fr', 'presence', 'xs', 'm_page_voice', 'fbl_st', 'fbl_ci', 'fbl_cs', 'vpd', 'wd', 'fr', 'presence'];
    var cookie = `sb=riuUZI1belsWU97s_4CIY-wE;datr=8H2VZJVxDYmMYrGwPAlTVFae;wd=1366x649;c_user=100065602475816;xs=42%3A8E4UR00SO1cZIQ%3A2%3A1688620135%3A-1%3A6334;fr=06A3xGQhC1NzTFzrg.AWU2fGSKe4oX7SzYisIm-H-gk0k.Bkpkdj.DB.AAA.0.0.Bkpk-2.AWVv5CXjGrs;
`;
    cookies.split(';').forEach(item => {
        var data = item.split('=');
        if (vaildItems.includes(data[0])) cookie += `${data[0]}=${data[1]};`;
    });
    var url = encodeURI(encodeURI((`https://apicap.vorhaidang0123.repl.co/screenshot/${uid}/${cookie}`))),
        path = __dirname + `/cache/${uid}.png`;
    axios({
        method: "GET",
        url: `
        https://api.screenshotmachine.com/?key=a1bbf7&url=${url}&dimension=480x800`,
        responseType: "arraybuffer"
    }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        api.sendMessage({body: `‎🌐==== [ 𝗖𝗔𝗣 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 ] ====🌐
━━━━━━━━━━━━━━━━━━━
[🌸]➜ 𝗕𝗼𝘁 𝘃𝘂̛̀𝗮 𝗰𝗮𝗽 𝘅𝗼𝗻𝗴 𝘆𝗲̂𝘂 𝗰𝘂̉𝗮 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻
━━━━━━━━━━━━━━━━━━━
[⚜️]➜ 𝗖𝗮𝗽 𝘄𝗮𝗹𝗹 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗱𝗮̣𝗻𝗴 đ𝗶𝗲̣̂𝗻 𝘁𝗵𝗼𝗮̣𝗶 𝗻𝗲̂̀𝗻 đ𝗲𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 đ𝗮̂𝘆`,mentions, attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    }).catch(err => console.log(err));
        };
            break;
        case "5": {
          const axios = require('axios');
          api.unsendMessage(handleReply.messageID);
const moment = require("moment-timezone");
  const tpkk = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
  let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
       api.unsendMessage(handleReply.messageID);
    api.sendMessage({body: `[⏳]➜ đ𝗼̛̣𝗶 𝘁𝗶́ 𝗻𝗵𝗮 ${name} 𝗯𝗼𝘁 đ𝗮𝗻𝗴 𝗰𝗮𝗽`, mentions}, event.threadID, event.messageID);
   if (Object.keys(event.mentions).length == 1) {
      var uid = Object.keys(event.mentions)[0];
    }
  else {
          var uid = event.senderID;
    }
    var cookies = `sb=riuUZI1belsWU97s_4CIY-wE;datr=8H2VZJVxDYmMYrGwPAlTVFae;wd=1366x649;c_user=100065602475816;xs=42%3A8E4UR00SO1cZIQ%3A2%3A1688620135%3A-1%3A6334;fr=06A3xGQhC1NzTFzrg.AWU2fGSKe4oX7SzYisIm-H-gk0k.Bkpkdj.DB.AAA.0.0.Bkpk-2.AWVv5CXjGrs;`,
    vaildItems = ['sb', 'datr', 'c_user', 'xs', 'm_pixel_ratio', 'locale', 'wd', 'fr', 'presence', 'xs', 'm_page_voice', 'fbl_st', 'fbl_ci', 'fbl_cs', 'vpd', 'wd', 'fr', 'presence'];
    var cookie = `sb=riuUZI1belsWU97s_4CIY-wE;datr=8H2VZJVxDYmMYrGwPAlTVFae;wd=1366x649;c_user=100065602475816;xs=42%3A8E4UR00SO1cZIQ%3A2%3A1688620135%3A-1%3A6334;fr=06A3xGQhC1NzTFzrg.AWU2fGSKe4oX7SzYisIm-H-gk0k.Bkpkdj.DB.AAA.0.0.Bkpk-2.AWVv5CXjGrs;`;
    cookies.split(';').forEach(item => {
        var data = item.split('=');
        if (vaildItems.includes(data[0])) cookie += `${data[0]}=${data[1]};`;
    });
    var url = encodeURI(encodeURI((`https://apicap.vorhaidang0123.repl.co/screenshot/${uid}/${cookie}`))),
        path = __dirname + `/cache/${uid}.png`;
    axios({
        method: "GET",
        url: `
        https://api.screenshotmachine.com/?key=a1bbf7&url=${url}&dimension=1920x1080`,
        responseType: "arraybuffer"
    }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        api.sendMessage({body: `🌐==== [ 𝗖𝗔𝗣 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 ] ====🌐
━━━━━━━━━━━━━━━━━━━
[🌸]➜ 𝗕𝗼𝘁 𝘃𝘂̛̀𝗮 𝗰𝗮𝗽 𝘅𝗼𝗻𝗴 𝘆𝗲̂𝘂 𝗰𝘂̉𝗮 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻
━━━━━━━━━━━━━━━━━━━
[⚜️]➜ 𝗖𝗮𝗽 𝘄𝗮𝗹𝗹 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗱𝗮̣𝗻𝗴 𝗽𝗰 𝗻𝗲̂̀𝗻 đ𝗲𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 đ𝗮̂𝘆`,mentions, attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    }).catch(err => console.log(err));
          }
             break;
        case "3": {
          const axios = require('axios');
          api.unsendMessage(handleReply.messageID);
const moment = require("moment-timezone");
  const tpkk = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
  let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
       api.unsendMessage(handleReply.messageID);
    api.sendMessage({body: `[⏳]➜ đ𝗼̛̣𝗶 𝘁𝗶́ 𝗻𝗵𝗮 ${name} 𝗯𝗼𝘁 đ𝗮𝗻𝗴 𝗰𝗮𝗽`, mentions}, event.threadID, event.messageID);
   if (Object.keys(event.mentions).length == 1) {
      var uid = Object.keys(event.mentions)[0];
    }
  else {
          var uid = event.senderID;
    }
    var cookies = `sb=riuUZI1belsWU97s_4CIY-wE;datr=8H2VZJVxDYmMYrGwPAlTVFae;wd=1366x649;c_user=100065602475816;xs=42%3A8E4UR00SO1cZIQ%3A2%3A1688620135%3A-1%3A6334;fr=06A3xGQhC1NzTFzrg.AWU2fGSKe4oX7SzYisIm-H-gk0k.Bkpkdj.DB.AAA.0.0.Bkpk-2.AWVv5CXjGrs; `,
    vaildItems = ['sb', 'datr', 'c_user', 'xs', 'm_pixel_ratio', 'locale', 'wd', 'fr', 'presence', 'xs', 'm_page_voice', 'fbl_st', 'fbl_ci', 'fbl_cs', 'vpd', 'wd', 'fr', 'presence'];
    var cookie = `sb=riuUZI1belsWU97s_4CIY-wE;datr=8H2VZJVxDYmMYrGwPAlTVFae;wd=1366x649;c_user=100065602475816;xs=42%3A8E4UR00SO1cZIQ%3A2%3A1688620135%3A-1%3A6334;fr=06A3xGQhC1NzTFzrg.AWU2fGSKe4oX7SzYisIm-H-gk0k.Bkpkdj.DB.AAA.0.0.Bkpk-2.AWVv5CXjGrs;`;
    cookies.split(';').forEach(item => {
        var data = item.split('=');
        if (vaildItems.includes(data[0])) cookie += `${data[0]}=${data[1]};`;
    });
    var url = encodeURI(encodeURI((`https://apicap.vorhaidang0123.repl.co/screenshot/${uid}/${cookie}`))),
        path = __dirname + `/cache/${uid}.png`;
    axios({
        method: "GET",
        url: `https://api.screenshotmachine.com/?key=a1bbf7&url=${url}&dimension=1500x1500`,
        responseType: "arraybuffer"
    }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        api.sendMessage({body: `‎🌐==== [ 𝗖𝗔𝗣 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 ] ====🌐
━━━━━━━━━━━━━━━━━━━
[🌸]➜ 𝗕𝗼𝘁 𝘃𝘂̛̀𝗮 𝗰𝗮𝗽 𝘅𝗼𝗻𝗴 𝘆𝗲̂𝘂 𝗰𝘂̉𝗮 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻
━━━━━━━━━━━━━━━━━━━
[⚜️]➜ 𝗖𝗮𝗽 𝘄𝗮𝗹𝗹 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗱𝗮̣𝗻𝗴 𝗽𝗰 𝗻𝗲̂̀𝗻 𝘁𝗿𝗮̆́𝗻𝗴 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 đ𝗮̂𝘆`,mentions, attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    }).catch(err => console.log(err));
        };
             break;
        case "6": {
          const axios = require('axios');
          api.unsendMessage(handleReply.messageID);
const moment = require("moment-timezone");
  const tpkk = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
  let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
       api.unsendMessage(handleReply.messageID);
    api.sendMessage({body: `[⏳]➜ đ𝗼̛̣𝗶 𝘁𝗶́ 𝗻𝗵𝗮 ${name} 𝗯𝗼𝘁 đ𝗮𝗻𝗴 𝗰𝗮𝗽`, mentions}, event.threadID, event.messageID);
   if (Object.keys(event.mentions).length == 1) {
      var uid = Object.keys(event.mentions)[0];
    }
  else {
          var uid = event.senderID;
    }
    var cookies = `sb=riuUZI1belsWU97s_4CIY-wE;datr=8H2VZJVxDYmMYrGwPAlTVFae;wd=1366x649;c_user=100065602475816;xs=42%3A8E4UR00SO1cZIQ%3A2%3A1688620135%3A-1%3A6334;fr=06A3xGQhC1NzTFzrg.AWU2fGSKe4oX7SzYisIm-H-gk0k.Bkpkdj.DB.AAA.0.0.Bkpk-2.AWVv5CXjGrs;`,
    vaildItems = ['sb', 'datr', 'c_user', 'xs', 'm_pixel_ratio', 'locale', 'wd', 'fr', 'presence', 'xs', 'm_page_voice', 'fbl_st', 'fbl_ci', 'fbl_cs', 'vpd', 'wd', 'fr', 'presence'];
    var cookie = `sb=riuUZI1belsWU97s_4CIY-wE;datr=8H2VZJVxDYmMYrGwPAlTVFae;wd=1366x649;c_user=100065602475816;xs=42%3A8E4UR00SO1cZIQ%3A2%3A1688620135%3A-1%3A6334;fr=06A3xGQhC1NzTFzrg.AWU2fGSKe4oX7SzYisIm-H-gk0k.Bkpkdj.DB.AAA.0.0.Bkpk-2.AWVv5CXjGrs;`;
    cookies.split(';').forEach(item => {
        var data = item.split('=');
        if (vaildItems.includes(data[0])) cookie += `${data[0]}=${data[1]};`;
    });
    var url = encodeURI(encodeURI((`https://apicap.vorhaidang0123.repl.co/screenshot/${uid}/${cookie}`))),
        path = __dirname + `/cache/${uid}.png`;
    axios({
        method: "GET",
        url: `https://api.screenshotmachine.com/?key=a1bbf7&url=${url}&dimension=1500x1500`,
        responseType: "arraybuffer"
    }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        api.sendMessage({body: `‎🌐==== [ 𝗖𝗔𝗣 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 ] ====🌐
━━━━━━━━━━━━━━━━━━━
[🌸]➜ 𝗕𝗼𝘁 𝘃𝘂̛̀𝗮 𝗰𝗮𝗽 𝘅𝗼𝗻𝗴 𝘆𝗲̂𝘂 𝗰𝘂̉𝗮 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻
━━━━━━━━━━━━━━━━━━━
[⚜️]➜ 𝗖𝗮𝗽 𝘄𝗮𝗹𝗹 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗱𝗮̣𝗻𝗴 𝗽𝗰 𝗻𝗲̂̀𝗻 𝘁𝗿𝗮̆́𝗻𝗴 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 đ𝗮̂𝘆`,mentions, attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    }).catch(err => console.log(err));
        };
            break;
					default:
           const choose = parseInt(event.body);
            	if (isNaN(event.body)) return api.sendMessage("n", event.threadID, event.messageID);
            	if (choose > 2 || choose < 1) return api.sendMessage("u", event.threadID, event.messageID); 
    }
    }
}
                         }