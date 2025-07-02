const pool = require('./main')
const express = require('express')
const app = express()
app.use(express.json())

app.get('/',async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM foods')
        res.json(result.rows)
    } catch (err) {
        console.log(err);
        res.status(500).send('ERROR')
    }
})
app.post('/',async(req,res)=>{
    const {name,price,address} = req.body
    try {
        const result = await pool.query('INSERT INTO foods(name,price,address) VALUES($1,$2,$3)',[name,price,address])
        res.json('Data added')
    } catch (err) {
        console.log(err);
        res.status(500).send('ERROR')
    }
})
app.get('/food/:id',async(req,res)=>{
    const {id} = req.params
    try {
        const result =  await pool.query('SELECT * FROM foods where id = $1',[id])
        res.json(result.rows)
    } catch (err) {
        console.log(err);
        res.send('ERROR')
    }
})
app.listen(5000,()=>{
    console.log('running');
})
