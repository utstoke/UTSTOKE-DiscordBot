require('dotenv').config();
const {Events} = require('discord.js')

module.exports = async (message, name, gen) => {
    // gen期と現役のロールを付与する
    // ToDo管理botロールのランクを、両方の上に設定しておく必要がある。
    const genRole = message.guild.roles.cache.find(role => role.name===`${gen}期`);
    
    if (!genRole) {
        console.log(`${gen}期ロールが存在しません。`); 
        return;
    }

    const rolesToAdd = [genRole.id, process.env.ACTIVE_MEMBER_ROLE_ID];

    for (roleID of rolesToAdd){
        if (message.member.roles.cache.has(roleID)) continue;

        try {
            await message.member.roles.add(roleID);
        } catch (error) {
            console.log(`Error adding role to new member: ${error}`);
            message.reply(`❌ ${name}さんにロールを付与できませんでした。申し訳ありませんが、管理者にお問い合わせください。`);
            return;
        }
    }
}