exports.config = {
  name: 'eval',
  version: '0.0.1',
  hasPermssion: 2,
  credits: 'DC-Nam',
  description: 'Run code js',
  commandCategory: 'Admin',
  usages: '[code]',
  cooldowns: 3
};
exports.run = function(o) {
  let send = msg=>o.api.sendMessage(msg, o.event.threadID, o.event.messageID);
  try {
    eval(o.args.join(' '));
  } catch (e) {
    send(e.toString());
  };
};