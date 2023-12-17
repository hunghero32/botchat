module.exports.config = {
  name: "box",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "ProCoderCyrus",
  description: "Các cài đặt của nhóm chat.",
  commandCategory: "Qtv",
  usages: "[id/name/setname/emoji/admin/image/info]",
  cooldowns: 1,
  dependencies: {
    "request": "",
    "fs-extra": "path"
  }
};

const totalPath = __dirname + '/cache/totalChat.json';
const _24hours = 86400000;
const fs = require("fs-extra");

module.exports.handleEvent = async ({
  api,
  event,
  args
}) => {
  if (!fs.existsSync(totalPath)) fs.writeFileSync(totalPath, JSON.stringify({}));
  let totalChat = JSON.parse(fs.readFileSync(totalPath));
  if (!totalChat[event.threadID]) return;
  if (Date.now() - totalChat[event.threadID].time > (_24hours * 2)) {
    let sl = (await api.getThreadInfo(event.threadID)).messageCount;
    totalChat[event.threadID] = {
      time: Date.now() - _24hours,
      count: sl,
      ytd: sl - totalChat[event.threadID].count
    }
    fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
  }
}

module.exports.run = async ({
  api,
  event,
  args,
  Threads,
  Users,
  utils
}) => {
   var fullTime = global.client.getTime("fullTime");
  const request = require("request");
  const {
    resolve
  } = require("path");
  const moment = require("moment-timezone");
  var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
  if (args.length == 0) return api.sendMessage(`=====「 𝗖𝗮́𝗰𝗵 𝗗𝘂̀𝗻𝗴 」=====\n──────────────\n➴ 𝗕𝗼𝘅 𝗶𝗱 => 𝗹𝗮̂́𝘆 𝗶𝗱 𝗰𝘂̉𝗮 𝗻𝗵𝗼́𝗺\n➴ 𝗕𝗼𝘅 𝗻𝗮𝗺𝗲 =>  𝗟𝗮̂́𝘆 𝘁𝗲̂𝗻 𝗻𝗵𝗼́𝗺\n➴ 𝗕𝗼𝘅 𝘀𝗲𝘁𝗻𝗮𝗺𝗲 => Đ𝗼̂̉𝗶 𝘁𝗲̂𝗻 𝗻𝗵𝗼́𝗺\n➴ 𝗕𝗼𝘅 𝗶𝗻𝗳𝗼 => 𝗫𝗲𝗺 𝘁𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻 𝗻𝗵𝗼́𝗺\n──────────────\n➴ 𝗕𝗼𝘅 𝗺𝗲 [𝗮𝗱𝗺𝗶𝗻] => 𝗯𝗼𝘁 𝘀𝗲̃ 𝘁𝗵𝗲̂𝗺 𝗯𝗮̣𝗻 𝗹𝗮̀𝗺 𝗮𝗱𝗺𝗶𝗻 𝗻𝗵𝗼́𝗺\n──────────────\n➴ 𝗕𝗼𝘅 𝗮𝗱𝗺𝗶𝗻 [𝘁𝗮𝗴] => 𝘁𝗵𝗲̂𝗺 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 𝗹𝗲̂𝗻 𝗾𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘃𝗶𝗲̂𝗻\n──────────────\n➴ 𝗕𝗼𝘅 𝗶𝗺𝗮𝗴𝗲 [𝗿𝗲𝗽𝗹𝘆] 𝗮̉𝗻𝗵 𝗰𝗮̂̀𝗻 đ𝗼̂̉𝗶 𝗰𝘂̉𝗮 𝗻𝗵𝗼́𝗺\n──────────────\n`, event.threadID, event.messageID);
 

  if (args[0] == "id") {
    return api.sendMessage(`${event.threadID}`, event.threadID, event.messageID);
  }

  if (args[0] == "name") {
    var nameThread = global.data.threadInfo.get(event.threadID).threadName || ((await Threads.getData(event.threadID)).threadInfo).threadName;
    return api.sendMessage(nameThread, event.threadID, event.messageID);
  }

  if (args[0] == "setname") {
    var content = args.join(" ");
    var c = content.slice(7, 99) || event.messageReply.body;
    api.setTitle(`${c} `, event.threadID);
  }

  if (args[0] == "emoji") {
    const name = args[1] || event.messageReply.body;
    api.changeThreadEmoji(name, event.threadID)

  }

  if (args[0] == "me") {
    if (args[1] == "admin") {
      const threadInfo = await api.getThreadInfo(event.threadID)
      const find = threadInfo.adminIDs.find(el => el.id == api.getCurrentUserID());
      if (!find) api.sendMessage("𝗕𝗢𝗧 𝗰𝗮̂̀𝗻 𝗻𝗲́𝗺 𝗾𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘃𝗶𝗲̂𝗻 đ𝗲̂̉ 𝗱𝘂̀𝗻𝗴 ?", event.threadID, event.messageID)
      else if (!global.config.ADMINBOT.includes(event.senderID)) api.sendMessage("𝗕𝗮̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 đ𝘂̉ 𝗾𝘂𝘆𝗲̂̀𝗻 𝗵𝗮̣𝗻!!!", event.threadID, event.messageID)
      else api.changeAdminStatus(event.threadID, event.senderID, true);
    }
  }

  if (args[0] == "admin") {
    if (args.join().indexOf('@') !== -1) {
      namee = Object.keys(event.mentions)
    } else namee = args[1]
    if (event.messageReply) {
      namee = event.messageReply.senderID
    }

    const threadInfo = await api.getThreadInfo(event.threadID)
    const findd = threadInfo.adminIDs.find(el => el.id == namee);
    const find = threadInfo.adminIDs.find(el => el.id == api.getCurrentUserID());
    const finddd = threadInfo.adminIDs.find(el => el.id == event.senderID);

    if (!finddd) return api.sendMessage("𝗕𝗮̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝗽𝗵𝗮̉𝗶 𝗾𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘃𝗶𝗲̂𝗻 𝗯𝗼𝘅?", event.threadID, event.messageID);
    if (!find) {
      api.sendMessage("𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗻𝗲́𝗺 𝗾𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘃𝗶𝗲̂𝗻 𝗰𝗵𝗼 𝗯𝗼𝘁", event.threadID, event.messageID)
    }
    if (!findd) {
      api.changeAdminStatus(event.threadID, namee, true);
    } else api.changeAdminStatus(event.threadID, namee, false)
  }

  if (args[0] == "image") {
    if (event.type !== "message_reply") return api.sendMessage("❌ 𝗕𝗮̣𝗻 𝗽𝗵𝗮̉𝗶 𝗿𝗲𝗽𝗹𝘆 𝗺𝗼̣̂𝘁 𝗮𝘂𝗱𝗶𝗼, 𝘃𝗶𝗱𝗲𝗼, 𝗮̉𝗻𝗵 𝗻𝗮̀𝗼 đ𝗼́", event.threadID, event.messageID);
    if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage("❌ 𝗕𝗮̣𝗻 𝗽𝗵𝗮̉𝗶 𝗿𝗲𝗽𝗹𝘆 𝗺𝗼̣̂𝘁 𝗮𝘂𝗱𝗶𝗼, 𝘃𝗶𝗱𝗲𝗼, 𝗮̉𝗻𝗵 𝗻𝗮̀𝗼 đ𝗼́", event.threadID, event.messageID);
    if (event.messageReply.attachments.length > 1) return api.sendMessage(`𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗿𝗲𝗽𝗹𝘆 𝗰𝗵𝗶̉ 𝗺𝗼̣̂𝘁 𝗮𝘂𝗱𝗶𝗼, 𝘃𝗶𝗱𝗲𝗼, 𝗮̉𝗻𝗵!`, event.threadID, event.messageID);
    var callback = () => api.changeGroupImage(fs.createReadStream(__dirname + "/cache/1.png"), event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"));
    return request(encodeURI(event.messageReply.attachments[0].url)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
  };

  if (args[0] == "info") {
    const moment = require("moment-timezone");
    var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
    if (!fs.existsSync(totalPath)) fs.writeFileSync(totalPath, JSON.stringify({}));
    let totalChat = JSON.parse(fs.readFileSync(totalPath));
    let threadInfo = await api.getThreadInfo(event.threadID);
    let timeByMS = Date.now();
 const threadSetting = (await Threads.getData(String(event.threadID))).data || 
    {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX 
    : global.config.PREFIX;
    var memLength = threadInfo.participantIDs.length;
    let threadMem = threadInfo.participantIDs.length;
    var nameMen = [];
    var gendernam = [];
    var gendernu = [];
    var nope = [];
    for (let z in threadInfo.userInfo) {
      var gioitinhone = threadInfo.userInfo[z].gender;
      var nName = threadInfo.userInfo[z].name;
      if (gioitinhone == "MALE") {
        gendernam.push(z + gioitinhone)
      } else if (gioitinhone == "FEMALE") {
        gendernu.push(gioitinhone)
      } else {
        nope.push(nName)
      }
    };
    var nam = gendernam.length;
    var nu = gendernu.length;
    let qtv = threadInfo.adminIDs.length;
    let sl = threadInfo.messageCount;
    let u = threadInfo.nicknames;
     let color = threadInfo.color;
    let icon = threadInfo.emoji;

    let threadName = threadInfo.threadName;
    let id = threadInfo.threadID;
    let sex = threadInfo.approvalMode;
    var pd = sex == false ? 'tắt' : sex == true ? 'bật' : 'Kh';


    if (!totalChat[event.threadID]) {
      totalChat[event.threadID] = {
        time: timeByMS,
        count: sl,
        ytd: 0
      }
      fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
    }

    let mdtt = "Chưa có thống kê";
    let preCount = totalChat[event.threadID].count || 0;
    let ytd = totalChat[event.threadID].ytd || 0;
    let hnay = (ytd != 0) ? (sl - preCount) : "Chưa có thống kê";
    let hqua = (ytd != 0) ? ytd : "Chưa có thống kê";
    if (timeByMS - totalChat[event.threadID].time > _24hours) {
      if (timeByMS - totalChat[event.threadID].time > (_24hours * 2)) {
        totalChat[event.threadID].count = sl;
        totalChat[event.threadID].time = timeByMS - _24hours;
        totalChat[event.threadID].ytd = sl - preCount;
        fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
      }
      getHour = Math.ceil((timeByMS - totalChat[event.threadID].time - _24hours) / 3600000);
      if (ytd == 0) mdtt = 100;
      else mdtt = ((((hnay) / ((hqua / 24) * getHour))) * 100).toFixed(0);
      mdtt += "%";
    }

    var callback = () =>
      api.sendMessage({
        body: `======「 𝗧𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻 」======\n──────────────\n➴ 𝗧𝗲̂𝗻 𝗯𝗼𝘅: ${threadName}\n➴ 𝗜𝗗 𝗯𝗼𝘅: ${id}\n➴ 𝗣𝗵𝗲̂ 𝗱𝘂𝘆𝗲̣̂𝘁: ${pd}\n➴ 𝗘𝗺𝗼𝗷𝗶: ${icon ? icon : 'Không Sử Dụng'}\n➴ 𝗠𝗮̃ 𝗚𝗶𝗮𝗼 𝗗𝗶𝗲̣̂𝗻: ${color}\n➴ 𝗣𝗿𝗲𝗳𝗶𝘅 𝗯𝗼𝘅: ${prefix}\n──────────────\n➴ 𝗧𝗼̂̉𝗻𝗴 ${threadMem} 𝗧𝗵𝗮̀𝗻𝗵 𝗩𝗶𝗲̂𝗻\n➴ 𝗡𝗮𝗺: ${nam} 𝗧𝗵𝗮̀𝗻𝗵 𝗩𝗶𝗲̂𝗻 \n➴ 𝗡𝘂̛̃: ${nu} 𝗧𝗵𝗮̀𝗻𝗵 𝗩𝗶𝗲̂𝗻\n➴ 𝗩𝗼̛́𝗶 ${qtv} 𝗾𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘃𝗶𝗲̂𝗻\n──────────────\n➴ 𝗧𝗼̂̉𝗻𝗴: ${sl} 𝗧𝗶𝗻 𝗻𝗵𝗮̆́𝗻\n➴ 𝗠𝘂̛́𝗰 đ𝗼̣̂ 𝘁𝘂̛𝗼̛𝗻𝗴 𝘁𝗮́𝗰: ${mdtt}\n➴ 𝗧𝗼̂̉𝗻𝗴 𝘀𝗼̂́ 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗵𝗼̂𝗺 𝗾𝘂𝗮: ${hqua}\n➴ 𝗛𝗼̂𝗺 𝗻𝗮𝘆 đ𝗮̃ 𝗻𝗵𝗮̆́𝗻 đ𝘂̛𝗼̛̣𝗰: ${hnay}\n➴ 𝗡𝗴𝗮̀𝘆 𝘁𝗮̣𝗼 𝗱𝘂̛̃ 𝗹𝗶𝗲̣̂𝘂: ${fullTime}\n`,
        attachment: fs.createReadStream(__dirname + '/cache/1.png')
      },
        event.threadID,
        () => fs.unlinkSync(__dirname + '/cache/1.png'),
        event.messageID
      );
    return request(encodeURI(`${threadInfo.imageSrc}`))
      .pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
      .on('close', () => callback());
  }
}
