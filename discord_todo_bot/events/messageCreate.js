const {Events} = require('discord.js')
const axios = require('axios')

module.exports = {
    name: Events.MessageCreate,
    async excute(message){
        //サーバーに入ったばかりの新入生への対応。とりあえず開発用の新入生ウェルカムチャンネルにのみ反応する。
        if(message.channelId==process.env.WELCOME_CHANNEL_ID && !message.author.bot){
            const indexForNewMember = require('../newMember/indexForNewMember.js')
            indexForNewMember(message)
        }
    }
}
