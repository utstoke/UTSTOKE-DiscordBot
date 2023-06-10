//新入生がウェルカムchに名前を投稿したときの処理を書くメインファイル

const {Events} = require('discord.js')
const axios = require('axios')

module.exports = async (message)=>{
    const name = message.content
    const requestToPersonalInfoSheet = await axios.get(`${process.env.PERSONAL_INFO_SHEET}/search?sheet=名簿&氏名=${name}`)
    const record = requestToPersonalInfoSheet.data

    if(record.length===0){
        message.reply(`❌ ${name}さんのデータは個人情報シートに記録されていません。表記を確認して、もう一度お試しください。`)
    }else{
        const memberID = message.author.id
        const gen = record[0]['代'] //integer

        //新入生のDiscord設定を変更(ロールの変更, ニックネームの変更)。todoチャンネルの作成用コードもコメントとして残してあるが、上手い方法が見つかるまで使わない。
        const modifyDiscord = require('./modifyDiscord.js')
        await modifyDiscord(message, name, gen)
        //const newTodoChannelID = await modifyDiscord(message, name, gen) <-- todoチャンネルを使う場合はコメントアウトを外す

        //個人情報シートを更新
        const discordInfoSheet = axios.post(`${process.env.PERSONAL_INFO_SHEET}?sheet=discord`, {名前: name, 代: gen, ID: memberID})

        // MongoDBデータベースに追記する方法
        // const addToDatabase = require('./addToDatabase.js')
        // await addToDatabase(memberID, name, gen, newTodoChannelID)

        //ウェルカムchの不要なメッセージを削除する
        const messagesToDelete = await message.channel.messages.fetch({after: '1116774827383066684'})
        message.channel.bulkDelete(messagesToDelete)
    }
}
