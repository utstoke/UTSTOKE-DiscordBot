require('dotenv').config();
const {Events} = require('discord.js')

module.exports = async (message, name, gen) => {
    // gen期のロールを付与する
    // ToDo管理botロールのランクを○期より上に設定しておく必要がある。
    const role = message.guild.roles.cache.find(role => role.name===`${gen}期`);
    if (!role) {
        console.log(`${gen}期ロールが存在しません。`); 
        return;
    }

    if (message.member.roles.cache.has(role.id)) return;

    try {
        await message.member.roles.add(role);
    } catch (error) {
        console.log(`Error adding role to new member: ${error}`);
        message.reply(`❌ ${name}さんのロールを付与できませんでした。申し訳ありませんが、管理者にお問い合わせください。`);
    }

    //NewMemberロールを削除
    await message.member.roles.remove('process.env.NEW_MEMBER_ROLE_ID');
}