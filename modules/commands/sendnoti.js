const fs = require('fs');
const request = require('request');

module.exports.config = {
    name: "sendnoti",
    version: "1.0.0",
    hasPermssion: 3,
    credits: "Thanh nguyên",
    description: "Gửi tin nhắn đến các nhóm",
    commandCategory: "Admin",
    usages: "[msg]",
    cooldowns: 5,
}

let atmDir = [];
const moment = require('moment-timezone');
 const gio = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:s"); 
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
    const { threadID, messageID, senderID, body } = event;

    let name = await Users.getNameUser(senderID);
    switch (handleReply.type) {
        case "sendnoti": {
            let text = `===『 𝗦𝗘𝗡𝗗𝗡𝗢𝗧𝗜 』===\n--------------------\n『 𝗧𝗶𝗺𝗲 』: ${gio}\n--------------------\n『 𝗧𝘂̛̀ 』: ${name}\n--------------------\n『 𝗚𝗿𝘂𝗽 』: ${(await Threads.getInfo(threadID)).threadName || "Unknow"}\n--------------------\n『 𝗡𝗼𝘁𝗲 』: ${body}\n`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `===『 𝗦𝗘𝗡𝗗𝗡𝗢𝗧𝗜 』===\n--------------------\n『 𝗧𝗶𝗺𝗲 』: ${gio}\n--------------------\n『 𝗡𝗼𝘁𝗲 』: ${body}\n--------------------\n『 𝗚𝗿𝘂𝗽 』: ${(await Threads.getInfo(threadID)).threadName || "Unknow"}\n--------------------\n『 𝗧𝘂̛̀ 』: ${note}\n`);
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
            let text = `===『 𝗦𝗘𝗡𝗗𝗡𝗢𝗧𝗜 』===\n--------------------\n『 𝗧𝗶𝗺𝗲 』: ${gio}\n--------------------\n『 𝗧𝘂̛̀ 』: ${name} 𝗪𝗶𝘁𝗵 𝗟𝗼𝘃𝗲!\n--------------------\n『 𝗡𝗼𝘁𝗲 』: ${body}\n--------------------\n-----『 𝗧𝗶𝗽𝘀 』-----`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `===『 𝗦𝗘𝗡𝗗𝗡𝗢𝗧𝗜 』===\n--------------------\n『 𝗧𝗶𝗺𝗲 』: ${gio}\n--------------------\n『 𝗧𝘂̛̀ 』: ${name} 𝗪𝗶𝘁𝗵 𝗟𝗼𝘃𝗲!\n--------------------\n『 𝗡𝗼𝘁𝗲 』: ${body}\n--------------------\n-----『 𝗧𝗶𝗽𝘀 』-----`);
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
    const { threadID, messageID, senderID, messageReply } = event;
    if (!args[0]) return api.sendMessage("Please input message", threadID);
    let allThread = global.data.allThreadID || [];
    let can = 0, canNot = 0;
    let text = `===『 𝗦𝗘𝗡𝗗𝗡𝗢𝗧𝗜 』===\n=============\n『 𝗔𝗱𝗺𝗶𝗻 』: ${await Users.getNameUser(senderID)}\n=============\n\n『 𝗡𝗼𝘁𝗲 』:  ${args.join(" ")}\n\n=============\n『 𝗧𝗶𝗺𝗲 』: ${gio}\n=============\n=====『 𝗧𝗶𝗽𝘀 』======\n𝗧𝗶𝗻 𝗡𝗵𝗮̆́𝗻 𝗡𝗮̀𝘆 𝗦𝗲̃ 𝗣𝗵𝗮̉𝗻 𝗛𝗼̂̀𝗶 𝗧𝗼̛́𝗶 𝗔𝗱𝗺𝗶𝗻 𝗡𝗲̂́𝘂 𝗕𝗮̣𝗻 𝗥𝗲𝗽𝗹𝘆 !!!` ;
    if(event.type == "message_reply") text = await getAtm(messageReply.attachments, `===『 𝗦𝗘𝗡𝗗𝗡𝗢𝗧𝗜 』===\n=============\n『 𝗔𝗱𝗺𝗶𝗻 』: ${await Users.getNameUser(senderID)}\n=============\n\n『 𝗡𝗼𝘁𝗲 』:  ${args.join(" ")}\n\n=============\n『 𝗧𝗶𝗺𝗲 』: ${gio}\n=============\n=====『 𝗧𝗶𝗽𝘀 』======\n𝗧𝗶𝗻 𝗡𝗵𝗮̆́𝗻 𝗡𝗮̀𝘆 𝗦𝗲̃ 𝗣𝗵𝗮̉𝗻 𝗛𝗼̂̀𝗶 𝗧𝗼̛́𝗶 𝗔𝗱𝗺𝗶𝗻 𝗡𝗲̂́𝘂 𝗕𝗮̣𝗻 𝗥𝗲𝗽𝗹𝘆 !!!`);
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
    api.sendMessage(`『 𝗡𝗼𝘁𝗲 』 → 𝙶𝚞̛̉𝚒 𝙽𝚘𝚝𝚎 𝚃𝚑𝚊̀𝚗𝚑 𝙲𝚘̂𝚗𝚐 ${can} 𝙽𝚑𝚘́𝚖, 𝙺𝚑𝚘̂𝚗𝚐 𝚃𝚑𝚊̀𝚗𝚑 𝙲𝚘̂𝚗𝚐 ${canNot} 𝙽𝚑𝚘́𝚖`, threadID);
              }