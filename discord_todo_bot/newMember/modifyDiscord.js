const {Events} = require('discord.js')
const axios = require('axios')

module.exports = async (message, name, record) => {
    //todoチャンネルを作成
    const newToDoChannel = await message.guild.channels.create({
        name: `todoリスト_${name}`,
        parent: message.channel.parent
    })

    //基本的にtodoチャンネルの権限は、カテゴリーの@everyoneを引き継ぐ。ここでは新入生の閲覧権限のみ追加する。
    newToDoChannel.permissionOverwrites.create(message.author, {
        ViewChannel: true 
    });
    

    //gen期のロールを付与する。ToDo管理botロールのランクを○期より上に設定しておく必要がある。
    const gen = record[0]['代'] //integer
    const role = message.guild.roles.cache.find(role => role.name===`${gen}期`)

    if (!role) {
        console.log(`${gen}期ロールが存在しません。`); return;
    }

    if(!message.member.roles.cache.has(role.id)){
        try {
            await message.member.roles.add(role)
        } catch (error) {
            console.log(error)
        }
    }


    //ニックネームを変更。これもToDo管理botより高いロールが既に付与されている人に対してはエラーを吐く。
    message.member.setNickname(`${name}(${gen}期)`)
}