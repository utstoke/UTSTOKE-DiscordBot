const {ContextMenuCommandBuilder, ApplicationCommandType, Client} = require('discord.js');
const todoChannelDB = require('../../src/db/todoChannelDB.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Register Task')
        .setType(ApplicationCommandType.Message),
    async execute(interaction){
        const message = interaction.targetMessage.content;
        const regex = /<@(\d+)>/g;
        const memberIDs = [];

        let match;
        while ((match = regex.exec(message)) !== null) {
            memberIDs.push(match[1]);
        }

        if (memberIDs.length===0){
            interaction.reply('❌ メンションが含まれていません。メッセージを編集して、メンションを追加してから再度お試しください。');
            return;
        }
        
        const todoChannelIDs = [];
        for (const memberID of memberIDs){
            const document = await todoChannelDB.findTodoChannelByMemberID(memberID);
            if (document.length===0){
                interaction.reply(`❌ <@${memberID}> のToDoチャンネルが見つかりませんでした。`);
                return;
            }

            const todoChannelID = document[0].todoChannelID;
            todoChannelIDs.push(todoChannelID);
        }

        for (const todoChannelID of todoChannelIDs){
            const channel = interaction.guild.channels.cache.find(
                (channel) => channel.id == todoChannelID
            );
            channel.send(message);
        }

        interaction.reply('✅ ToDoチャンネルにタスクを追加しました。');
    }
};
