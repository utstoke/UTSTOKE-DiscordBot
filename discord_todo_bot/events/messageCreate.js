const {Events} = require('discord.js')
const axios = require('axios')

module.exports = {
    name: Events.MessageCreate,
    async excute(message){
        //サーバーに入ったばかりの新入生への対応。とりあえず開発用の新入生ウェルカムチャンネルにのみ反応する。
        if(message.channelId==='1109407471556104214' && !message.author.bot){ 
            //ToDoチャンネルを作る
            const createToDoChannel = require('../newMember/createToDoChannel.js')
            createToDoChannel(message)

            //データベースに追記
        }
    }
}
