require('dotenv').config();
const {Events} = require('discord.js');

module.exports = {
   name: Events.GuildMemberAdd,
   async execute(member){
      await member.roles.add(process.env.NEW_MEMBER_ROLE_ID);
   }
}