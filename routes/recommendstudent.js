import express from 'express'
import {getUserId} from '../db/utils.js'
import {updateRecommendStudentTable} from "../db/query.js"
const router = express.Router()



router.post('/recommend/:mentorid',async (req,res)=>{
    const {mentorid} = req.params
    const {username : user , link:url} = req.body
    const userid = await getUserId(user)
    if(!userid){
        res.status(400).send("Username doesnot found Pls provide valid username")
        return
    }
    await updateRecommendStudentTable(mentorid,userid,url)
    res.status(200).send("Recommendation is updated successfully")
})



export default router