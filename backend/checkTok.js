const jwt = require('jsonwebtoken')

const checkTok = (req,res,next) => {
    const tok = req.cookies.token
    if(!tok){
        return res.status(401).json("You are not authenticated!")
    }
    jwt.verify(tok,process.env.SECRET,async (err,data)=>{
        if(err){
            return res.status(403).json("Token is not valid!")
        }
        
        req.userId=data._id
        
        next()
    })
}

module.exports=checkTok