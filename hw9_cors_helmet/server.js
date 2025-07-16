const cors = require('cors')
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('./main')
const helmet = require('helmet')

const corsOptions = {
  origin: "http://localhost:5173",
};

const app = express()
app.use(express.json())
app.use(cors(corsOptions))
app.use(helmet())

const SECRET_KEY = 'secret123'

function verifyToken(req,res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json('Token is missing')
    }
    jwt.verify(token,SECRET_KEY,(err,user)=>{
        if (err) {
            return res.status(404).json('Error token or SECRET KEY')
        }
        req.user = user
        next()
    })
}


app.post('/register',async(req,res)=>{
    const {username,password} = req.body
    if (!username || !password) {
        return res.status(401).json('username or password undefined')
    }
    try {
        const hashedPassword = await bcrypt.hash(password,10)
        const result = await pool.query('INSERT INTO users(username,password) values($1,$2)',[username,hashedPassword])
        res.json('added')
    } catch (err) {
        console.log(err);
        res.status(404).send('Error')
    }
})

app.post('/login',async(req,res)=>{
    const {username,password} = req.body
    if (!username || !password) {
      return res.status(401).json("username or password undefined");
    }
    try {
        const result = await pool.query('SELECT * FROM users where username = $1',[username])
        const user = result.rows[0]
        const verify = await bcrypt.compare(password, user.password)
        if (!verify) {
            return res.status(401).json('Password is wrong')
        }
        const token = jwt.sign({username: user.username }, SECRET_KEY, { expiresIn: "1h" });
        res.json({token})
    } catch (err) {
        console.log(err);
        res.status(404).send("Error");
    }
})

app.get('/profile',verifyToken,async(req,res)=>{
        try {
          res.json(req.user);
          console.log(SECRET_KEY);
        } catch (err) {
          console.log(err);
          res.status(404).json("Error");
        }
})

app.listen(3000,()=>{
    console.log('kosldy');
    
})