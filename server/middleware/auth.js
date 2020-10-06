const {User} = require('../models/user')
let auth = (req, res, next) => {
    // get token from client's cookie
    let token = req.cookies.x_auth;
    // decode token to find userID
    User.findByToken(token, (err, user) =>{
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error: ture});
        req.token = token;
        req.user= user;
        next();
    })
    // if user is existed, okay
    // user doesn't existed, no

}

module.exports = {auth};