const express = require("express")
const app = express()
function jurnal(req,res,next) {
    console.log(req.method,req.url);
    next()
}
app.use(jurnal)
app.use(express.json())
app.listen(3000,()=>{
    console.log("kosldy");
})
let car = []
app.post('/',(req,res)=>{
    const {brand,model,year,color,price} = req.body
    car.push({ id: car.length + 1, brand, model, year, color, price });
    res.json(car)
})

app.get('/',(req,res)=>{
    res.json(car)
})
app.get('/car/search',(req,res)=>{
    const {brand} = req.query
    const index = car.findIndex(car=>car.brand == brand)
    res.json(car[index])
})
app.put("/update/:id",(req,res)=>{
    const {updateBrand} = req.body
    const {id} = req.params
    const index = car.findIndex(car=>car.id == parseInt(id))
    car[index].brand = updateBrand
    res.json(car)
});
app.delete('/delete/:id',(req,res)=>{
    const {id} = req.params
    const index = car.findIndex(car=>car.id == parseInt(id))
    car.splice(index,1)
    res.json(car)
})
app.get('/car/:id',(req,res)=>{
    const id = +(req.params.id)
    const index = car.findIndex(car=>car.id == id)
    res.json(car[index])
})