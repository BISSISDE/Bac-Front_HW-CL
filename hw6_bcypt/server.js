const bcrypt = require('bcrypt')
const pool = require('./main')
const express = require('express')
const app = express()
app.use(express.json())
app.post('/regist',async(req,res)=>{
    const {username,password} = req.body
    try {
        if (password.length !== 6) {
            res.status(500).json('Password length 6 bolu kereek')
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const result = await pool.query('INSERT INTO users(username,password) values($1,$2)',[username,hashedPassword])
        res.json('added')
    } catch (err) {
        console.log(err);
        res.status(500).json('Errorr')
    }
})

app.post('/login',async(req,res)=>{
    const {username,password} = req.body
    try {
        const result = await pool.query('SELECT * FROM users where username = $1',[username])
        const user = await result.rows[0]
        const check = await bcrypt.compare(password,user.password)
        if (check) {
            res.json('Satti kirildi')
        }else{
            res.status(500).json('Try again')
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Errorr");
    }
})

app.listen(3000,()=>{
    console.log('Running');
})