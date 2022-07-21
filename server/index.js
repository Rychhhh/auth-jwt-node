const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const User = require('./model/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config();



app.use(cors());

app.use(express.json());

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser:true, useUnifiedTopology: true },(err) => {
    if(err) {
        console.log(err)
    } else {
        console.log('Connection')
    }
});


app.post('/api/register', async (req, res) => {

    try {
        const passBcrypt = await bcrypt.hash(req.body.password, 10);
        await User.create( {
            name: req.body.name,
            email: req.body.email,
            password: passBcrypt
        })

        res.json({ status  : "ok" })
    } catch( err) {
        res.json({status  : "error", error: "Duplicate Email"})
    }

    res.json({status: 'OK'})
});

app.post('/api/login', async (req, res) => {

        const data =  {
            email: req.body.email
        }

        const user = await User.findOne(data);

        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            user.password
        )

        if(isPasswordValid) {

            const  token = jwt.sign({
                name: user.name,
                email: user.email,
            }, 'secret123')

           return res.json({ status: 'ok', user: token,  })
        } else {
           return res.json({ status: "error", user: false });
        }

});


// Cek data akan ditampilkan status 'ok'
app.get('/api/quote', async (req, res) => {

    // generate token
    const token = req.headers['x-access-token']


    // verify token, decode email, findOne user by email
    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const user = await User.find({ email: email })


        res.json({status: 'ok', quote: user.quote })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error' })
    }

});


// Simpan data quote setelah jelas status 'ok'
app.post('/api/quote', async (req, res) => {

    // generate token
    const token = req.headers['x-access-token']


    // verify token, decode email, findOne user by email
    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const user = await User.updateOne(
            { email: email },
            {$set: { quote: req.body.qoute}}
            )


        res.json({status: 'ok', quote: user.quote })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error' })
    }

});

app.listen(1337, () => {
    console.log('Run server !!!')
});