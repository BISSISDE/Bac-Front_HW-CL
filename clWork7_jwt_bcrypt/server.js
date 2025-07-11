const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const pool = require("./main");
const app = express()

app.use(express.json())
app.use(cors())
const bcrypt = require('bcrypt');

app.listen(3000,()=>{
    console.log('running');
})


const SECRET_KEY = 'secret123'
function verifyToken(req,res,next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json('Token jok')
    }
    const token = authHeader && authHeader.split(' ')[1]

    try {
        const user = jwt.verify(token,SECRET_KEY)
        req.user = user
        next()
    } catch (err) {
        res.status(401).json('Error')
    }
}

app.post('/regist',async (req,res)=>{
    const {username,password} = req.body 
    try {
        const userCheck = await pool.query('SELECT * FROM users WHERE username = $1',[username])
        if (userCheck.rows.length > 0) {
            return res.status(400).json('User is must unique')
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const result = await pool.query('INSERT INTO users(username,password) VALUES($1,$2)',[username,hashedPassword])
        res.json('Registered')
    } catch (err) {
        console.log(err);
        res.status(401).json("Error");
    }
})

app.post('/login',async(req,res)=>{
    const {username,password} = req.body
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1',[username])
        const user = result.rows[0]
        if (!user) {
            return res.status(401).json('User undefined')
        }
        const verify = await bcrypt.compare(password,user.password)
        if (!verify) {
            return res.status(401).json("Wrong password");
        }
        const token = jwt.sign({id:user.id,username:user.username},SECRET_KEY,{expiresIn:'1h'})
        res.json(token)
    } catch (err) {
        console.log(err);
        res.status(401).json("Error");
    }
})

app.get('/profile',verifyToken,async(req,res)=>{
    res.json({message:`hello ${req.user.username} and my id is ${req.user.id}`})
})

app.get('/settings',verifyToken,(req,res)=>{
    res.json(
        {
            message:`This is a settings page`,
            user: req.user
        }
    )
})