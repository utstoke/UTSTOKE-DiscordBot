const {Events} = require('discord.js');

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
    

    // MongoDBの更新用
    // return newToDoChannel.id
}