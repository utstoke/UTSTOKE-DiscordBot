const {Events} = require('discord.js');

module.exports = {
    name: Events.ThreadCreate,
    async execute(thread){
        // お買い得情報チャンネルにスレッドが作成されたときの処理
        // TODO: お買い得情報チャンネルのIDを正しいものに変更する
        if (thread.parentId === process.env.DEAL_CHANNEL_ID){
            thread.guild.roles.fetch(process.env.ACCOUNTANT_ROLE_ID)
                .then(role => thread.send(`${role} 会計処理が必要な場合、このスレッドを元に手続きをお願いします。`))
                .catch(console.error);
        }
    }
}
