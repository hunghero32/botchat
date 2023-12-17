module.exports.config = {
    name: 'busy',
    version: '10.02',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: 'Tự thông báo bạn đang bận khi có người tag',
    commandCategory: 'Tiện ích',
    usages: '[]',
    cooldowns: 3
};
const {
    readFileSync,
    writeFileSync,
    existsSync
} = require('fs-extra')
dest = __dirname + '/cache/bận.json',
convertTime = a => new Date(a).toLocaleString();
module.exports.onLoad = function() {
    if (!existsSync(dest)) writeFileSync(dest, '{}');
};
module.exports.handleEvent = async function({
    api, event
}) {
const moment = require("moment-timezone");
  const timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
    const out = (a, b, c) => api.sendMessage(`${a}`, event.threadID, c?c: null, b?event.messageID: null),
    data = JSON.parse(readFileSync(dest)),
    tags = Object.keys(event.mentions !== undefined ? event.mentions : {} ),
    now = Date.now(),
    z = data[event.senderID];
    if (!!z) {
        if (z.timeEnd < now){
           await out(`→ Chào mừng bạn đã quay trở lại`, true);
            out(z.dataTags.length == 0 ? '→ Không ai nhắc đến bạn trong lúc bạn vắng mặt': `== [ 𝗗𝗔𝗡𝗛 𝗦𝗔́𝗖𝗛 𝗧𝗔𝗚 ] ==\n━━━━━━━━━━━━━━━━━━\n→ có ${z.dataTags.length} người nhắc đến bạn\n${z.dataTags.map((i, c) => `${c+1}. Người Dùng: ${global.data.userName.get(i.id)}\n→FACEBOOK: https://www.facebook.com/profile.php?id=${i.id}\n→ Thời Gian: ${convertTime(i.time)}\n→ Tại Nhóm: ${global.data.threadInfo.get(i.idT).threadName}\n→ Nội Dung: ${i.msg}\n`).join('\n━━━━━━━━━━━━━━━━━━\n')}`, false);
        };
          z.timeEnd = now+(z.delay*(60*1000));
    };
    if (tags.length != 0) tags.forEach(i => {
        const x = data[i];
        if (!!x && x.timeEnd < now) {
            x.dataTags.push({
                id: event.senderID,
                idT: event.threadID,
                msg: event.body,
                time: Date.now()+25200000
            });
            out(`→ Hiện tại người dùng đang bật chế độ không làm phiền với lí do: ${x.msg}\n→ Tương tác lần cuối: ${convertTime((x.timeEnd-(x.delay*(60*1000)))+25200000)}`, true);
        };
    });
    writeFileSync(dest, JSON.stringify(data, 0, 4));
};
module.exports.run = function({
    api, event, args
}) {
    try {
        const out = (a, b, c) => api.sendMessage(`${a}`, event.threadID, c?c: null, b?event.messageID: null),
        data = JSON.parse(readFileSync(dest));
        if (!!args[0]) {
            const str = args.join(' '),
            arg = str.split('&'),
            msg = arg[0],
            delay = arg[1];
            if (!msg || !delay || isNaN(delay)) return out(!!delay&&isNaN(delay) ? '→ Thời gian bạn nhập phải là một con số':`→ Vui lòng nhập theo định dạng: Nội dung & Thời gian ( phút )`, true);
            data[event.senderID] = {
                delay,
                timeEnd: Date.now()+(delay*(60*1000)),
                msg,
                dataTags: []
            };
            out(`→ Đã thiết lập thành công lí do: ${msg}\n→ Tự động kích hoạt sau ${delay%60} phút không tương tác`, true);
        } else {
            if (!data[event.senderID]) return out(`→ Bạn chưa thiết lập chế độ busy`, true);
            out(`→ Xoá thành công thiết lập: ${this.config.name}`, true);
            delete data[event.senderID];
        };
        writeFileSync(dest, JSON.stringify(data, 0, 4));
    }catch(err) {
        out(err, true);
    }
};