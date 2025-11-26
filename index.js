import express from "express"
import mongoose from "mongoose"

import userRouter from "./routes/userRouter.js"

import jwt from "jsonwebtoken"
import productRouter from "./routes/productRouter.js"



const mongoURI = "mongodb+srv://admin:1234@cluster0.surx1aj.mongodb.net/?appName=Cluster0"  //(  (/     ?) onna othanata db eke nama danna.nethnm test kiyla nomal hedennne ? )
mongoose.connect(mongoURI).then(
    ()=>{
    console.log("Connected to MongoDB Cluster")
    }
)

const app = express()

app.use(express.json())



app.use(                                          //middleware empty
    (req,res,next)=>{
        const authorizationHeader = req.header("Authorization")

        if(authorizationHeader != null){
            const token = authorizationHeader.replace("Bearer ", "")   // bearar space nethi kra gnnawa
            console.log(token)


            jwt.verify(token,"secretKey96$2025",
                (error,content)=>{

                if(content ==null){

                    console.log("Invalid Token")
                    res.json({
                        message:"Invalid Token"
                    })

                    return

                }else{
                    console.log(content)
                    req.user = content
                    next()
                }
            })


            

        }
        else{

            next()
        }

        //console.log(authorizationHeader)
        //console.log("  ")
        


    
    
    }


    

)


app.use("/users",userRouter)
app.use("/products",productRouter)


app.listen(5000 ,
    ()=>{
        console.log("sever is running")
    }
)