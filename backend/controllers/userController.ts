const users =  require('../models/userModel')
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

function createToken(_id:any) {
    return jwt.sign({_id}, process.env.SECRET as string, {expiresIn:'1d'})
}
export default class UserController {
    static async apiLoginUser(req:any, res:any, next:any) {
        const {email, password} = req.body
        try {
            const user = await users.login(email, password)
            const token = createToken(user._id)
            res.status(200).json({email, user, token})
        }
        catch (e:any) {
            res.status(400).json({error:e.message})
        }

    }

    static async apiRegisterUser(req:any, res:any, next:any) {
        const {email, password, name} = req.body
        try {
            const user = await users.register(email, password, name)
            const token = createToken(user._id)
            res.status(200).json({email, user, token})
        }
        catch(e:any) {
            res.status(400).json({error:e.message})
        }
    }

    static async apiGetUser(req:any, res:any, next:any) {
        try {
            const value = await users.find()
            res.json({output:value})
        }
        catch (e) {
            console.log(e)
            //res.json({error:'Error'})
        }
    }
}

