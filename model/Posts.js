const { Schema, model } = require('mongoose');

const newPost = new Schema({
    
}, {timestamps: true});

module.exports = model('post', newPost)