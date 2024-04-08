import {} from 'dotenv/config'
import mysql from 'mysql2/promise'
import { table , userSchema , mentorSchema ,reviewSchema , recommend_student_schema } from './schemas.js'
export const connectDB = async ()=>{
    try {
        const connection = await mysql.createConnection({
            host : process.env.host,
            user : process.env.user,
            password : process.env.password
        })
        await connection.query(`create database if not exists ${process.env.database}`);
        await connection.query(`use ${process.env.database}`);
        await connection.query(`create table if not exists ${table.users}(${userSchema})`)
        await connection.query(`create table if not exists ${table.mentors}(${mentorSchema})`)
        await connection.query(`create table if not exists ${table.reviews}(${reviewSchema})`)
        await connection.query(`create table if not exists ${table.recommend_student}(${recommend_student_schema})`)
        
        console.log("connected to db")

        return connection

    }catch (err) {
        console.error(`Error in connecting db/creating Tables : ${err.message}`)        
    }
}

export const getConnection = async ()=>{
    const connection = await connectDB()
    return connection;
}
   


