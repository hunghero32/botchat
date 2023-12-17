module.exports.config = {
	name: "adminUpdate",
	eventType: ["log:thread-admins","log:thread-name", "log:user-nickname","log:thread-icon","log:thread-color",'log:unsubscribe'],
	version: "1.0.1",
	credits: "Mirai Team",
	description: "Cập nhật thông tin nhóm một cách nhanh chóng",
    envConfig: {
        autoUnsend: true,
        sendNoti: true,
        timeToUnsend: 10
    }
};

module.exports.run = async function ({ event, api, Threads,Users }) {
	const fs = require("fs");
	
	let send = msg=>api.sendMessage(msg, event.threadID);
	let path_anti = __dirname+'/../commands/cache/status-anti.nam.json';
	let data_anti = {};
	
	if (!!fs.existsSync(path_anti))data_anti = JSON.parse(fs.readFileSync(path_anti));
	
	let t = data_anti[event.threadID] || {};
	
	var iconPath = __dirname + "/emoji.json";
	if (!fs.existsSync(iconPath)) fs.writeFileSync(iconPath, JSON.stringify({}));
    const { threadID, logMessageType, logMessageData } = event;
    const { setData, getData } = Threads;

    const thread = global.data.threadData.get(threadID) || {};
    if (typeof thread["adminUpdate"] != "undefined" && thread["adminUpdate"] == false) return;

    try {
        let dataThread = (await getData(threadID)).threadInfo;
        switch (logMessageType) {
            case "log:thread-admins": {
                 if (logMessageData.ADMIN_EVENT == "add_admin") {
                    dataThread.adminIDs.push({ id: logMessageData.TARGET_ID })
                    if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[🎊] → Đã cập nhật người dùng ${logMessageData.TARGET_ID} trở thành Quản trị viên nhóm`, threadID, async (error, info) => {
                        if (global.configModule[this.config.name].autoUnsend) {
                            await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                            return api.unsendMessage(info.messageID);
                        } else return;
                    });
                }
                else if (logMessageData.ADMIN_EVENT == "remove_admin") {
                    dataThread.adminIDs = dataThread.adminIDs.filter(item => item.id != logMessageData.TARGET_ID);
                    if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[🎊] → Đã cập nhật người dùng ${logMessageData.TARGET_ID} trở thành thành viên`, threadID, async (error, info) => {
                        if (global.configModule[this.config.name].autoUnsend) {
                            await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                            return api.unsendMessage(info.messageID);
                        } else return;
                    });
                }
                break;
            }

            case "log:user-nickname": {
                if (!!t.bd && !dataThread.adminIDs.some($=>$.id==event.author) && event.author != api.getCurrentUserID()) {
                    api.changeNickname(dataThread.nicknames[event.logMessageData.participant_id], event.threadID, event.logMessageData.participant_id, err=>send(`đang cấm TV đổi bd`));
                } else {
                
                dataThread.nicknames[logMessageData.participant_id] = logMessageData.nickname;
                if (typeof global.configModule["nickname"] != "undefined" && !global.configModule["nickname"].allowChange.includes(threadID) && !dataThread.adminIDs.some(item => item.id == event.author) || event.author == api.getCurrentUserID()) '';else
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[🎊] → Đã cập nhật biệt danh của người dùng ${logMessageData.participant_id} thành: ${(logMessageData.nickname.length == 0) ? "tên gốc": logMessageData.nickname}`, threadID, async (error, info) => {
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                };
                break;
            }

            case "log:thread-name": {
                if (!!t.nb && !dataThread.adminIDs.some($=>$.id == event.author) && event.author != api.getCurrentUserID()) {
                    api.setTitle(dataThread.threadName||'', event.threadID, err=>send(`đang cấm TV đổi tên nhóm`));
                } else {
                
                dataThread.threadName = event.logMessageData.name || "Không tên";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[🎊] → Đã cập nhật tên nhóm thành: ${dataThread.threadName}`, threadID, async (error, info) => {
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                };
                break;
            }

            case "log:thread-icon": {
            	let preIcon = JSON.parse(fs.readFileSync(iconPath));
            	dataThread.threadIcon = event.logMessageData.thread_icon || "👍";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[🎊] → ${event.logMessageBody.replace("biểu tượng cảm xúc", "icon")}\n=> Icon gốc: ${preIcon[threadID] || "không rõ"}`, threadID, async (error, info) => {
                	preIcon[threadID] = dataThread.threadIcon;
                	fs.writeFileSync(iconPath, JSON.stringify(preIcon));
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }
             case "log:thread-color": {
            	dataThread.threadColor = event.logMessageData.thread_color || "🌤";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[🎊] → ${event.logMessageBody.replace("Chủ đề", "color")}`, threadID, async (error, info) => {
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }
            case 'log:unsubscribe': {
               if (!!t.o && event.logMessageData.leftParticipantFbId == event.author)api.addUserToGroup(event.author, event.threadID, err=>send(`đang cấm người dùng rời nhóm`));
            };
            break;
        }
        await setData(threadID, { threadInfo: dataThread });
    } catch (e) { console.log(e) };
}