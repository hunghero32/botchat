const { spawn } = require("child_process");
const { readFileSync } = require("fs-extra");
const http = require("http");
const axios = require("axios");
const semver = require("semver");
const logger = require("./utils/log");
const chalk = require("chalk");
const chalkercli = require("chalkercli");
const chalkAnimation = require('chalkercli');
var randomColor = Math.floor(Math.random()*16777215).toString(16);
const CFonts = require('cfonts');
/*const str = require('karaoke');
const logo = require('rainbow');
setTimeout(async() => {
    await karaoke.start()
    await rainbow1.start()
    console.clear()
}, 8000);

setTimeout(() => {
    karaoke.stop()
    rainbow1.stop()
}, 11800);*/
/////////////////////////////////////////////
//========= Check node.js version =========//
/////////////////////////////////////////////

// const nodeVersion = semvecfonts@latestr.parse(process.version);
// if (nodeVersion.major < 13) {
//     logger(`Your Node.js ${process.version} is not supported, it required Node.js 13 to run bot!`, "error");
//     return process.exit(0);
// };

///////////////////////////////////////////////////////////
//========= Create website for dashboard/uptime =========//
///////////////////////////////////////////////////////////

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);

logger("Liên hệ Facebook: https://www.facebook.com/hunghero32", "Facebook");
logger("Website: https://", "Contact");
logger("Donate Mbbank: 0375343852", "DONATE");
logger("Donate MoMo: 0375343852", "DONATE");

const rainbow = chalkercli.rainbow('\n[=== 𝐒𝐄𝐓𝐓𝐈𝐍𝐆 𝐁𝐎𝐓 𝐓𝐃𝐙 ===]\n').stop();

rainbow.render(); 

const frame = rainbow.frame(); 
console.log(frame);
logger("BOT STAR SUCCESSFULLY INITIALIZED", "BOT TDZ");
logger("Welcome back to Bot STAR", "BOT TDZ");
logger("BOT VIP running...", "BOT TDZ");
logger("Checking the version...", "UPDATE");
logger("Your version is the latest!", "UPDATE");

/////////////////////////////////////////////////////////
//========= Create start bot and make it loop =========//
/////////////////////////////////////////////////////////

function startBot(message) {
    (message) ? logger(message, "BOT STAR STARTING") : "";

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "mirai.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close",async (codeExit) => {
      var x = 'codeExit'.replace('codeExit',codeExit);
        if (codeExit == 1) return startBot("BOT RESTARTING!!!");
         else if (x.indexOf(2) == 0) {
           await new Promise(resolve => setTimeout(resolve, parseInt(x.replace(2,'')) * 1000));
                 startBot("Bot has been activated please wait a moment!!!");
       }
         else return; 
    });

    child.on("error", function (error) {
        logger("An error occurred: " + JSON.stringify(error), "Starting");
    });
};
////////////////////////////////////////////////
//========= Check update from Github =========//
////////////////////////////////////////////////


axios.get("https://raw.githubusercontent.com/TuanDeepTry-14072003/tuandz_main/mainV2/package.json").then((res) => {
  
})
setTimeout(async function () {
CFonts.say('TDZ', {
		font: 'block',
    	align: 'center',
  gradient: ['red', 'magenta']
		})
CFonts.say(`Bot Messenger Created By TDZ`, {
		font: 'console',
		align: 'center',
		gradient: ['red', 'magenta']
		})
  const rainbow = chalkercli.rainbow('\n[=== 𝐀𝐂𝐓𝐈𝐕𝐄 𝐁𝐎𝐓 𝐓𝐃𝐙 ===]\n').stop();

rainbow.render(); 

const frame = rainbow.frame(); 
console.log(frame);
  
  logger('Bắt đầu load source code', 'LOAD')
  startBot()
}, 70)