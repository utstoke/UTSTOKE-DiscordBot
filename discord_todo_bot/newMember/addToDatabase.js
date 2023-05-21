const axios = require('axios')

module.exports = (message, name)=>{
    axios.post(`${process.env.PERSONAL_INFO_SHEET}?sheet=discord`, {
        data: {
            名前: name,
            ID: message.author.id,
            表示名: message.member.nickname,
            usertag: message.author.tag
        }
    })
}