
exports.admin=(req,res,next)=>{
    if(req.user.role=='admin'){
        next()
     
    }else{
         res.status(400).json("Access denied")
    }
}