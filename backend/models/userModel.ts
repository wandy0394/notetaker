import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

const ObjectId = mongoose.Schema
const userSchema = new mongoose.Schema({
    email:{
        type: String, 
        required:true,
        lowercase:true,
        unique:true,
        match:/.+\@.+\..+/,
    },
    name:{
        type:String,
        required:true
    },
    createdAt:{
        type:Number, 
        default: ()=> Date.now()
    },
    password: {
        type:String,
        required:true
    }
})

//static register method
userSchema.statics.register = async function(email:string, password:string, name:string) {
    if (!email || !password || ! name) throw Error('Email, password and name must be filled.')
    if (!validator.isEmail(email)) throw Error('Email is not valid.')
    //if (!validator.isStrongPassword(password)) throw Error ('Password not strong enough.')    
    const userExists = await this.findOne({email})
    if (userExists) throw Error('Email in use.')
 
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = this.create({
        email:email,
        name:name,
        password:hash
    })
    return user
}

//login method
userSchema.statics.login = async function(email:string, password:string) {
    if (!email || !password) throw Error('Email, password must be filled.')
    const user = await this.findOne({email})
    if (!user) throw Error('Email could not be found.')

    const passwordMatched = await bcrypt.compare(password, user.password)
    if (!passwordMatched) throw Error('Invalid credentials.')

    return user
}

//collection named "User"
module.exports = mongoose.model("Users", userSchema)