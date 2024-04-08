import express from 'express'
import { updatereviewTable  ,  getMentors} from '../db/query.js'
const router = express.Router()


router.post("/review/:user_id",async (req,res)=>{
    const {user_id} = req.params
    const {mentor_username , rating , review} = req.body
    const int_rating = parseInt(rating)
    await updatereviewTable(user_id,mentor_username,int_rating,review)
    res.status(200).json({message : "Successfully updated review"})
})


router.get("/review",async (req,res)=>{
    const rating = req.query ? parseInt(req.query.rating) : 0
    if(rating!=0){
        const reviews = await getMentors(rating)
        const results = Object.values(reviews)
        res.status(200).send(results)
        return
    }
    res.status(400).send(`No reviews greater than ${rating}`)

})

export default router