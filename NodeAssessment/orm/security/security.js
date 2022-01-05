var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
var model = require('../model/user')

async function getPassword(username){
    return new Promise(async function(resolve,reject){
        try{
            const user = await model.user.findOne({
                where:{username:username},
                attributes: ['password']
            })
            resolve(user.dataValues.password)
        }
        catch(err){
            reject(err)
        }
    })
}

module.exports = function(passport) {

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("Bearer");
opts.secretOrKey = "node-app-22"
passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    if(jwt_payload.username){
       let pass = await getPassword(jwt_payload.username)
       if(pass==jwt_payload.password)
             done(null,{user:"Faizal"})
       else
             done(null,false)
    }
       else
             done(null,false)
  }))
}