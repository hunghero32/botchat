const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs-extra');
const axios = require('axios');

let gameData = [];

module.exports.config = {
  name: "clmm",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "L.V. Bằng",
  description: "clmm canvas",
  commandCategory: "Game",
  usages: "Chẵn/lẻ + số tiền\nCheck để xem giao dịch gần đây\nMoney để xem số tiền hiện có!",
  cooldowns: 5
};

module.exports.onLoad = async () => {
  
  if (fs.existsSync(__dirname + '/cache/game_data.json')) {
    gameData = fs.readJsonSync(__dirname + '/cache/game_data.json', { throws: false }) || [];
  }
};
async function streamUrl(url) {
const res = await axios({
  url: url,
  method: 'GET',
  responseType: 'stream'
});
return res.data;
}
module.exports.run = async function({ args, event, api, Users, Currencies }) {
  try {
    const fontURL = 'https://drive.google.com/u/0/uc?id=1K0kBqF9ulB7uhqD0brMyjDYOUDn-1C1V&export=download';
    const response = await axios.get(fontURL, { responseType: 'arraybuffer' });
    const font = new Uint8Array(response.data);
    const fontPath = __dirname + '/cache/Roboto-Regular.ttf';
    fs.writeFileSync(fontPath, font);

    registerFont(fontPath, { family: 'Roboto' });

    const { threadID, messageID } = event;
    const userId = event.senderID;
    const userName = await Users.getNameUser(userId);
    const betType = args[0];

    if (!betType) {
      api.sendMessage({body: '<-> /clmm + chẵn/lẻ + số tiền \n<-> /clmm check = xem bạn thắng hay chưa \n<-> /clmm money = xem bạn có bao nhiêu tiền', attachment: await streamUrl('https://i.imgur.com/28V5n7a.jpeg')}, threadID, messageID)
      return;
    }

    if (betType === 'check') {
      const existingUser = gameData.find(data => data.userId === userId);
      if (existingUser) {
        api.sendMessage({ body: `Thông tin giao dịch gần nhất của bạn:\n\nMã giao dịch: ${existingUser.transactionCode}\nNội dung: ${existingUser.betType}\nKết quả: ${existingUser.result}` }, threadID, messageID);
      } else {
        api.sendMessage('Bạn chưa có thông tin giao dịch gần nhất.', threadID, messageID);
      }
      return;
    }

    var money = +args[1];
    let bonus = 0;

    if (!money && betType !== 'money') {
      api.sendMessage('Vui lòng nhập số tiền cược!', threadID, messageID);
      return;
    }

    const dataMoney = await Currencies.getData(userId);
    const moneyUser = dataMoney.money;

    if (betType === 'money') {
      const width = 373;
      const height = 763;
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext('2d');
      registerFont(__dirname + '/cache/Roboto-Regular.ttf', { family: 'Roboto' });

      loadImage('https://i.imgur.com/N5okUAy.jpeg').then((image) => {
        ctx.drawImage(image, 0, 0, width, height);

        ctx.font = '15px Roboto';

        ctx.fillStyle = 'black';

        const text = moneyUser.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        const textWidth = ctx.measureText(text).width;
        const x = (width - textWidth) / 6; // ngang
        const y = height / 2.7; // dọc

        ctx.fillText(text, x, y);
        const outputImagePath = __dirname + '/cache/money.jpeg';
        const outputStream = fs.createWriteStream(outputImagePath);
        const stream = canvas.createJPEGStream();

        stream.pipe(outputStream);
        outputStream.on('finish', () => {
          api.sendMessage({
            body: `Số tiền hiện có của bạn là:`,
            attachment: fs.createReadStream(outputImagePath)
          }, threadID, () => fs.unlinkSync(outputImagePath), messageID);
        });
      });
      return;
    }
    if (moneyUser < money || money < 100) {
      api.sendMessage('Số tiền bạn đặt phải lớn hơn 100 và không lớn hơn số dư của bạn!', threadID, messageID);
      return;
    }

    const transactionCode = Date.now().toString();
    const lastDigit = parseInt(transactionCode.slice(-1));

    let result;

    if ((lastDigit % 2 === 0 && betType === 'chẵn') || (lastDigit % 2 !== 0 && betType === 'lẻ')) {
      result = 'Win';
      await Currencies.increaseMoney(userId, parseInt(bonus));
    } else {
      result = 'Lose';
      await Currencies.decreaseMoney(userId, parseInt(money));
    }

     if (result === 'Win') {
       bonus = money*2.5;
     };

    const existingUserIndex = gameData.findIndex(data => data.userId === userId);

    if (existingUserIndex !== -1) {
      gameData[existingUserIndex] = {
        userId: userId,
        transactionCode: transactionCode,
        betType: betType,
        result: result,
      };
    } else {
      gameData.push({
        userId: userId,
        transactionCode: transactionCode,
        betType: betType,
        result: result,
      });
    }

    fs.writeJsonSync(__dirname + '/cache/game_data.json', gameData, { spaces: 4 });

    const canvasWidth = 500;
    const canvasHeight = 300;
    const cardPadding = 20;
    const cardTextColor = '#26110f';
    const cardTitleFontSize = 28;
    const cardContentFontSize = 20;
    const lineHeight = 32;

    const canvas = createCanvas(canvasWidth, canvasHeight);
    const context = canvas.getContext('2d');

    const backgroundImage = await loadImage('https://i.imgur.com/VBFaRw6.jpeg');

    context.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);

    context.font = `bold ${cardTitleFontSize}px Roboto`;
    context.fillStyle = cardTextColor;
    context.textAlign = 'center';
    context.fillText('clmmbot.com', canvasWidth / 2, cardPadding + cardTitleFontSize);

    context.beginPath();
    context.moveTo(cardPadding, 2 * cardPadding + cardTitleFontSize);
    context.lineTo(canvasWidth - cardPadding, 2 * cardPadding + cardTitleFontSize);
    context.strokeStyle = cardTextColor;
    context.lineWidth = 2;
    context.stroke();

    context.font = `${cardContentFontSize}px Roboto`;
    context.textAlign = 'left';
    context.fillStyle = cardTextColor;

    const contentStartX = cardPadding;
    const contentStartY = 2 * cardPadding + cardTitleFontSize + lineHeight;

    context.fillText('Mã giao dịch:  ' + transactionCode, contentStartX, contentStartY + 1 * lineHeight);

    context.fillText('Nội dung:  ' + betType, contentStartX, contentStartY + 2 * lineHeight);

    context.fillText('Kết quả:  ' + result, contentStartX, contentStartY + 3 * lineHeight);

    context.fillText('Người chơi: ' + userName, contentStartX, contentStartY + 4 * lineHeight);

    context.fillText('Tiền thưởng: ' + bonus.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }), contentStartX, contentStartY + 5 * lineHeight);

    const imagePath = __dirname + '/cache/result.png';
    const out = fs.createWriteStream(imagePath);
    const stream = canvas.createPNGStream();

    stream.pipe(out);
    out.on('finish', () => {
      api.sendMessage(
        {
          body: `Giao dịch thành công!\nBạn cược: ${betType}\n\nNote: Thắng ăn 2.5 tiền, thua mất số tiền đã cược!`,
          attachment: fs.createReadStream(imagePath)
        },
        threadID,
        async () => fs.unlinkSync(imagePath),
        messageID
      );
    });
  } catch (err) {
    console.log(err);
    api.sendMessage('Lỗi: ' + err.message, threadID, messageID);
  }
};