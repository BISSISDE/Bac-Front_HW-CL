const pool = require('./main')
const express = require('express')
const app = express()
app.use(express.json())

app.get('/',async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM cars')
        res.json(result.rows)
    } catch (err) {
        console.log(err);
        res.json('error')
    }
})
app.post('/',async(req,res)=>{
    const {brand,model,price,year} = req.body
    if (!brand || !model || !price || !year) {
        res.status(400).send('Enter all of the data ')
    }
    try {
        const result = await pool.query('INSERT INTO cars(brand,model,price,year) values($1,$2,$3,$4)', [brand,model,price,year])
        res.json(result.rows)
    } catch (err) {
        console.log(err);
        res.status(500).json("Error");
    }
})
app.get('/car/:id',async(req,res)=>{
    const {id} = req.params
    if (!id) {
        res.status(400).send('Enter the id')
    }
    try {
        const result = await pool.query('SELECT * FROM cars where id = $1',[id])
        res.json(result.rows)
    } catch (err) {
        console.log(err);
        res.status(500).json('Error')
    }
})
app.listen(3000,()=>{
    console.log('running');
})