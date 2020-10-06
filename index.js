const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const {User} = require('./models/user');
const config = require('./config/key');

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
app.post('/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, userInfo)=>{
        if(err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    });
})

app.listen(port, () => console.log(`boiler-plate listening on port ${port}`));

