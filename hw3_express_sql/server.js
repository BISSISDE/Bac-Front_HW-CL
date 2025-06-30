const pool = require('./main')
const express = require('express')
const app = express()
app.use(express.json())
app.get('/',async (req,res)=> {
    try {
        const result = await pool.query('SELECT * FROM books')
        res.json(result.rows)
    } catch (err) {
        console.log(err);
        res.json("Error database")
    }
})
app.get('/book/:id',async(req,res)=>{
    const {id} = req.params
    try {
        // const index = pool.rows.findIndex((book) => book.id == parseInt(id));
        // const result = await pool.query(`SELECT * FROM books where id=${id}`);
        const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.json("Error database")
    }
})
app.listen(3000,()=>{
    console.log("kosldy");
})