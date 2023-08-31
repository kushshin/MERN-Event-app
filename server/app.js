import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRouter from './Routes/UserRoute.js'
import eventRouter from './Routes/EventRoute.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use("/auth", userRouter)
app.use("/event", eventRouter)





mongoose.connect("mongodb://127.0.0.1:27017/EVENTBLOGAPP", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB connected")
    })
    .catch(() => {
        console.log("DB not connected")
    })


app.listen(3001, () => {
    console.log("server is running")
})