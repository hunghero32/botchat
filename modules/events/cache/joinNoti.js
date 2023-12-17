module.exports.config = {
	name: "joinNoti",
	eventType: ["log:subscribe"],
	version: "1.0.1",
	credits: "Mirai Team",
	description: "Thông báo bot hoặc người vào nhóm có random gif/ảnh/video",
	dependencies: {
		"fs-extra": "",
		"path": "",
		"pidusage": ""
	}
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

	const path = join(__dirname, "cache", "joinGif");
	if (existsSync(path)) mkdirSync(path, { recursive: true });	

	const path2 = join(__dirname, "cache", "joinGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}


module.exports.run = async function({ api, event, Users  }) {
	const { join } = global.nodemodule["path"];
	const { threadID } = event;
  ////////////////////////////////////////////////////////
  const thread = global.data.threadData.get(threadID) || {};
  if (typeof thread["joinNoti"] != "undefined" && thread["joinNoti"] == false) return;
  ///////////////////////////////////////////////////////
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "Made by Duy" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
		const fs = require("fs");
		return api.sendMessage("🌐 Kết Nối Thành Công!\n🎊 Hãy bắt đầu dùng những lệnh dưới đây để làm quen!\n─────────────────\n👉 /help hoặc /menu (xem danh sách toàn bộ lệnh)\n─────────────────\n💥 dùng lệnh chậm thôi nhé", event.threadID, () => api.sendMessage({body:`► Kết Nối Thành Công Box ◄\n─────────────────\n🐧 Hi mọi người mình là bot\n📌 Dấu lệnh của bot là: /\n🎀 Vui lòng không chửi bot , spambot\n🎊 Sử dụng lệnh /help hoặc /menu để xem chi tiết các lệnh trong bot\n📺 Chúc mọi người sử dụng bot vui vẻ, và có 1 ngày tốt lành\n─────────────────\n🌐 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐀𝐝𝐦𝐢𝐧: https://www.facebook.com/qhuy.203`, attachment: fs.createReadStream(__dirname + "/cache/joinGif/join.gif")} ,threadID));
	}
	else {
		try {
			const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
			let { threadName, participantIDs } = await api.getThreadInfo(threadID);
      const moment = require("moment-timezone");
      const time = moment.tz("Asia/Ho_Chi_Minh").format(" HH:mm:s - DD/MM/YYYY");
      const hours = moment.tz("Asia/Ho_Chi_Minh").format("HH");
      var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = 'Chủ Nhật'
  if (thu == 'Monday') thu = 'Thứ Hai'
  if (thu == 'Tuesday') thu = 'Thứ Ba'
  if (thu == 'Wednesday') thu = 'Thứ Tư'
  if (thu == "Thursday") thu = 'Thứ Năm'
  if (thu == 'Friday') thu = 'Thứ Sáu'
  if (thu == 'Saturday') thu = 'Thứ Bảy'
			const threadData = global.data.threadData.get(parseInt(threadID)) || {};
			const path = join(__dirname, "cache", "joinGif");
			const pathGif = join(path, `join.mp4`);

				var mentions = [], nameArray = [], memLength = [], iduser = [], i = 0;
			
			for (id in event.logMessageData.addedParticipants) {
		const userName = event.logMessageData.addedParticipants[id].fullName; iduser.push(event.logMessageData.addedParticipants[id].userFbId.toString());
        nameArray.push(userName);
        mentions.push({ tag: userName, id: event.senderID });
        memLength.push(participantIDs.length - i++);
        console.log(userName)
			}
			memLength.sort((a, b) => a - b);
			
			(typeof threadData.customJoin == "undefined") ? msg = "‎🎊 Welcome to {name} đến với Bình Nguyên Vô Tận ♥️ , à nhầm 🥲 nhóm {threadName}\n─────────────────\n🌐 Link Facebook: https://www.facebook.com/{iduser}\n👤 {type} là thành viên thứ {soThanhVien} của nhóm\n🎀 {type} được thên bởi: {author}\n🌐 Link Facebook: https://www.facebook.com/{idauthor}\n─────────────────\n⏰ Thời gian: {time} - ( {thu} ) buổi {session}\n📌 Vào nhóm nhớ Giới Thiệu Tên + Năm sinh và nói biệt danh muốn đặt để quản trị Viên set cho nhé 🥰\n🦑 {type} không tương tác sẽ bị ra khỏi đảo 🍀" : msg = threadData.customJoin;
      var getData = await Users.getData(event.author)
var nameAuthor = typeof getData.name == "undefined" ? "Người dùng tự vào" : getData.name
			msg = msg
         .replace(/\{iduser}/g, iduser.join(', '))
			.replace(/\{name}/g, nameArray.join(', '))
			.replace(/\{type}/g, (memLength.length > 1) ?  'Các bạn': 'Bạn')
			.replace(/\{soThanhVien}/g, memLength.join(', '))
         .replace(/\{author}/g, nameAuthor)
         .replace(/\{idauthor}/g, event.author)
			.replace(/\{threadName}/g, threadName)
      .replace(/\{thu}/g, thu)
      .replace(/\{session}/g, hours <= 10 ? "sáng" : 
    hours > 10 && hours <= 12 ? "trưa" :
    hours > 12 && hours <= 18 ? "chiều" : "tối")
    .replace(/\{time}/g, time);

			if (existsSync(path)) mkdirSync(path, { recursive: true });

			const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));

			if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
			else if (randomPath.length != 0) {
				const pathRandom = join(__dirname, "cache", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
				formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
			}
			else formPush = { body: msg, mentions }

			return api.sendMessage(formPush, threadID);
		} catch (e) { return console.log(e) };
	}
}
