const bcrypt = require('bcrypt')
const pool = require('./main')
const express = require('express')
const app = express()
app.use(express.json())
app.listen(3000,()=>{
    console.log('running');
})

app.post('/register',async(req,res)=>{
    const {name,password} = req.body
    try {
        const hashedPassword = await bcrypt.hash(password,10)
        const result = await pool.query('INSERT INTO users(name,password) VALUES($1,$2)',[name,hashedPassword])
        res.json('added')
    } catch (err) {
        console.log(err);
        res.status(500).json('errorr')
    }
})

app.post('/login',async(req,res)=>{
    const {name,password} = req.body
    try {
        const result = await pool.query('SELECT * FROM users where name = $1',[name])
        const user = await result.rows[0]

        const check = await bcrypt.compare(password, user.password)
        if (!check) {
          return res.status(400).json("Kate");
        }
        res.json('kirldi')
    } catch (err) {
        console.log(err);
        res.status(500).json('error')
    }
})