import mongoose from "mongoose"

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    tags:[String],
    markdown:{
        type:String,
        maxLength:5000
    },
    user: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    createdAt:{
        type:Number, 
        default: ()=> Date.now(),
        immutable: true
    },
    updatedAt:{
        type:Number, 
        default: () => Date.now(),
    }
})

noteSchema.pre('save', function(next){
    this.updatedAt = Date.now()
    next()
})
module.exports = mongoose.model("Notes", noteSchema)