const mongoose =  require('mongoose')

var NoteSchema = new mongoose.Schema({
    note:{
        type: String,
        required:true,
        trim: true,
        minlength: 1
    },
    article_id: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    }

}, { versionKey: false })

var Notes = mongoose.model('notes',NoteSchema)

module.exports = {Notes}