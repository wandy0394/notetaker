import jwt from 'jsonwebtoken'
const Users = require('../models/userModel')



const requireAuth = async (req:any, res:any, next:any) => {
    //verify authentcation
    const {authorization} = req.headers
    if (!authorization) return res.status(401).json({error:'Auth token missing.'})
    const token = authorization.split(" ")[1]
    try {
        const {_id} = jwt.verify(token, process.env.SECRET as string) as jwt.JwtPayload
        req.user = await Users.findOne({_id}).select('_id')
        next()
    }
    catch(e) {
        console.log(e)
        res.status(401).json({error:'Unauthorised.'})
    }
}

module.exports = requireAuth