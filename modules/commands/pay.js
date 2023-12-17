module.exports.config = {
  name: "pay",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Mirai Team",// mode lại bởi Hưng
  description: "Chuyển tiền của bản thân cho ai đó",
  commandCategory: "Bank",
  usages: "tag/reply",
  cooldowns: 5,
};

module.exports.run = async ({ event, api, Currencies, args, Users }) => {
  try{
  let { threadID, messageID, senderID } = event;
  const mention = Object.keys(event.mentions)[0];
  const balance = (await Currencies.getData(senderID)).money;
  if (!mention && event.messageReply) {
    const coins = args[0] === 'all' ? balance : BigInt(args[0]) 
    if (isNaN(String(coins))) return api.sendMessage(`Nội dung bạn nhập không phải là 1 con số hợp lệ!`, threadID, messageID);
    const namePay = await Users.getNameUser(event.messageReply.senderID);
    if (coins > balance) return api.sendMessage(`Số tiền bạn muốn chuyển lớn hơn số tiền bạn hiện có!`, threadID, messageID);
   return api.sendMessage({ body: 'Đã chuyển cho ' + namePay + ` ${formatNumber(coins)}$`}, threadID, async () => {
      await Currencies.increaseMoney(event.messageReply.senderID, String(coins));
      Currencies.decreaseMoney(senderID, String(coins))
    }, messageID);
  }
  let name = event.mentions[mention].split(" ").length
if(!mention) return api.sendMessage('Vui lòng tag người muốn chuyển coins cho!',threadID,messageID);
else {
  const coins = args[0] === 'all' ? balance : BigInt(args[0])
  console.log(coins)
	if(!isNaN(String(coins))) {
		let balance = (await Currencies.getData(senderID)).money;
        if (coins <= 0) return api.sendMessage('Số tiền bạn muốn chuyển không hợp lệ',threadID,messageID);
		if (coins > balance) return api.sendMessage('Số tiền bạn muốn chuyển lớn hơn số tiền bạn hiện có!',threadID,messageID);
		else {
        return api.sendMessage({ body: 'Đã chuyển cho ' + event.mentions[mention].replace(/@/g, "") + ` ${formatNumber(coins)}$`}, threadID, async () => {
            await Currencies.increaseMoney(mention, String(coins));
                  Currencies.decreaseMoney(senderID, String(coins))
            }, messageID);
		}
	} else return api.sendMessage('Vui lòng nhập số coins muốn chuyển',threadID,messageID);
}
  }catch(e){
    console.log(e)
  }
}

function formatNumber(number) {
  return number.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}