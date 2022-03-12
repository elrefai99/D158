const { Schema, model } = require('mongoose');

const newUser = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        max: 50,
        min: 6
    },
    profileImage: {
        type: String,
        default: "user.jpeg",
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    desc: {
        type: String,
        max: 50,
    },
    country: {
        type: String,
        max: 50,
    },
    from: {
        type: String,
        max: 50,
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3],
    },
}, {timestamps: true});

module.exports = model('user', newUser)