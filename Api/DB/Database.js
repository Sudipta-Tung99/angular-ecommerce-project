const mongoose = require("mongoose");

const dataBase =()=>{ mongoose.connect("mongodb://localhost:27017/Online-shop")
.then(()=>console.log("DB is connected"))
.catch(()=>console.log("DB not connected"))
}

module.exports = {dataBase}