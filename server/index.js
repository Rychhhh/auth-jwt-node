const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const User = require('./model/user.model')

app.use(cors());

app.use(express.json());

const uri = 'mongodb+srv://authjwt:authjwt123@cluster0.qsm1e4w.mongodb.net/?retryWrites=true&w=majority'; 

mongoose.connect(uri, { useNewUrlParser:true, useUnifiedTopology: true },(err) => {
    if(err) {
        console.log(err)
    } else {
        console.log('Connection')
    }
});


app.post('/api/register', async (req, res) => {
    console.log(req.body);

    try {
        const user = await User.create( {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        res.json({status  : "OK"})
    } catch( err) {
        res.json({status  : "ERROR", error: "Duplicate Email"})
    }

    res.json({status: 'OK'})
});

app.post('/api/login', async (req, res) => {
        const user = await User.findOne( { 
            name: req.body.name, 
            email: req.body.name 
        });

        if(user) {
           return res.json({ status: 'ok', user: true })
        } else {
           return res.json({ status: "error", user: false });
        }

});

app.listen(1337, () => {
    console.log('Run server !!!')
});