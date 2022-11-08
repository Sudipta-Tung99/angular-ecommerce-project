const jwt=require('jsonwebtoken');

module.exports=function(req, res, next){
    const {auth}=req.headers
    if(!auth) {
        return res.status(401).send('Access denied no token generated')
    }
    try{
        const decode=jwt.verify(auth,process.env.token_key);
        req.user=decode;
        next();
    }catch(e){
        res.status(400).send('Invalid Token');
    }
}