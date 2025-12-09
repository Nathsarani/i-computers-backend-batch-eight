import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req,res){
    const data= req.body         //request eke body eka da gththa variable ekakta

    
    const hashedPassword = bcrypt.hashSync(data.password,10)      //password hash

    //res.json({hashedPassword})


    const user = new User({
      email:data.email,
      firstName: data.firstName,
      lastName:data.lastName,
      password:hashedPassword,
      role:data.role,
    } )  // request eke body eka new User athulata danwa// save krnna puluwn vidiye user ekenek create krnwa 
                                            //user.save()  user kiynne save wenna puluwn ekk.userta kiynwa save krnna kiyla(promise ekk)
   user.save().then (                       //promise eka attatma unoth wenne one de

    ()=>{
        res.json(
            {
           message: "User created successfully"
           })
        }
    )
}


export function loginUser(req,res){
  const email = req.body.email
  const password =req.body.password

  User.find({email:email}).then(
    (users)=>{

      if(users[0]==null){
        res.json({
          message:"user not found"
        })
      }


      else{

        const user =users[0]
       // res.json(user) //user print

        const isPasswordCorrect = bcrypt.compareSync(password,user.password)  //function password correct

        if(isPasswordCorrect){

        const payload ={
          email:user.email,
          firstName:user.firstName,
          lastName:user.lastName,
          role:user.role,
          isEmailVerified:user.isEmailVerified,
          Image:user.Image
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET,{
          expiresIn: "15h"
        })

        res.json({

          message:"login sucessfull",
          token:token,
          role: user.role,
        })}


        else{
          res.status(401).json({
            message:"Invalid Password"
          })
        }




      }
    }
  )
}



export function isAdmin(req){
    if(req.user==null){
        return false
    }
    if(req.user.role != "admin"){                       // admin nowana ayata blnna denne na 
        return false ;
    }

    return true ;
     
}                        // oya function eken true or false return 




