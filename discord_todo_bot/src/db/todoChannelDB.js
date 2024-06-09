require('dotenv').config();
const mongoose = require('mongoose');
const model = require('../db/models.js');
const todoChannelModel = model.todoChannelModel;

async function checkDBConnection(){
    await mongoose.connect(process.env.MONGODB_URL).catch((e) => {
            console.log(`Error connecting to MongoDB: ${e}`);
            return;
        }
    );
}

// Add new document to the todoChannel collection
async function addTodoChannel(memberID, name, gen, newTodoChannelID){
    await checkDBConnection();

    await new todoChannelModel({
        _id: memberID,
        name: name,
        gen: gen,
        todoChannelID: newTodoChannelID
    })
        .save()
        .then(console.log('Saved new document to todoChannel collection'))
        .catch((e) => {
            console.log(`Error saving new document: ${e}`);
        })
    ;
}

// Find document(s) in the todoChannel collection
async function findTodoChannelByMemberID(memberID){
    await checkDBConnection();

    return await todoChannelModel.find({_id: memberID}).exec();
}


module.exports = {
    addTodoChannel,
    findTodoChannelByMemberID,
}
