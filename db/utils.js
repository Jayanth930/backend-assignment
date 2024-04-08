import { table } from "./schemas.js";
import { getConnection } from "./connection.js";
const connection = await getConnection()
export const squeezeReview = (review)=>{
    const words = review.trim().split(" ");
    if(words.length <= 50 ) return review
    let updated_review = ""
    for(let i=0;i<50;i++){
        updated_review+=words[i];
    }
    return updated_review
}

export const usernameExists = async (username,isMentor)=>{
    let element
    if(isMentor){
        const [result] = await connection.query(`select username from ${table.mentors}`)
        element = result.filter((element)=> element.username === username)
    }else{
        const [result] = await connection.query(`select username from ${table.users}`)
        element = result.filter((element)=> element.username === username)
    }
    if(element.length!=0) return true;
    return false;
}

export const getRating = (users,rating) =>{
    const ratingInPercentage = Math.floor(((rating) / (users*5))*100)
    if(ratingInPercentage <= 20)return 1
    else if(ratingInPercentage <= 40) return 2
    else if(ratingInPercentage <= 60) return 3
    else if(ratingInPercentage <=80) return 4
    else return 5

}


export const getUserId = async (username)=>{
    const [result] = await connection.query(`SELECT id FROM ${table.users} WHERE username=?`,[username])
    if(result.length == 0 ) return false
    const {id} = result[0]
    return id
}