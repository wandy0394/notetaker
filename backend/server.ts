import express from "express"
import cors from "cors"
import users from "./routes/userRoutes"
import notes from "./routes/noteRoutes"


const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/v1/users", users)
app.use("/api/v1/notes", notes)
app.use("*", (req, res) => {
    res.status(404).json({error:'Not found...'})
})

export default app