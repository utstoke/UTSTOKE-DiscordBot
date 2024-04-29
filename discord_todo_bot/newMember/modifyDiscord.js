const {Events} = require('discord.js')

module.exports = async (message, name, gen) => {
    // //todoチャンネルを作成
    // const newToDoChannel = await message.guild.channels.create({
    //     name: `todoリスト_${name}`,
    //     parent: message.channel.parent
    // })

    // //基本的にtodoチャンネルの権限は、カテゴリーの@everyoneを引き継ぐ。ここでは新入生の閲覧権限のみ追加する。
    // newToDoChannel.permissionOverwrites.create(message.author, {
    //     ViewChannel: true 
    // });
    

    //gen期のロールを付与する。ToDo管理botロールのランクを○期より上に設定しておく必要がある。
    const role = message.guild.roles.cache.find(role => role.name===`${gen}期`)
    if (!role) {
        console.log(`${gen}期ロールが存在しません。`); 
        return;
    }

    if(!message.member.roles.cache.has(role.id)){
        try {
            await message.member.roles.add(role)
        } catch (error) {
            console.log(`Error adding role to new member: ${error}`)
        }
    }

    //ニックネームを変更。これもToDo管理botより高いロールが既に付与されている人に対してはエラーを吐く。
    try {
        await message.member.setNickname(`${name}(${gen}期)`) 
    } catch (error) {
        console.log(`Unable to change the nickname. Error: ${error}`)
    }

    await message.reply(`${name}さんのDiscord設定が完了しました。他のチャンネルも覗いてみてください！`)

    //NewMemberロールを削除
    await message.member.roles.remove('1116738049548755044')


    // MongoDBの更新用
    // return newToDoChannel.id
}