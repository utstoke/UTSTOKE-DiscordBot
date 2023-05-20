const {Events} = require('discord.js')

module.exports = {
    name: Events.ClientReady,
    once: true,
    excute(client){
        console.log(`✅Logged in as ${client.user.tag}.`)
    }
}