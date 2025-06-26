const express = require('express')
const app = express()
app.use(express.static("public"));
app.use(express.json())
app.use((req,res)=>{
    res.status(404).json({
        status:404,
        message: 'Error'
    })
})
app.listen(3000,()=>{
    console.log("Kosldy");
})