import mongoose from 'mongoose'
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
    }
})

//collection named "User"
module.exports = mongoose.model("Users", userSchema)