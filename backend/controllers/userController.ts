const users =  require('../models/userModel')

export default class UserController {
    static async apiLoginUser(req:any, res:any, next:any) {
        res.json({msg:'login'})
    }

    static async apiRegisterUser(req:any, res:any, next:any) {
        res.json({msg:'register'})
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

