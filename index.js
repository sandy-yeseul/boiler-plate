const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://Sandy:1234@boilerplate.4z9dn.mongodb.net/<dbname>?retryWrites=true&w=majority', 
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true})
    .then(()=> console.log('Mongodb Connected...'))
    .catch(err=> console.log(err));

app.get('/', (req, res) => res.send('Ello Orld!'));

app.listen(port, () => console.log(`boiler-plate listening on port ${port}`));

