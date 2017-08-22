var  env = process.env.NODE_ENV || 'development'
console.log("ENV ",env)

if(env ==='development'){
    process.env.PORT=3000
    process.env.MONGODB_URI = 'mongodb://josephtrop:P)o9I*u7@ds129402.mlab.com:29402/goose'

}else if(env === 'test'){
    process.env.PORT=3000
    process.env.MONGODB_URI = 'mongodb://josephtrop:P)o9I*u7@ds129402.mlab.com:29402/goose'
}
