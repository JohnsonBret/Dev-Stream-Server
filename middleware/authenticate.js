var {User} = require('./../models/user');

var authenticate = async (req, res, next)=>{
    var token = req.header('x-auth');

    try{
        const foundUser = await User.findByToken(token);

        if(!foundUser)
        {
            throw new Error();
        }

        req.user = foundUser;
        req.token = token;
        next();
        
    }catch(e){ 
        res.status(401).send({error: "Authentication failed: Did you login?"});
    }
}
    


    


module.exports = {authenticate};