const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!').addStringOption(x =>
        x.setName('input').setDescription('Is this input ping?').setRequired(true)),
    async excute(interaction){
        const inputString = interaction.options.getString('input')
        if (inputString==='ping'){
            await interaction.reply('Pong!')
        }
    }
}