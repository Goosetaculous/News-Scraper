const mongoose =  require('mongoose')

var NoteSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true,
        trim: true,
        minlength: 1,
        unique: true, //like primary key  can't have multiple

    }
})

//Tso all data is not visible in postman
//.methods.  part of mongoose
NoteSchema.methods.toJSON = function(){
    console.log(this)
    var user =  this
    var userObject =  user.toObject()

    return _.pick(userObject,['_id','email'])
}

var Notes = mongoose.model('Notes',NoteSchema)

module.exports = {Notes}