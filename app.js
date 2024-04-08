import express from "express"; 
import loginRouter from "./routes/login.js"
import reviewRouter from "./routes/review.js"
import recommendstudentRouter from "./routes/recommendstudent.js";
import {connectDB} from "./db/connection.js"
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(loginRouter)
app.use(reviewRouter)
app.use(recommendstudentRouter)

app.get('/',(req,res)=>{
    res.status(200).send("<h1>Hello world</h1>")
})

async function main(){
    //pass your mysql options for login
    await connectDB();
    

    app.listen(port,()=>{
        console.log(`server started on port ${port}`)
    })
    
    
    
}


main()

app.use((err,req,res,next)=>{
    console.error(`${err.message}`)
})