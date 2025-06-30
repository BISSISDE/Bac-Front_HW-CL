const express = require("express")
const app = express()
app.use(express.json())
const pool = require('./main')
app.get('/',async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM products')
        res.json(result.rows)
    } catch (err) {
        console.log(err.messege);
        res.status(500).json('Database error')
    }
})
app.listen(3000,()=>{
    console.log("kosly");
})