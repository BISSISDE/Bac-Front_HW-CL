const express = require("express");
const app = express()
app.use(express.json())
function jurnal(req,res,next) {
    console.log(`${req.method} ${req.url}`);
    next()
}
app.use(jurnal)
let users = []
app.get("/",(req,res)=>{
    res.json(users)
})
app.post('/',(req,res)=>{
    const {name,age,email}=req.body
    users.push({id:users.length+1, name, age, email });
    res.json(users)
})
app.get("/user/search",(req,res)=>{
    const {name} = req.query
    const index = users.findIndex((user) =>user.name == name)
    res.json(users[index])
});
app.put('/update/:id',(req,res)=>{
    const {id} = req.params
    const {email} = req.body
    let index = users.findIndex(user=>user.id == parseInt(id))
    users[index].email = email
    res.json(users[index])
})
app.delete("/delete/:id",(req,res)=>{
    const {id} = req.params
    let index = users.findIndex(user=>user.id == parseInt(id))
    users.splice(index,1)
    res.json(users)
});
app.listen(3000,()=>{
    console.log("kosldy");
})
app.get('/user/:id',(req,res)=>{
    const {id} = req.params
    const index = users.findIndex(user=>user.id == parseInt(id))
    res.json(users[index])
})

