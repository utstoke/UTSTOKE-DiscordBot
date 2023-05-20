const {Events} = require('discord.js')
const axios = require('axios')

module.exports = async (message) => {
    const name = message.content
    const spreadsheet = await axios.get(`https://sheetdb.io/api/v1/l83ln1xa6xfsw/search?sheet=名簿&氏名=${name}`)
    const memberData = spreadsheet.data
    
    if(memberData.length){
        const gen = memberData[0]['代'] //integer
        const userID = message.author.id

        //gen期のロールを付与する。ToDo管理botロールのランクを○期より上に設定しておく必要がある。
        const role = message.guild.roles.cache.find(role => role.name===`${gen}期`);
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

        //todoチャンネルを作成
        const newToDoChannel = await message.guild.channels.create({
            name: `todoリスト_${name}`,
            parent: message.channel.parent
        })

        //基本的にtodoチャンネルの権限は、カテゴリーの@everyoneを引き継ぐ。
        newToDoChannel.permissionOverwrites.create(message.author, {
            ViewChannel: true //ここでは閲覧権限のみ追加する
        });
    }else{
        message.reply(`${name}さんのデータは個人情報シートに記録されていません。詳しくは代表までお問い合わせください。`)
    }
}