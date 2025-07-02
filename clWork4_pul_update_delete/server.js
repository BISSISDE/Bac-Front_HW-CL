const express = require('express')
const pool = require('./main')
const app = express()
app.use(express.json())

app.get('/',async(req,res)=>{
    try {
        const result = await pool.query("SELECT * FROM restaurants");
        res.json(result.rows)
    } catch (err) {
        console.log(err);
        res.status(500).send('Error')
    }
})
app.post('/add',async(req,res)=>{
    const {name,address,rating} = req.body
    if (!name || !address || !rating) {
        return res.json('empty')
        
    }
    try {
        const result = await pool.query("INSERT INTO restaurants (name, address, rating) Values($1,$2,$3)",[name,address,rating]);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
})
app.get("/restaurants/:id",async(req,res)=>{
    const {id} = req.params
    try {
        const result = await pool.query("SELECT * FROM restaurants where id = $1",[id]);
        res.json(result.rows)
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
});
app.put('/update/:id',async(req,res)=>{
    const {name,address,rating} = req.body
    const {id} = req.params
    try {
        const result = await pool.query("UPDATE restaurants set name = $1,address=$2,rating=$3 where id = $4",[name,address,rating,id] );
        res.send('updated')
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
})
app.delete('/delete/:id',async(req,res)=>{
    const {id} = req.params
    try {
        const result = await pool.query('DELETE from restaurants where id = $1 ',[id])
        res.json('deleted')
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
})
app.listen(4000,()=>{
    console.log('running');
})