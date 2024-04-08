import express from 'express'
import { getConnection } from '../db/connection.js'
import { getId , insertData } from '../db/query.js'
const router = express.Router()
const connection = getConnection()

router.post("/register",async (req,res,next)=>{
    const mentor = req.query && req.query.mentor
    const {username , password } = req.body
    const message = await insertData(username,password,mentor)
    res.status(200).send(message)
})

router.post("/login",async (req,res)=>{
    const mentor = req.query && req.query.mentor
    const {username , password } = req.body
    const id = await getId(username,password,mentor)
    res.status(200).send(id)
})  



export default router