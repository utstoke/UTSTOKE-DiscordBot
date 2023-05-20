const {Events} = require('discord.js')

module.exports = {
    name: Events.InteractionCreate,
    async excute(interaction){
        if(!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName)

        if(!command){
            console.error(`No command matching ${interaction.commandName} was found.`)
            return
        }

        try {
            await command.excute(interaction)
        } catch (error) {
            console.log(error)
        }
    }
}