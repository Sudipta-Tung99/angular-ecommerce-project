const express = require("express");
const app = express();
const cors=require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const { dataBase } = require("./DB/Database");
const category = require("./Router/CategoryRoute")
const product = require("./Router/ProductRouter");
const slide = require("./Router/sliderRouter");
const user = require("./Router/UserRouter");
const cart = require("./Router/CartRouter");
const auth = require("./Middleware/auth");
const address = require("./Router/AddressRouter")
const order = require("./Router/OrderRouter");
const { admin } = require("./Middleware/Admin");


app.use(cors());
app.use(express.json());
dataBase();

app.use(express.static(path.join(__dirname + "/uploads")))

app.use(express.static( path.join(__dirname + "/test")))

app.use("/category",category)
app.use("/product",product);
app.use("/slide",slide);
app.use("/user",user);
app.use("/cart",cart)
app.use("/address",address)
app.use("/order",order)
app.get("/protect",auth,async(req,res)=>{
try{
    res.status(200).json({
        message:true})

}catch(err){
    res.status(404).json(err)
}
})
app.get("/protectAdmin",auth,admin,async(req,res)=>{
    try{
        res.status(200).json({
            message:true})
    
    }catch(err){
        res.status(400).json(err)
    }
    })


app.listen(5000,()=>{
    console.log("server start 5000");
})