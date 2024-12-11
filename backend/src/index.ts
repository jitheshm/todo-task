import express from 'express'
import authRoute from './routes/authRoute'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config();
import dbConnect from './config/db/dbConnect'

const app=express()

app.use(express.json())
app.use(cookieParser())

dbConnect()

app.use('/api/auth',authRoute)





app.listen(3000,()=>{
    console.log("server running in port 3000")
})