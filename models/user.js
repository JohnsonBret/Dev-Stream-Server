const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
    },
    password:{
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access:{
            type: String,
            required: true
            },
        token: {
            type: String,
            required: true
            } 
    }]
});

UserSchema.methods.generateAuthToken = async function(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, "##!##Secret_Salt_L00k_H3RE##!##").toString();

    user.tokens = user.tokens.concat([{access, token}]);

    const savedToken = await user.save();

    return token; 
};

UserSchema.statics.findByToken = async function(token){
    var User = this;
    var decoded;

    try{
        decoded = jwt.verify(token, "##!##Secret_Salt_L00k_H3RE##!##");
    } catch(e){

        return Promise.reject();
    }

    try{
        const foundUser = await User.findOne({
            '_id': decoded._id,
            'tokens.token': token,
            'tokens.access': 'auth'
        });

        console.log(`hi mom ${foundUser}`);

        return foundUser;
    } catch(e){
        
        return Promise.reject();
    }
};


UserSchema.statics.findByCredentials = async function(email, password){
    var User = this; 

    try{
        const foundUser = await User.findOne({email: email, password: password});

        if(!foundUser){
            return Promise.reject();
        }
    
        return Promise.resolve(foundUser); 
    }
    catch(e){
        return Promise.reject(e)
    }
};

var User = mongoose.model('User', UserSchema);

module.exports = {
    User: User
}