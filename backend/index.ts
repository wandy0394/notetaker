import mongoose from 'mongoose'


const Users = require("./models/userModel")
const Notes = require("./models/noteModel")
import app from "./server"
import dotenv from "dotenv"

dotenv.config()

const port = process.env.PORT || 8000
const URI = process.env.NOTES_DB_URI as string


mongoose.connect(URI)
    .then(()=>{
        console.log('connected')
        app.listen(port, () => {
            console.log(`Listening on port ${port}`)
        })
    })
    .catch (error=>{
        console.error(error)
        process.exit(1)
    }) 

