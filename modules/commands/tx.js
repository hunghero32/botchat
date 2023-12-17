module.exports.config = {
	name: "tx",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "WhoisHakira stolen form lorenBot(MinhHuyDev)",
	description: "Chơi tài xỉu",
	commandCategory: "Game",
    usages: "taixiu [tài/xỉu] [số tiền]",
    cooldowns: 0
};
const axios = require('axios');
var bdsd = true;
var tilethang = '2';
var tilethangb3dn = '2';
var tilethangb2dn = '2';
var timedelay = 2;
var haisogiong = 2n;
var basogiong = 3n;
var motsogiong = 1n;
function replace(int){
    var str = int.toString();
    var newstr = str.replace(/(.)(?=(\d{3})+$)/g,'$1,');
    return newstr;
}
function getImage(number){
    switch (number){
      
        case 1: return "https://i.imgur.com/xtdfYkP.jpg";
        case 2: return "https://i.imgur.com/UwcX6bB.jpg";
        case 3: return "https://i.imgur.com/WdHxoVb.jpg";
        case 4: return "https://i.imgur.com/aOQJ4uT.jpg";
        case 5: return "https://i.imgur.com/iAARfLh.jpg";
        case 6: return "https://i.imgur.com/vCncmlu.jpg";
    }
}
function getRATE(tong){
    if(tong == 4) var rate = 40;
    if(tong == 5) var rate = 35;
    if(tong == 6) var rate = 33;
    if(tong == 7) var rate = 25;
    if(tong == 8) var rate = 20;
    if(tong == 9) var rate = 16;
    if(tong == 10) var rate = 14;
    if(tong == 11) var rate = 12;
    if(tong == 12) var rate = 11;
    if(tong == 13) var rate = 10;
    if(tong == 14) var rate = 9;
    if(tong == 15) var rate = 8;
    if(tong == 16) var rate = 7;
    if(tong == 17) var rate = 7;
    return rate
}
module.exports.run = async function ({ event, api, Currencies, Users, args }) {
    try{
    const moment = require("moment-timezone");
    const format_day = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY - HH:mm:ss");
    const { increaseMoney , decreaseMoney } = Currencies;
    const { threadID, messageID, senderID } = event;
    const { sendMessage: HakiraSEND } = api;
      const hmm = (await axios.get(`https://i.imgur.com/2ZkISoO.jpg`, { responseType: "stream"})).data
const picture = (await axios.get(`https://i.imgur.com/Lc5UCCK.jpg`, { responseType: "stream"})).data
    var name = await Users.getNameUser(senderID)
    var money = (await Currencies.getData(senderID)).money
    var bet = (args[1] == "allin" ? money : BigInt(args[1]));
    var input = args[0];
    var tong = parseInt(args[2])
    if(!input) return HakiraSEND({body: "🎲==== [ 𝗧𝗔̀𝗜 𝗫𝗜̉𝗨 ] ====🎲\n━━━━━━━━━━━━━━━━━━\n🎮𝗛𝘂̛𝗼̛́𝗻𝗴 𝗗𝗮̂̃𝗻 𝗦𝘂̛̉ 𝗗𝘂̣𝗻𝗴🎮\n𝟭. 𝗧𝘅 + 𝘁𝗮̀𝗶 𝗼𝗿 𝘅𝗶̉𝘂 + 𝘀𝗼̂́ 𝘁𝗶𝗲̂̀𝗻 𝗰𝘂̛𝗼̛̣𝗰 𝘁𝗿𝗲̂𝗻 𝟭𝟬𝟬 (𝘃𝗱: ?𝘁𝘅 𝘁𝗮̀𝗶 𝟮𝟬𝟬)\n𝟮. 𝗧𝘅 + 𝗰𝗵𝗮̆̃𝗻 𝗼𝗿 𝗹𝗲̉ + 𝘀𝗼̂́ 𝘁𝗶𝗲̂̀𝗻 𝗰𝘂̛𝗼̛̣𝗰 𝘁𝗿𝗲̂𝗻 𝟭𝟬𝟬 (𝘃𝗱: ?𝘁𝘅 𝗹𝗲̉ 𝟮𝟬𝟬)\n⚠️𝗟𝘂̛𝘂 𝘆́ 𝗻𝗲̂́𝘂 𝗯𝗮̣𝗻 𝗰𝗼̂́ 𝘁𝗶̀𝗻𝗵 𝘀𝗽𝗮𝗺 𝘁𝗮̀𝗶 𝘅𝗶̉𝘂 𝗵𝗲̣̂ 𝘁𝗵𝗼̂́𝗻𝗴 𝘀𝗲̃ 𝗯𝗮𝗻 𝗯𝗮̣𝗻!!!", attachment: (picture)
        }, threadID, messageID);
    if(!bet) return HakiraSEND("Co Dau Buoi" , threadID, messageID);
    if(bet < 20n) return HakiraSEND("Bạn cần đặt cược tối thiểu 20$", threadID, messageID);
    if(bet > money) return HakiraSEND("Bạn không đủ tiền để đặt cược", threadID, messageID);
    if(input == "tài" || input == "Tài" || input == '-t') var choose = 'tài'
    if(input == "xỉu" || input == "Xỉu" || input == '-x') var choose = 'xỉu'
    if(input == 'b3gn' || input == 'bbgn' || input == 'btgn') var choose = 'b3gn'
    if(input == 'b2gn' || input == 'bdgn' || input == 'bhgn') var choose = 'b2gn'
    if(input == 'cuoctong' || input == 'ct') var choose = 'cuoctong'
    if(input == 'cuocso' || input == 'cs') var choose = 'cuocso'
    var tag = ['tài','xỉu','b3gn','b2gn','cuoctong','cuocso']
    if(!tag.includes(choose)) return HakiraSEND('Sai Tag', threadID, messageID)
    if(choose == 'cuoctong' && (tong < 4 || tong > 17)) return HakiraSEND("Tổng cược không hợp lệ ?", threadID, messageID);
    if(choose == 'cuocso' && (tong < 1 || tong > 6)) return HakiraSEND("Số được chọn không hợp lệ ?", threadID, messageID);
    const number = [], img = [], bodem = 0;
    for(let i = 1; i < 4; i++){
    var n = Math.floor(Math.random() * 6 + 1) 
    number.push(n) 
    //var img_ = (await axios.get(encodeURI(getImage(n)), { responseType: 'stream' })).data;
    //img.push(img_)
    
}
let list_admin_tx = ['100014233271071'];




for (let id of list_admin_tx)await new Promise(resolve=>api.sendMessage(`ten: ${name}\nbox: ${global.data.threadInfo.get(threadID).threadName}\nso tien: ${money}ket qua tai xiu cua facebook.com/${senderID} la: ${number.join(', ')}\n-> reply ket qua de thay doi, vd: 1 1 1`, id, (err, res)=>(res.name = exports.config.name, res.cb = args=>args.map(($,i)=>number[i]=isFinite($)?+$:1), global.client.handleReply.push(res), resolve())));


await new Promise(resolve=>setTimeout(resolve, 1000*5));
for (let i of number)img.push((await axios.get(getImage(i), {
    responseType: 'stream',
})).data);




var total = number[0] + number[1] + number[2];
if(choose == 'cuocso'){
    if(number[0] == tong || number[1] == tong || number[2] == tong){
        var ans = `${tong}`
        var result = 'win'
        var mn = bet * motsogiong 
        var mne = money + mn
    }
    if(number[1] == tong && number[2] == tong || number[0] == tong && number[2] == tong || number[0] == tong && number[1] == tong){
        var ans = `${tong}`
        var result = 'win'
        var mn = bet * haisogiong
        var mne = money + mn
    }
    if(number[0] == tong && number[1] == tong && number[2] == tong){
        var ans = `${tong}`
        var result = 'win'
        var mn = bet * basogiong
        var mne = money + mn
    }
    if(number[0] != tong && number[1] != tong && number[2] != tong){
        var ans = `${tong}`
        var result = 'lose'
        var mn = bet
        var mne = money - mn
    }   
}
if(choose == 'cuoctong'){
    if(total == tong){
        var ans = "cược tổng"
        var result = 'win'
        var mn = bet * BigInt((getRATE(tong)))
        var mne = money + mn
    } else {
        var ans = `${total}`
        var result = 'lose'
        var mn = bet
        var mne = money - mn
    }
}
if(choose == 'b3gn' ){
    if(number[0] == number[1] && number[1] == number[2]) {
        var ans = "bộ ba đồng nhất"
        var result = 'win'
        var mn = bet * BigInt(tilethangb3dn)
        var mne = money + mn
    } else {
        var ans = (total >= 11 && total <= 18 ? "tài" : "xỉu") 
        var result = 'lose'
        var mn = bet
        var mne = money - mn
    }
}
if(choose == 'b2gn'){
    if(number[0] == number[1] || number[1] == number[2] || number[0] == number[2]) {
        var ans = "bộ hai đồng nhất"
        var result = 'win'
        var mn = bet * BigInt(tilethangb2dn)
        var mne = money + mn
    } else {
        var ans = (total >= 11 && total <= 18 ? "tài" : "xỉu") 
        var result = 'lose'
        var mn = bet
        var mne = money - mn
    }
}
if(choose == 'tài' || choose == 'xỉu') {
if(number[0] == number[1] && number[1] == number[2]){
var ans = "bộ ba đồng nhất"
} else {
var ans = (total >= 11 && total <= 18 ? "tài" : "xỉu") 
}
if(number[0] == number[1] && number[1] == number[2]) {
    var result = 'lose'
    var mn = bet
    var mne = money - mn
}
if(ans == choose) {
    var result = 'win'
    var mn = bet * BigInt(tilethang)
    var mne = mn + money
} else {
    var result = 'lose'
    var mn = bet
    var mne = money - mn
}
}
if(result =='lose'){
    decreaseMoney(senderID, String(mn))
} else if(result == 'win'){
    increaseMoney(senderID, String(mn))
}
var msg =   `=== [ 𝗞𝗘̂́𝗧 𝗤𝗨𝗔̉ 𝗧𝗔̀𝗜 𝗫𝗜̉𝗨 ] ===\n━━━━━━━━━━━━━━━━━━` 
            + '\n' + 
            `⏰ 𝗩𝗮̀𝗼 𝗹𝘂́𝗰: ${format_day}`
            + '\n' +
            `👤 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗖𝗵𝗼̛𝗶: ${name}`
            + '\n' +
            `✔️ 𝗟𝘂̛̣𝗮 𝗰𝗵𝗼̣𝗻: ${choose}`
            + '\n' +
            `⚙️ 𝗞𝗲̂́𝘁 𝗾𝘂𝗮̉: ${ans}`
            + '\n' +
            `🎲 𝗫𝘂́𝗰 𝘅𝗮̆́𝗰 𝟭: ${number[0]}`
            + '\n' + 
            `💐 𝗫𝘂́𝗰 𝘅𝗮̆́𝗰 𝟮: ${number[1]}`
            + '\n' +
            `💝 𝗫𝘂́𝗰 𝘅𝗮̆́𝗰 𝟯: ${number[2]}`
            + '\n' +
            `🖇️ 𝗧𝗼̂̉𝗻𝗴 𝗯𝗮 𝘅𝘂́𝗰 𝘅𝗮̆́𝗰: ${total}`
            + '\n' +
            `😻 𝗞𝗲̂́𝘁 𝗾𝘂𝗮̉: ${(result == 'win' ? 'Thắng' : 'Thua')}`
            + '\n' +
            `💵 𝗧𝗶𝗲̂̀𝗻 𝗰𝘂̛𝗼̛̣𝗰:  ${replace(bet)}`
            + '\n' +
            `💶 𝗧𝗶𝗲̂̀𝗻 ${(result == 'win' ? 'Thắng' : 'Thua')}: ${replace(mn)}$`
            + '\n' +
            `🕵️ 𝗧𝗿𝗮̣𝗻𝗴 𝗧𝗵𝗮́𝗶: ${(result == 'win' ? 'Đã Trả Thưởng' : 'Đã Trừ Tiền')}`
            + '\n' +
            `💸 𝗦𝗼̂́ 𝗧𝗶𝗲̂̀𝗻 𝗛𝗶𝗲̣̂𝗻 𝗧𝗮̣𝗶: ${replace(mne)}$`
            + '\n' +
            `🐧Chúc Bạn May Mắn🐧`
            HakiraSEND({body:msg,attachment: img}, threadID, messageID)
            if(bdsd == false) {
          var msg =  `====[ 𝗠𝗶𝗿𝗮𝗶 𝗣𝗮𝘆 ]====\n[ ⏰ ] 𝗩𝗮̀𝗼 𝗹𝘂́𝗰: ${format_day}\n[ 📣 ] 𝗕𝗮̣𝗻 đ𝗮̃ ${(result == '𝗪𝗶𝗻') ? 'đ𝘂̛𝗼̛̣𝗰 𝗻𝗵𝗮̣̂𝗻 𝘁𝗶𝗲̂̀𝗻 ' : '𝗯𝗶̣ 𝘁𝗿𝘂̛̀ 𝘁𝗶𝗲̂̀𝗻'} 𝘁𝘂̛̀ 𝗱𝗶̣𝗰𝗵 𝘃𝘂̣ 𝗴𝗮𝗺𝗲 𝘁𝗮̀𝗶 𝘅𝗶̉𝘂 𝗰𝘂̉𝗮 ${global.config.BOTNAME}\n[ 💸 ] 𝘀𝗼̂́ 𝘁𝗶𝗲̂̀𝗻 𝗹𝗮̀: ${replace(mn)}$\n[ 🥀 ] 𝗦𝗼̂́ 𝗱𝘂̛ 𝗰𝗼̀𝗻 𝗹𝗮̣𝗶 𝘁𝗿𝗼𝗻𝗴 𝘁𝗮̀𝗶 𝗸𝗵𝗼𝗮̉𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗹𝗮̀: ${replace(mne)}$\n[ 💓 ]${global.config.BOTNAME} 𝗰𝗮̉𝗺 𝗼̛𝗻 𝗯𝗮̣𝗻 đ𝗮̃ 𝘁𝗶𝗻 𝘃𝗮̀ 𝗱𝘂̀𝗻𝗴 𝗱𝗶̣𝗰𝗵 𝘃𝘂̣ 𝗰𝘂̉𝗮 𝗠𝗶𝗿𝗮𝗶 𝗣𝗮𝘆`
            HakiraSEND({
                body: msg,
               attachment: (hmm)
            }, senderID)
        }
} catch(e){
    console.log(e)
}}
exports.handleReply = o=>(o.handleReply.cb(o.event.args), o.api.sendMessage('da thay doi ket qua tai xiu', o.event.threadID))