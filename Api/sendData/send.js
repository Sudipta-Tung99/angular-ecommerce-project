exports.sendData=(res,data,status)=>{
    return res.status(status).send(data)
}