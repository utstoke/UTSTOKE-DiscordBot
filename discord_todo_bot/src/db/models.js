require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * _id: メンバーID。2^53より大きい値を扱うため、String型で定義。
 * name: 氏名
 * gen: メンバーの代
 * todoChannelID: ToDoリストチャンネルのID。2^53より大きい値を扱うため、String型で定義。
 */
const todoChannelSchema = new Schema({
    _id: String,
    name: String,
    gen: Number,
    todoChannelID: String
}, {
    versionKey: false
});

mongoose.connect(process.env.MONGODB_URL);

module.exports.todoChannelModel = mongoose.model('discord_id', todoChannelSchema);
