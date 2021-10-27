const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        immutable: true,
    },
    date: {
        type: Date,
        default: Date.now,
        immutable: true
    }
})

module.exports = Post = mongoose.model('Post', PostSchema)