exports.config = {
    name: 'singtik',
    version: '0.0.1',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: '',
    commandCategory: 'System',
    usages: '[]',
    cooldowns: 3
};
exports.run = o=>require('axios').post('https://www.tikwm.com/api/', `url=${encodeURIComponent(o.args[0])}&count=12&cursor=0&web=1&hd=1`).then(res=>res.data.data.music_info.play).then(url=>require('axios').get(url, {responseType: 'stream',}).then(res=>o.api.sendMessage({attachment:res.data,},o.event.threadID,o.event.messageID,)));