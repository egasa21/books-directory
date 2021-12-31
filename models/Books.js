const mongoose = require('mongoose');


const booksScheme = new mongoose.Schema({
    author:{
        type: String,
        required: true
    },
    releaseDate:{
        type: Date,
        required: true
    },
    title:{
        type: String
    },
    description:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Books', booksScheme)