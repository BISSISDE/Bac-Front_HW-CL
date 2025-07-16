const cors = require('cors')
const helmet = require('helmet')
const pool = require('./main')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express')
const app = express()
app.use(express.json())
app.use(cors({ origin: "http://localhost:5173" }));
app.use(helmet())
const rateLimit = require('express-rate-limit')

const SECRET_KEY = 'secret123'
const loginLimiter = rateLimit({
  windowMs: 1000,
  max: 6,
  message: {
    status: 429,
    error: "Too Many Requests",
  },
});
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
    try {
        const hashedPassword = await bcrypt.hash(password,10)
        const result = await pool.query('INSERT INTO users(username,password) VALUES($1,$2)',[username,hashedPassword])
        res.json('the use added')
    } catch (err) {
        console.log(err);
        res.status(404).json('error')
    }
})


app.post('/login', loginLimiter ,async(req,res)=>{
    const {username,password} = req.body
    try {
        const result = await pool.query('SELECT * FROM users where username = $1',[username])
        const user = result.rows[0]
        const verify = await bcrypt.compare(password, user.password)
        if(!verify){
            return res.status(404).send("password qate")
        }
        const token = jwt.sign({username: user.username, password: user.password},SECRET_KEY,{expiresIn:'1h'})
        res.json({token})
    } catch (err) {
        console.log(err);
        res.status(404).send('Error')
    }
})


app.listen(3000,()=>{
    console.log('running');
})