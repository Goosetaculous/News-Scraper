const mongoose =  require('mongoose')

var ArticleSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
        trim: true,
        minlength: 1
    },
    excerpt:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    saved: {
        type:Boolean,
        default:false
    },
    article_id: {
        type: Number
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notes"
    }],
}, { versionKey: false })

var Articles = mongoose.model('articles',ArticleSchema)

module.exports = {Articles}