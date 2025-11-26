import mongoose from "mongoose";

const userSchema = new mongoose.Schema({      //Schema
    email : {
        type : String,
        required : true,
        unique : true
    
    },

    firstName :{
        type : String,
        required:true,

    },
    lastName :{
        type : String,
        required:true,

    },

    password :{
        type:String,
        required:true
    },

    role :{
        type:String,
        default:"customer" // user kiwwe nathnm manully customer save wenne
    },

    isBlocked:{
        type:Boolean, 
        default:false
    },

    isEmailVerified:{
        type:Boolean,
        default:false // email eka verify wenne na ne palaweni para register weddi  
    },

    Image:{
        type:String,
        required:true,
        default:"/default.jpg"  // URL of profile picture
    }



}

)
const User = mongoose.model("User", userSchema) //model create  (User kiynne collection eke name ek,plural wel ynne mongo ekta)
export default User;  
