const {Events} = require('discord.js')

module.exports = {
   name: Events.GuildMemberAdd,
   
   async excute(member){
      //臨時のロールNewMemberを付与する。
      await member.roles.add('1116738049548755044')
   }
}