module.exports.config = {
	name: "restart",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "Mirai Team",
	description: "Khởi Động Lại Bot.",
	commandCategory: "Admin",
	cooldowns: 0
        };
module.exports.run = ({event, api}) =>api.sendMessage(" đợi tao 1p đang bận quay ",event.threadID, () =>process.exit(1))