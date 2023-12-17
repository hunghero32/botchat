module.exports.config = {
    name: "ánh_ngáo",   
    version: "1.0.0", 
    hasPermssion: 0,
    credits: "Khánh Milo",
    description: "Phát nhạc thông qua từ khoá tìm kiếm ZingMp3", 
    commandCategory: "Tiện ích",
    usages: "từ khoá tìm kiếm",
    cooldowns: 5, 
    dependencies: {
        "fs-extra": "",
        "axios": "",
        "tinyurl": ""
    },
};
module.exports.handleReply = async function({ api, event, handleReply }) {
    const axios = global.nodemodule["axios"];
    const fs = global.nodemodule["fs-extra"];
    api.sendMessage("Đang xử lý request của bạn!", event.threadID, (err, info) =>
    setTimeout(() => {api.unsendMessage(info.messageID) } , 10000));
    try {
    var getms = (await axios.get(`http://api.mp3.zing.vn/api/streaming/audio/${handleReply.link[event.body - 1]}/320`, {responseType: "arraybuffer"})).data;
    var shortLink = await global.nodemodule["tinyurl"].shorten(`http://api.mp3.zing.vn/api/streaming/audio/${handleReply.link[event.body - 1]}/320`);           
    fs.writeFileSync(__dirname + `/cache/${handleReply.link[event.body - 1]}.mp3`, Buffer.from(getms, "utf-8")); 
    if (fs.statSync(__dirname + `/cache/${handleReply.link[event.body - 1]}.mp3`).size > 26214400) return api.sendMessage('Không thể gửi file vì dung lượng lớn hơn 25MB.', event.threadID, () => fs.unlinkSync(__dirname + `/cache/${handleReply.link[event.body - 1]}.mp3`), event.messageID);
    else api.sendMessage({body: `Link Tải: ${shortLink}`,attachment: fs.createReadStream(__dirname + `/cache/${handleReply.link[event.body - 1]}.mp3`)}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${handleReply.link[event.body - 1]}.mp3`), event.messageID);
}
catch {
    api.sendMessage("Không thể xử lý yêu cầu của bạn!", event.threadID, event.messageID);
}
return api.unsendMessage(handleReply.messageID);
}

module.exports.run = async function({ api, args, event }) {
 const axios = global.nodemodule["axios"];
 if (args.length == 0 || !args) return api.sendMessage('Phần tìm kiếm không được để trống!', event.threadID, event.messageID);
 const keywordSearch = args.join(" ");
 try {
 var getms = (await axios.get(`http://ac.mp3.zing.vn/complete?type=artist,song,key,code&num=500&query=${encodeURIComponent(keywordSearch)}`)).data;
 var retrieve = getms.data[0], msg = '', num = 0, link = [];
 for (var i = 0; i < 10; i++) {
    if (typeof retrieve.song[i].id != 'undefined') {
        msg += `${num += 1}. Tên Bài hát : ${decodeURIComponent(retrieve.song[i].name)}\nCa Sĩ : ${retrieve.song[i].artist}\n◆━━━━━━━━━◆\n`;                
        link.push(retrieve.song[i].id);
         }
}
return api.sendMessage(`🔊 Có ${link.length} kết quả trùng với từ khoá tìm kiếm của bạn:\n\n${msg}\nHãy reply(phản hồi) chọn một trong những tìm kiếm trên`, event.threadID,(error, info) => global.client.handleReply.push({ name: this.config.name, messageID: info.messageID, author: event.senderID, link }), event.messageID);
}
catch{
    api.sendMessage(`Ánh Ngáoooo \n${keywordSearch}\n`, event.threadID, event.messageID);
}
}



