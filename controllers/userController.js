import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

export function createUser(req,res){
    const data= req.body         //request eke body eka da gththa variable ekakta

    
    const hashedPassword = bcrypt.hashSync(data.password,10)      //password hash

    //res.json({hashedPassword})


    const user = new User({
      email:data.email,
      firstName: data.firstName,
      lastName:data.lastName,
      password:hashedPassword,
     
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

  User.find({email:email}).then((users)=>{

      if(users[0]==null){
        res.status(404).json({
          message:"user not found"
        });
        
      }else{

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


export function getUser(req, res) {
	if (req.user == null) {
		res.status(401).json({
			message: "Unauthorized",
		});
		return;
	}

	res.json(req.user);
}


export async function googleLogin(req, res) {
	console.log(req.body.token);
	try {
		const response = await axios.get(
			"https://www.googleapis.com/oauth2/v3/userinfo",
			{
				headers: {
					Authorization: `Bearer ${req.body.token}`,
				},
			}
		);

		console.log(response.data);

    	const user = await User.findOne({ email: response.data.email });


		if (user == null) {
			const newUser = new User({
				email: response.data.email,
				firstName: response.data.given_name,
				lastName: response.data.family_name,
				password: "123",
				Image : response.data.picture,
			})
			await newUser.save();

			const payload = {
				email: newUser.email,
				firstName: newUser.firstName,
				lastName: newUser.lastName,
				role: newUser.role,
				isEmailVerified: true,
				Image: newUser.Image,
			};

			const token = jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: "150h",
			});

			res.json({
				message: "Login successful",
				token: token,
				role: user.role,
			});

		} else {
			const payload = {
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				role: user.role,
				isEmailVerified: user.isEmailVerified,
				Image: user.Image,
			};

			const token = jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: "150h",
			});

			res.json({
				message: "Login successful",
				token: token,
				role: user.role,
			}); 
      
		}

	
	} catch (error) {
		res.status(500).json({
			message: "Google login failed",
			error: error.message,
		});
	}
}


