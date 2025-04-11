const allowedOrigins = require('../config/allowedOrigins')
const creds = (req,res,next)=>{
    const origin = req.headers.origin
    if(allowedOrigins.includes(origin))
    {
        res.setHeader('Access-Control-Allowed-Credentials',true)
    }
    next()
}

module.exports = {creds};
