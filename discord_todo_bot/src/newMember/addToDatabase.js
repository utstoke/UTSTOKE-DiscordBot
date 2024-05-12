require('dotenv').config()
const mongoose = require('mongoose');

module.exports = async (memberID, name, gen, newTodoChannelID)=>{
    await mongoose.connect(process.env.MONGODB_URL)
    .then(console.log('Connected to MongoDB'))
    .catch((e) => {console.log(`Error connecting to MongoDB: ${e}`); return;});

    const schema = new mongoose.Schema({
        _id: Number,
        name: String,
        gen: Number,
        todoChannelID: Number
    },{
        versionKey: false
    })

    const newMemberModel = mongoose.model('discord_id', schema)
    const newMember = new newMemberModel({
        _id: memberID,
        name: name,
        gen: gen,
        todoChannelID: newTodoChannelID
    })
    
    await newMember.save()
    .then(console.log('Saved to MongoDB'))
    .catch((e) => {console.log(`Error saving to MongoDB: ${e}`); return;})
}
