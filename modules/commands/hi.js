module.exports.config = {
  name: "hi",
  version: "1.0.0",
  hasPermssion: 0,
  credit: "Sam",
  description: "hi gửi sticker",
  commandCategory: "Bot",
  usages: "[text]",
  cooldowns: 5
}

module.exports.handleEvent = async ({ event, api, Users }) => {
  let KEY = [ 
    "he lô",
    "hello",
    "hellu",
    "hi",
    "hai",
    "Hăi",
    "Bello",
    "chào",
    "hí",
    "híí",
    "hì",
    "hìì",
    "lô",
    "hii",
    "helo",
    "hê nhô"
  ];
  let thread = global.data.threadData.get(event.threadID) || {};
  if (typeof thread["hi"] == "undefined", thread["hi"] == false) return
  else {
  if (KEY.includes(event.body !== undefined ? event.body.toLowerCase() : '') !== false) {
    let data = [
      "237320717087588",
      "526221104777988",
      "2313955338840626",
      "2379545095403561",
      "254594546003916",
      "1747083968936188",
      "420715238286429",
      "1775284359378935"
    ];
    let sticker = data[Math.floor(Math.random() * data.length)];
    let moment = require("moment-timezone");
    let hours = moment.tz('Asia/Ho_Chi_Minh').format('HHmm');
    let data2 = [
      "tốt lành 🥰",
      "vui vẻ <3",
      "hạnh phúc ❤",
      "yêu đời 😘"
    ];
    let text = data2[Math.floor(Math.random() * data2.length)]
    let session = (
    hours > 0001 && hours <= 400 ? "sáng tinh mơ" : 
    hours > 401 && hours <= 700 ? "sáng sớm" :
    hours > 701 && hours <= 1000 ? "sáng" :
    hours > 1001 && hours <= 1200 ? "trưa" : 
    hours > 1201 && hours <= 1700 ? "chiều" : 
    hours > 1701 && hours <= 1800 ? "chiều tà" : 
    hours > 1801 && hours <= 2100 ? "tối" : 
    hours > 2101 && hours <= 2400 ? "tối muộn" : 
    "lỗi");
    let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
    let msg = {body: `Xin chào ${name}, chúc bạn một buổi ${session} ${text}`, mentions}
    api.sendMessage(msg, event.threadID, (e, info) => {
      
        api.sendMessage({sticker: sticker}, event.threadID);
    }, event.messageID)
  }
  }
}

module.exports.languages = {
  "vi": {
    "on": "Bật",
    "off": "Tắt",
		"successText": `${this.config.name} thành công`,
	},
	"en": {
		"on": "on",
		"off": "off",
		"successText": "success!",
	}
}

module.exports.run = async ({ event, api, Threads, getText }) => {
  let { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
	if (typeof data["hi"] == "undefined" || data["hi"] == true) data["hi"] = false;
	else data["hi"] = true;
	await Threads.setData(threadID, {
		data
	});
	global.data.threadData.set(threadID, data);
	return api.sendMessage(`${(data["hi"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}