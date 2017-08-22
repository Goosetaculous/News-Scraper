var mongoose =  require('mongoose')

mongoose.Promise =  global.Promise; // use promises
// connecting
mongoose.connection.openUri(process.env.MONGODB_URI)


module.exports = {mongoose}


//process.env.NODE_ENV === 'production' || 'test' || development by heroku