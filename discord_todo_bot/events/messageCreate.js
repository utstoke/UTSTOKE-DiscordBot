const {Events} = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message){
        //新入生ウェルカムチャンネルにのみ反応する
        if (message.channelId==process.env.WELCOME_CHANNEL_ID && !message.author.bot){
            message.reply('処理中...少々お待ちください。');
            const indexForNewMember = require('../src/newMember/indexForNewMember.js');
            indexForNewMember(message);
        }
    }
}
