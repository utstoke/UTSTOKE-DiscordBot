const {Events} = require('discord.js');

module.exports = async (message, name, gen) => {
    // ニックネームを変更。
    // ToDo管理botより高いロールが既に付与されている人に対してはエラーを吐く。
    try {
        await message.member.setNickname(`${name}(${gen}期)`);
    } catch (error) {
        console.log(`Unable to change the nickname. Error: ${error}`);
    }
}