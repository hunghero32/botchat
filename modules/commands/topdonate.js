exports.config = {
    name: 'topdonate',
    version: '0.0.1',
    hasPermssion: 2,
    credits: 'DC-Nam',
    description: '',
    commandCategory: 'System',
    usages: '[]',
    cooldowns: 3
};
let fs = require('fs');

let path = __dirname+'/cache/topdonate.dcn.json';
let data = [];
let save = ()=>fs.writeFileSync(path, JSON.stringify(data));

if (!fs.existsSync(path))save(); else data = JSON.parse(fs.readFileSync(path));

exports.run = o=> {
    let send = msg=>o.api.sendMessage(msg, o.event.threadID, o.event.messageID);

    if (o.args[0] == 'add') {
        let input = o.args.slice(1).join(' ').split('|');

        if (input.length != 4)return send('dùng /donate add (tên)|(link fb)|số tiền|08xxxx');

        data.push(input),
        save(),
        send('da them');
    } else if (o.args[0] == 'del') {
        data = data.filter(($, i)=>!o.args.slice(1).filter(isFinite).map(Number).includes(i+1)),
        save(),
        send('da xoa');
    } else send(`[===[ Top Donate ]===]\n\n${data.map(($, i)=>`${i+1}. - Ten: ${$[0]}\n- Link: ${$[1]}\n- So tien: ${$[2]}\n- SDT: ${$[3]}\n----------`).join('\n\n')}`);
};