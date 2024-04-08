import { squeezeReview, usernameExists , getRating } from './utils.js'
import { getConnection } from './connection.js'
import { table } from './schemas.js';
import {v4 as uuid} from 'uuid'
const connection = await getConnection();
const getMentorid = async (username)=>{
    const [result] = await connection.query(`select id from ${table.mentors} where username=?`,[username])
    return result[0].id
}

const overAllratingOfMentor = async (id)=>{
    const [result] = await connection.query(`SELECT  count(*) as users , sum(rating) as currRating FROM ${table.reviews} GROUP BY mentor_id HAVING mentor_id=?`,[id])
    const {users , currRating} = result[0]
    const overAllrating  = getRating(users,currRating)
    await connection.query(`
        UPDATE ${table.mentors}
        SET rating = ?
        WHERE id = ?
    `,[overAllrating,id])
}

export const updatereviewTable = async (user_id,mentor_username,int_rating,review)=>{
    const mentor_id = await getMentorid(mentor_username)
    const filtered_review = squeezeReview(review) 
    await connection.query(`insert into ${table.reviews} values (?,?,?,?)`,[user_id,mentor_id,int_rating,filtered_review])
    await overAllratingOfMentor(mentor_id)
}

export const getId = async (username,password,isMentor)=>{
    let result
    if(isMentor){
        result = await connection.query(`select id from ${table.mentors} where username=? and password=?`,[username,password])
    }else{
        result = await connection.query(`select id from ${table.users} where username=? and password=?`,[username,password])
    }
    const [data] = result
    if(data.length == 0 ) return  "data not found"
    return data[0].id
} 

export const insertData = async (username,password,isMentor)=>{
    const id = uuid()
    if(isMentor){
        if(await usernameExists(username,true)){
            return "Username already exists pls choose another"
        }
        await connection.query(`insert into ${table.mentors}(id,username,password) values(?,?,?)`,[id,username,password])
    }else{
        if(await usernameExists(username,false)){
            return "Username already exists pls choose another"
        }
        await connection.query(`insert into ${table.users}(id,username,password) values(?,?,?)`,[id,username,password])
    }
    return "successfully registered"
}


export const getMentors = async (rating)=>{   
    const [results] = await connection.query(`
    SELECT t4.username , t3.mentor_id , t3.mentor , t3.review 
    FROM (SELECT t1.mentor_id,t1.user_id,t1.review,t2.username as mentor  FROM ${table.reviews} as t1 INNER JOIN ${table.mentors} as t2 ON t1.mentor_id = t2.id 
    WHERE t2.rating >= ?) AS t3 
    INNER JOIN ${table.users} AS t4 ON t3.user_id = t4.id 
    `,[rating])
    //Organize results 
    const reviews = {}
    results.forEach(res=>{
        if(!reviews[res.mentor_id]){
            reviews[res.mentor_id] = {mentor : res.mentor , reviews : []}
        }else{
            reviews[res.mentor_id]["reviews"].push({username : res.username ,review : res.review})
        }
    })
    return reviews
}

export const updateRecommendStudentTable = async (mentorid,userid,link)=>{
    //The link may be updated (means mentorid and userid row exists)
    const [result] = await connection.query(`SELECT link FROM ${table.recommend_student} WHERE mentor_id=? and user_id=?`,[mentorid,userid])
    if(result.length!=0){
        //update the link
        await connection.query(`
            UPDATE ${table.recommend_student} 
            SET link = ?
            WHERE mentor_id = ? AND user_id = ?
        `,[link,mentorid,userid])
    }else{
        await connection.query(`INSERT INTO ${table.recommend_student} VALUES(?,?,?)`,[mentorid,userid,link])
    }


    //(Inserting user for the firsttime)
}