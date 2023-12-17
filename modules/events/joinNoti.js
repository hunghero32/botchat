module.exports.config = {
    name: "join",
    eventType: ['log:subscribe'],
    version: "1.0.0",
    credits: "Mirai-Team",//inspire by miraibot,//Mod thêm by Nguyễn Sơn
    description: "GROUP UPDATE NOTIFICATION"
};
const fs = require('fs-extra');
const { loadImage, createCanvas, registerFont } = require("canvas");
const request = require('request');
const { join } = require('path');
const axios = require('axios');
const jimp = require("jimp")
const fontlink = 'https://drive.google.com/u/0/uc?id=1ZwFqYB-x6S9MjPfYm3t3SP1joohGl4iw&export=download'
module.exports.circle = async (image) => {
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
  }
module.exports.run = async function({ api, event, Users }) {
   var fullYear = global.client.getTime("fullYear");
    var getHours = await global.client.getTime("hours");
      var session = `${getHours < 3 ? "𝐁𝐮𝐨̂̉𝐢 𝐓𝐨̂́𝐢" : getHours < 8 ? "𝐁𝐮𝐨̂̉𝐢 𝐒𝐚́𝐧𝐠" : getHours < 12 ? "𝐁𝐮𝐨̂̉𝐢 𝐓𝐫𝐮̛𝐚" : getHours < 17 ? "𝐁𝐮𝐨̂̉𝐢 𝐂𝐡𝐢𝐞̂̀𝐮" : getHours < 23 ? "𝐁𝐮𝐨̂̉𝐢 𝐓𝐨̂́𝐢" : "𝐁𝐮𝐨̂̉𝐢 𝐓𝐨̂́𝐢"}`
  const { threadID } = event;
  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "🎀HuyBao🎀" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
    return api.sendMessage("", event.threadID, () => api.sendMessage({ body: `====『 𝗞𝗘̂́𝗧 𝗡𝗢̂́𝗜 𝗩𝗢̛́𝗜 𝗕𝗢𝗫 』===\n━━━━━━━━━━━━━━━━\n→『❗』𝗣𝗿𝗲𝗳𝗶𝘅 𝗕𝗼𝘁 𝗟𝗮̀: [ / ]\n→『🔎』𝗧𝗼̂̉𝗻𝗴 𝗹𝗲̣̂𝗻𝗵: [ 2𝘅𝘅 ]\n━━━━━━━━━━━━━━━━\n→ 『📤』𝗗𝘂̀𝗻𝗴 𝗹𝗲̣̂𝗻𝗵 /𝗰𝗮𝗹𝗹𝗮𝗱 + 𝗻𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 𝗺𝘂𝗼̂́𝗻 𝗻𝗵𝗮̆́𝗻 𝗴𝘂̛̉𝗶 𝘁𝗼̛́𝗶 𝗮𝗱𝗺𝗶𝗻\n→ 『🎀』Đ𝗲̂̉ 𝘅𝗲𝗺 𝘁𝗮̂́𝘁 𝗰𝗮̉ 𝗹𝗲̣̂𝗻𝗵 𝗱𝘂̀𝗻𝗴 /𝗺𝗲𝗻𝘂 𝗮𝗹𝗹 𝗵𝗼𝗮̣̆𝗰 /𝗵𝗲𝗹𝗽\n→ 『🧸』𝗖𝗵𝘂́𝗰 𝗰𝗮́𝗰 𝗯𝗮̣𝗻 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 𝗯𝗼𝘁 𝘃𝘂𝗶 𝘃𝗲̉\n━━━━━━━━━━━━━━━━\n→ 『🌐』𝗙𝗯 𝗔𝗱𝗺𝗶𝗻:\nfb.com/hunghero32`, attachment: fs.createReadStream(__dirname + "/cache/joinMp4/hi.gif") }, threadID));
  }
  else {
    try {
        if(!fs.existsSync(__dirname+`/cache/Semi.ttf`)) { 
        let getfont = (await axios.get(fontlink, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(__dirname+`/cache/Semi.ttf`, Buffer.from(getfont, "utf-8"));
        };
      const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
      let { threadName, participantIDs } = await api.getThreadInfo(threadID);
      const moment = require("moment-timezone");
      const hours = moment.tz("Asia/Ho_Chi_Minh").format("HH");
      const time = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
      const threadData = global.data.threadData.get(parseInt(threadID)) || {};
      var mentions = [], nameArray = [], memLength = [], iduser = [], i = 0;
      var abx = [];
      for (id in event.logMessageData.addedParticipants) {
        const userName = event.logMessageData.addedParticipants[id].fullName; iduser.push(event.logMessageData.addedParticipants[id].userFbId.toString());
        nameArray.push(userName);
        mentions.push({ tag: userName, id: event.senderID });
        memLength.push(participantIDs.length - i++);
        console.log(userName)
      }
       // console.log(event.logMessageData.addedParticipants)
        var id = [];
        for(o = 0; o < event.logMessageData.addedParticipants.length; o++){
      let pathImg = __dirname + `/cache/${o}.png`;
    let pathAva = __dirname + `/cache/fbcover2.png`;
    let avtAnime = (await axios.get(encodeURI(
      `https://graph.facebook.com/${event.logMessageData.addedParticipants[o].userFbId}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,{
        headers:{
          cookie:'xs=13%3AlajUELLXiJWSGA%3A2%3A1670218018%3A-1%3A6326;c_user=100026039134645;fr=04yhWc9aZ2jCK6WYB.AWX6H8d2OYiFMQa_tmHEcMP9bNY.BjjYEe.-o.AAA.0.0.BjjYEi.AWW2404AO5I;sb=HoGNYx-MLHOu0FOMeC8kqttW;datr=HoGNY-xBBNLJjRghcnhN1hWA;'
        }
      }), { responseType: "arraybuffer" })).data;
      var ok = [
        'https://i.imgur.com/dDSh0wc.jpeg',
  'https://i.imgur.com/UucSRWJ.jpeg',
  'https://i.imgur.com/OYzHKNE.jpeg',
  'https://i.imgur.com/V5L9dPi.jpeg',
  'https://i.imgur.com/M7HEAMA.jpeg'
               ]
    let background = (await axios.get(encodeURI(`${ok[Math.floor(Math.random() * ok.length)]}`), { responseType: "arraybuffer", })).data;
    fs.writeFileSync(pathAva, Buffer.from(avtAnime, "utf-8"));
    fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
      var avatar = await this.circle(pathAva);
    let baseImage = await loadImage(pathImg);
    let baseAva = await loadImage(avatar);
    registerFont(__dirname+`/cache/Semi.ttf`, {
          family: "Semi"
      });
    let canvas = createCanvas(1902, 1082);
      console.log(canvas.width, canvas.height)
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseAva, canvas.width / 2 - 188, canvas.height / 2 - 375, 375, 355);
    ctx.fillStyle = "#FFF";
    ctx.textAlign = "center";
    ctx.font = `155px Semi`;
    ctx.fillText(`${event.logMessageData.addedParticipants[o].fullName}`, canvas.width / 2 + 20 , canvas.height / 2 + 100);
    ctx.save();
    ctx.font = `75px Semi`;
    ctx.fillText(`Chào mừng ${threadName}`, canvas.width / 2 - 15 , canvas.height / 2 + 235)
    ctx.fillText(`Thành viên thứ ${participantIDs.length - o}`, canvas.width / 2 - 15 , canvas.height / 2 + 350)
    ctx.restore();
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);
    abx.push(fs.createReadStream(__dirname + `/cache/${o}.png`))
        }
        memLength.sort((a, b) => a - b);
      (typeof threadData.customJoin == "undefined") ? msg = "======『 𝗪𝗘𝗖𝗢𝗠𝗘 』======\n━━━━━━━━━━━━━━━━━━\n[👤] → 𝗫𝗶𝗻 𝗰𝗵𝗮̀𝗼「{name}」𝘁𝗼̛́𝗶 𝘃𝗼̛́𝗶 𝗻𝗵𝗼́𝗺 {threadName}\n[🔰] → 𝗟𝗶𝗻𝗸 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞: https://www.facebook.com/profile.php?id={iduser}\n[🍄] → 𝗕𝗮̣𝗻 𝗹𝗮̀ 𝘁𝗵𝗮̀𝗻𝗵 𝘃𝗶𝗲̂𝗻 𝘁𝗵𝘂̛́ {soThanhVien} 𝗰𝘂̉𝗮 𝗻𝗵𝗼́𝗺\n[🧸] → 𝗕𝗮̣𝗻 đ𝘂̛𝗼̛̣𝗰 𝘁𝗵𝗲̂𝗺 𝗯𝗼̛̉𝗶: {author}\n[🌐] → 𝗟𝗶𝗻𝗸 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞: https://www.facebook.com/profile.php?id={uidAuthor}\n Thành vien mới nhớ set biệt danh nha\n━━━━━━━━━━━━━━━━━━\n[⏰] → 𝗕𝗮̂𝘆 𝗴𝗶𝗼̛̀ 𝗹𝗮̀: {time}" : msg = threadData.customJoin;
      var nameAuthor = await Users.getNameUser(event.author)
      msg = msg
        .replace(/\{iduser}/g, iduser.join(', '))
        .replace(/\{name}/g, nameArray.join(', '))
        .replace(/\{type}/g, (memLength.length > 1) ? '𝐂𝐚̣̂𝐮 𝐀̂́𝐲' : '𝐁𝐚̣𝐧 𝐀̂́𝐲')
        .replace(/\{soThanhVien}/g, memLength.join(', '))
        .replace(/\{threadName}/g, threadName)
        .replace(/\{author}/g, nameAuthor)
        .replace(/\{uidAuthor}/g, event.author)
         .replace(/\{buoi}/g, session)
        .replace(/\{time}/g, time);

      var formPush = { body: msg, attachment: abx, mentions }
      api.sendMessage(formPush, threadID);
      for (let ii = 0; ii < parseInt(id.length); ii++) {
        fs.unlinkSync(__dirname + `/cache/${ii}.png`)
    }
    } catch (e) { return console.log(e) };
  }
        }