var bcrypt = require('bcrypt-nodejs');

function getEncryptedPassword(password){
return new Promise(function(resolve,reject){
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
           reject(err);
       }
       bcrypt.hash(password, salt, null, function (err, hash) {
           if (err) {
           reject(err)
       }
       resolve(hash)
    
   });
});
      

})
}

function comparePassword(password,originalpassword) {
    return new Promise(function(resolve,reject){
          bcrypt.compare(password,originalpassword,function(err,isMatch){
              if(err)
                 reject(err);
              else
                 resolve(isMatch)
          })
  });
}

module.exports = {encrypt: getEncryptedPassword,compare:comparePassword}