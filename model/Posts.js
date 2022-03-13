const { Schema, model } = require('mongoose');

const newPost = new Schema({
    userId: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        max: 1000,
    },
    img: {
        type: String,
    },
    username: {
        type: String
    }
}, {timestamps: true});

module.exports = model('post', newPost)