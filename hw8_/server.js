const express = require('express')
const cors = require('cors')
const pool = require('./main')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const app = express()

app.use(express.json())
app.use(cors())
app.listen(3000,()=>{
    console.log('Running');
})
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

app.post("/add", verifyToken, async (req, res) => {
  const { name, price, quantity } = req.body;
  try {
    const result = await pool.query("INSERT INTO products(name, price, quantity) VALUES($1, $2, $3)",[name, price, quantity]);
    res.json(`Product added by ${req.user.username}`);
  } catch (err) {
    console.log(err);
    res.status(404).json("Error");
  }
});

app.get("/products", verifyToken, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(404).json("Error");
  }
});

app.get('/profile',verifyToken,async(req,res)=>{
    try {
        res.json(req.user)
        console.log(SECRET_KEY);
    } catch (err) {
        console.log(err);
        res.status(404).json("Error");
    }
})

app.post("/login", (req, res) => {
  const { username } = req.body;
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});
