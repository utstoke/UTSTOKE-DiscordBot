// 新入生がウェルカムchに名前を投稿したときの処理を書くメインファイル

require('dotenv').config();
const {Events} = require('discord.js');
const axios = require('axios');

module.exports = async (message)=>{
    const name = message.content;
    const requestToPersonalInfoSpreadsheet = await axios.get(`${process.env.PERSONAL_INFO_SPREADSHEET}/search?sheet=名簿&氏名=${name}`);
    const record = requestToPersonalInfoSpreadsheet.data;

    if (record.length===0){
        message.reply(`❌ ${name}さんのデータは個人情報シートに記録されていません。表記を確認して、もう一度お試しください。`);
        return;
    }

    const memberID = message.author.id;
    const gen = record[0]['代']; //integer

    // 新入生のDiscord設定を変更

    const changeNickname = require('./changeNickname.js');
    await changeNickname(message, name, gen);

    const addRoles = require('./addRoles.js');
    await addRoles(message, name, gen);

    message.reply(`${name}さんのDiscord設定が完了しました。他のチャンネルも覗いてみてください！`);

    const deleteRole = require('./deleteRole.js');
    await deleteRole(message, name, gen);

    //ウェルカムchの不要なメッセージを削除する
    const messagesToDelete = await message.channel.messages.fetch({after: process.env.WELCOME_CHANNEL_DEFAULT_MESSAGE_ID});
    message.channel.bulkDelete(messagesToDelete);

    // 新入生のToDoリストチャンネルを作成
    // const createTodoChannel = require('./createTodoChannel.js');
    // const newTodoChannelID = await createTodoChannel(message, name, gen);

    // MongoDBデータベースに追記
    // const addToDatabase = require('./addToDatabase.js');
    // await addToDatabase(memberID, name, gen, newTodoChannelID)
}
