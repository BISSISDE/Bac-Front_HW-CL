const pool = require('./main')
const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

const SECRET_KEY = 'secret123'

function verifyToken(req,res,next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(404).json('Token missing')
    }
    jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) return res.status(403).json({ message: 'Invalid token' });
            req.user = user;
            next();
    });
}

app.post("/regist", async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json("Username, password немесе email бос");
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query("INSERT INTO users(username, password, email) values($1, $2, $3)",[username, hashedPassword, email]);
    res.json("added");
  } catch (err) {
    console.error(err);
    res.status(500).json("Error");
  }
});


app.post("/login",async(req,res)=>{
    const {username,password,email} = req.body
    if (!username || !password ||!email) {
      res.status(404).send("Username or password or email empty");
    }
    try {
        const result = await pool.query('SELECT * FROM users where username = $1 and email = $2',[username,email])
        const user = result.rows[0]
        const check = await bcrypt.compare(password,user.password)
        if (!check) {
            res.status(404).json('Wrong password')
        }
        const token = jwt.sign({id:user.id,username:user.username,email:user.email},SECRET_KEY,{expiresIn: '24h'})
        res.json(token)
    } catch (err) {
        console.log(err);
        res.status(500).json("Error");
    }
});

app.get('/profile',verifyToken, async(req,res)=>{
    const {id} = req.user
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1',[id])
        res.json(result.rows)
        console.log(SECRET_KEY);
    } catch (err) {
        console.log(err);
        res.status(500).json("Error");
    }
})

app.listen(5000,()=>{
    console.log('Running');
    
})