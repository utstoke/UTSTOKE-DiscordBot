//新入生がウェルカムchに名前を投稿したときの処理を書くメインファイル

const {Events} = require('discord.js')
const axios = require('axios')

module.exports = async (message)=>{
    message.reply('データベースをチェック中...')

    const name = message.content
    const requestToPersonalInfoSheet = await axios.get(`${process.env.PERSONAL_INFO_SHEET}/search?sheet=名簿&氏名=${name}`)
    const record = requestToPersonalInfoSheet.data

    if(record.length===0){
        message.reply(`${name}さんのデータは個人情報シートに記録されていません。詳しくは代表までお問い合わせください。`)
    }else{
        //新入生のDiscord設定を変更(ToDoチャンネルの作成, ロールの付与, ニックネームの変更)
        const modifyDiscord = require('./modifyDiscord.js')
        await modifyDiscord(message, name, record)

        //データベースに追記
        const addToDatabase = require('./addToDatabase.js')
        addToDatabase(message, name)
    }

    message.reply('Discordの設定が完了しました。ようこそ！')
}
