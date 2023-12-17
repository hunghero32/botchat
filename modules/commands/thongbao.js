const fs = require('fs');
const request = require('request');

module.exports.config = {
    name: "thongbao",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Hưng VN",
    description: "",
    commandCategory: "Tiện ích",
    usages: "[msg]",
    cooldowns: 5,
}

let atmDir = [];

const getAtm = (atm, body) => new Promise(async (resolve) => {
    let msg = {}, attachment = [];
    msg.body = body;
    for(let eachAtm of atm) {
        await new Promise(async (resolve) => {
            try {
                let response =  await request.get(eachAtm.url),
                    pathName = response.uri.pathname,
                    ext = pathName.substring(pathName.lastIndexOf(".") + 1),
                    path = __dirname + `/cache/${eachAtm.filename}.${ext}`
                response
                    .pipe(fs.createWriteStream(path))
                    .on("close", () => {
                        attachment.push(fs.createReadStream(path));
                        atmDir.push(path);
                        resolve();
                    })
            } catch(e) { console.log(e); }
        })
    }
    msg.attachment = attachment;
    resolve(msg);
})

module.exports.handleReply = async function ({ api, event, handleReply, Users, Threads }) {
    const moment = require("moment-timezone");
      var gio = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY - HH:mm:s");
    const { threadID, messageID, senderID, body } = event;
    let name = await Users.getNameUser(senderID);
    switch (handleReply.type) {
        case "sendnoti": {
            let text = `====== [ 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ 𝗨𝘀𝗲𝗿 ] ======\n--------------\n『𝗧𝗶𝗺𝗲』: ${gio}\n--------------\n『𝐍𝐨̣̂𝐢 𝐝𝐮𝐧𝐠』 : ${body}\n--------------\n𝑻𝒖̛̀ 𝒏𝒈𝒖̛𝒐̛̀𝒊 𝒅𝒖̀𝒏𝒈 ${name}  𝒕𝒓𝒐𝒏𝒈 𝒏𝒉𝒐́𝒎 ${(await Threads.getInfo(threadID)).threadName || "Unknow"}`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `====== [ 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ 𝗨𝘀𝗲𝗿 ] ======\n--------------\n『𝗧𝗶𝗺𝗲』: ${gio}\n--------------\n『𝐍𝐨̣̂𝐢 𝐝𝐮𝐧𝐠』 : ${body}\n--------------\n𝑻𝒖̛̀ 𝒏𝒈𝒖̛𝒐̛̀𝒊 𝒅𝒖̀𝒏𝒈 ${name} 𝒕𝒓𝒐𝒏𝒈 𝒏𝒉𝒐́𝒎 ${(await Threads.getInfo(threadID)).threadName || "Unknow"}`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "reply",
                    messageID: info.messageID,
                    messID: messageID,
                    threadID
                })
            });
            break;
        }
        case "reply": {
            let text = `==== [𝑷𝒉𝒂̉𝒏 𝒉𝒐̂̀𝒊 𝒕𝒖̛̀ 𝑨𝑫𝑴𝑰𝑵 ] ====\n--------------\n『𝗧𝗶𝗺𝗲』: ${gio}\n--------------\n『𝗟𝗼̛̀𝗶 𝘁𝗵𝗮̂̀𝗻 𝗴𝗶𝗮𝗼 𝗰𝗮́𝗰𝗵 𝗰𝗮̉𝗺 𝘁𝘂̛̀ 𝗮𝗱𝗺𝗶𝗻』 : ${body}\n--------------\n『𝐓𝐮̛̀ 𝐍𝐠𝐚̀𝐢』 ${name} 𝑪𝒖𝒕𝒊𝒆\n--------------\n𝑹𝒆𝒑𝒍𝒚 𝒕𝒊𝒏 𝒏𝒉𝒂̆́𝒏 => 𝒈𝒖̛̉𝒊 𝒗𝒆̂̀ 𝒂𝒅𝒎𝒊𝒏`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `${body}==== [ 𝑷𝒉𝒂̉𝒏 𝒉𝒐̂̀𝒊 𝒕𝒖̛̀ 𝑨𝑫𝑴𝑰𝑵 ] ====\n--------------\n『𝗧𝗶𝗺𝗲』: ${gio}\n--------------\n『𝐓𝐮̛̀ 𝐍𝐠𝐚̀𝐢』 ${name} 𝑪𝒖𝒕𝒊𝒆\n--------------\n𝑹𝒆𝒑𝒍𝒚 𝒕𝒊𝒏 𝒏𝒉𝒂̆́𝒏 => 𝒈𝒖̛̉𝒊 𝒗𝒆̂̀ 𝒂𝒅𝒎𝒊𝒏`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "sendnoti",
                    messageID: info.messageID,
                    threadID
                })
            }, handleReply.messID);
            break;
        }
    }
}

module.exports.run = async function ({ api, event, args, Users }) {
    const moment = require("moment-timezone");
      var gio = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY - HH:mm:s");
    const { threadID, messageID, senderID, messageReply } = event;
    if (!args[0]) return api.sendMessage("Please input message", threadID);
    let allThread = global.data.allThreadID || [];
    let can = 0, canNot = 0;
    let text = `====== [ 𝑻𝒉𝒐̂𝒏𝒈 𝒃𝒂́𝒐 ] ======\nTime : ${gio}\n[Nội dung tử admin] • ${args.join(" ")}\n[Admin] ${await Users.getNameUser(senderID)} \nReply tin nhắn này để gửi về admin`;
    if(event.type == "message_reply") text = await getAtm(messageReply.attachments, `====== [ 𝑻𝒉𝒐̂𝒏𝒈 𝒃𝒂́𝒐 ] ======\n--------------\n『𝗧𝗶𝗺𝗲』: ${gio}\n\n--------------\n『𝗟𝗼̛̀𝗶 𝘁𝗵𝗮̂̀𝗻 𝗴𝗶𝗮𝗼 𝗰𝗮́𝗰𝗵 𝗰𝗮̉𝗺 𝘁𝘂̛̀ 𝗮𝗱𝗺𝗶𝗻』 : ${args.join(" ")}\n\n--------------\n『𝐓𝐮̛̀ 𝐍𝐠𝐚̀𝐢』 ${await Users.getNameUser(senderID)}\n--------------\n𝑹𝒆𝒑𝒍𝒚 𝒕𝒊𝒏 𝒏𝒉𝒂̆́𝒏 => 𝒈𝒖̛̉𝒊 𝒗𝒆̂̀ 𝒂𝒅𝒎𝒊𝒏`);
    await new Promise(resolve => {
        allThread.forEach((each) => {
            try {
                api.sendMessage(text, each, (err, info) => {
                    if(err) { canNot++; }
                    else {
                        can++;
                        atmDir.forEach(each => fs.unlinkSync(each))
                        atmDir = [];
                        global.client.handleReply.push({
                            name: this.config.name,
                            type: "sendnoti",
                            messageID: info.messageID,
                            messID: messageID,
                            threadID
                        })
                        resolve();
                    }
                })
            } catch(e) { console.log(e) }
        })
    })
    api.sendMessage(`đã gửi đến  ${can} nhóm, không thể gửi đến ${canNot} nhòm`, threadID);
  }
             