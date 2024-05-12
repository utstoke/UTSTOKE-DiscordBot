require('dotenv').config();
const {Events} = require('discord.js')

module.exports = async (message, name, gen) => {
    //NewMemberロールを削除
    await message.member.roles.remove(process.env.NEW_MEMBER_ROLE_ID);
}