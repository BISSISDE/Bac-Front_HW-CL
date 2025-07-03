const pool = require('./main')
const express = require('express')
const app = express()
app.use(express.json())
app.listen(3000,()=>{
    console.log('Running')
})

app.get('/',async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM users left join instagram on users.id = instagram.users_id ')
        res.json(result.rows)
    } catch (err) {
        console.log(err);
        res.status(500).json("Error");
    }
})
app.put('/update/nameandemail/:id',async(req,res)=>{
    const {id} = req.params
    const {name,email} = req.body
    if (!name,!email,!id) {
        return res.status(400).json('empty')
    }
    try {
        const result = await pool.query("UPDATE instagram SET username=$1,email=$2 where users_id = $3",[name, email, id]);
        res.json('UPDATEDD')
    } catch (err) {
        console.log(err);
        res.status(500).send('Error')
    }
}) 
app.put("/update/password/:id", async (req, res) => {
  const { id } = req.params;
  const {password} = req.body;
  if (!password) {
    return res.status(400).json('Empty')
  }
  try {
    const result = await pool.query("UPDATE instagram SET password = $1 where users_id = $2",[password,id]);
    res.json("UPDATEDD");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
}); 

app.delete('/delete/:id',async(req,res)=>{
    const {id} = req.params
    try {
        const result = await pool.query('Delete from instagram where instagram.users_id = $1',[id])
        const result2 = await pool.query('Delete from users where id=$1',[id])
        res.json('DELETEDD')
    } catch (err) {
        console.log(err);
        res.status(500).json('Error')
    }
})