const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cp = require('cookie-parser');

const { User } = require('./models/user');
const config = require('./config/key');
const user = require('./models/user');

const app = express();
const port = 3000;

//db connection
mongoose.connect(config.mongoURI, 
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true})
    .then(()=> console.log('Mongodb Connected...'))
    .catch(err=> console.log(err));
// x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// json
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Ello Orld!'));
// register
app.post('api/user/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, userInfo)=>{
        if(err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    });
})
// login
app.post('api/user/login', (req, res) =>{
    // find email in DB
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "Cannot find user with requested email."
            })
        } 
        // if requested email is in DB, check password
        user.comparePassword(req.body.password , (err, isMatch) => {
            if(!isMatch) 
                return res.json({loginSuccess: false, message: "Password doesn't match"});
            // if password is same, craete token
            user.generateToken((err, user) => {
                if(err) res.status(400).send(err);
                // saving token where?: cookie, local storage 
                res.cookie('x_auth', user.token)
                .status(200)
                .json({loginSuccess: true, userId: user._id})
            })
        });
    })
})

app.listen(port, () => console.log(`boiler-plate listening on port ${port}`));


